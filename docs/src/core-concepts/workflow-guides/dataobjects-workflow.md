# DataObjects Workflow

The <QuickInfo preset="terms.dataobjects"><code>DataObjects</code></QuickInfo> workflow is ProStream's repeated-prefab streaming path. Instead of cloning full GameObject hierarchies into every SubScene (the InstanceObjects approach), it captures a compact per-instance transform payload for each unique prefab and rebuilds entity instances from that data when the owning section streams in at runtime.

You author your scene normally - place prefab instances wherever you need them - and the optimization happens in the conversion and baking pipeline behind the scenes.

The workflow is best suited for dense scenes where the same prefab repeats many times: scattered props, vegetation-style placements, clutter sets, and modular pieces. For unique or one-off objects, the default [InstanceObjects workflow](/core-concepts/workflow-guides/instanceobjects-workflow) remains the right choice.

## What it is responsible for

- Converting scene prefab instances into `DataObject` assets (a prefab reference plus a list of per-instance transform details)
- Tracking converted objects in the scene through `DataObjectComponent`s under a `DataObjectContainer`
- Building a dedicated DataObjects QuadTree during Prepare Scene
- Writing `QuadSubSceneData` tagged with the DataObjects workflow identifier
- Creating compact SubScenes containing prefab references and transform buffers - not cloned GameObject hierarchies
- Spawning and cleaning up entity instances per section at runtime

## Before you convert

A few requirements have to be met before objects can be converted:

- Objects must be **prefab instances** placed in the scene. Plain GameObjects cannot be converted - the conversion menu items only activate for prefab instances.
- The scene must be set up for ProStream with a `SceneConnector`. When the DataObjects workflow is active, scene setup also creates a `DataObjectCollection` asset (in your scene's `PSSceneData` folder) and a `DataObjectContainer` object under the workflow component.
- Each converted prefab is assigned to a streaming layer through its section (`SectionData`), the same layer system used by InstanceObjects.

## Converting objects to DataObjects

Conversion entry points:

- **`GameObject > ProStream > Convert Selected to DataObject`** - converts the selected prefab instances. If several selected objects share a source prefab, they are deduplicated and one `DataObject` is created per unique prefab.
- **`GameObject > ProStream > Convert Children To DataObject`** - finds every unique outermost prefab beneath the selected root and converts each one.

What conversion does for each unique prefab:

1. Finds every scene instance of that prefab and captures its position, rotation, scale, and bounds into the `DataObject` asset.
2. Marks those instances as **Converted**, which excludes them from InstanceObjects matching so the two workflows never fight over the same object.
3. Deactivates the original scene instances - they are disabled, not deleted, so they can be restored later.
4. Creates a `DataObjectComponent` in the scene under the workflow's `DataObjectContainer`. This component links the asset to the scene and carries the section/layer assignment.
5. Registers the `DataObject` in the scene's `DataObjectCollection`, which is what Prepare Scene and the DataObject Manager read from.

After conversion, use the [DataObject Manager](/editor-guide/windows/dataobject-manager) to review, re-layer, enable/disable, or remove DataObjects.

## Start-to-finish flow

### 1. Activation and registration

When the workflow is active in your project:

1. ProStream registers the DataObjects workflow asset and its component types.
2. The scene's <QuickInfo preset="terms.scene-connector"><code>SceneConnector</code></QuickInfo> discovers the workflow and the <QuickInfo preset="terms.workflow-container"><code>WorkflowContainer</code></QuickInfo> creates a `DataObjectWorkflowComponent`.
3. That component registers two internal workflow stages with the operation system:
   - `DataObjectGenerateLocationWorkflow` for Prepare Scene
   - `CreateDataObjectSubSceneWorkflow` for Create SubScenes
4. Scene setup creates the `DataObjectCollection` asset and the `DataObjectContainer` scene object.

### 2. Prepare Scene: collection and component validation

When you run **Prepare Scene**, the DataObjects stage first verifies its data:

- Re-locates `DataObject` assets belonging to the scene and rebuilds lookup tables.
- Reconciles the workflow component list, the `DataObjectContainer`, and the `DataObjectCollection`. If they have drifted out of sync (for example after manual scene edits), the workflow repairs the lists automatically, and performs a full rebuild only when too many entries are invalid.
- Skips entirely if no DataObjects exist in the scene - the workflow reports itself as having no content and does not block the other workflows.

### 3. Prepare Scene: DataObjects QuadTree and section packing

The workflow then builds its own `DataObjectQuadTreeGrid`, independent of the main InstanceObjects tree:

1. Computes a combined bounds over all captured instance positions.
2. Builds a QuadTree using the DataObjects settings (Max Objects Per Node, Max QuadTree Depth, Auto Adjust Max Depth).
3. Walks every node and groups the objects it contains by streaming layer.
4. Writes `ObjectSectionDetails` per node and layer.
5. Stores the results as `QuadSubSceneData` tagged `WorkflowObject`, which is the data Create SubScenes consumes.

### 4. Create SubScenes: compact authoring output

During **Create SubScenes**, the workflow generates one SubScene asset per QuadTree node - the same disk layout as InstanceObjects (`Assets/SubScene_Assets/{SceneName}/Entity/`). What goes inside is different:

- **Section 0** receives one `DataObjectPrefabAuthoring` entry per unique prefab - the single definition every instance shares.
- **Each content section** receives a `DataObjectSectionAuthoring` object carrying the section index, the section's spawn mode and tile size, and a buffer containing every instance's transform.

No GameObject hierarchies are cloned into these SubScenes. After authoring objects are written, the original prefab instances are deactivated and the scene is reloaded.

### 5. Runtime: load, spawn, unload

When a DataObject section streams in:

1. `DataObjectPrefabLoadSystem` loads each referenced prefab once per SubScene through a section-independent proxy, so the loaded prefab survives individual section streaming.
2. `DataObjectSpawnSystem` instantiates entities from the section's transform buffer according to its spawn mode.
3. `DataObjectSectionUnloadingSystem` destroys the spawned instances when the section unloads, freeing that memory.

For `BakeTimeOptimized` sections, instantiation happens inside Unity's entity-scene optimization pass instead - instances are baked directly into the entity scene, so there is no runtime spawn cost in builds.

See [DataObject Spawning](/runtime-systems/dataobject-spawning) for the runtime lifecycle, spawn modes, and tuning API.

## Spawn modes

Each streaming layer/section that contains DataObjects exposes a **Spawn Mode** and **Tile Size** setting. The spawning pipeline applies the same section-subdivision and progressive-instantiation techniques Unity's Demo team documented for [Time Ghost](https://discussions.unity.com/t/making-of-time-ghost-using-dots-ecs-for-more-complex-environments/1537850)'s multi-million-instance environments, adapted into a general-purpose prefab workflow.

| Mode | Behavior | Best for |
|---|---|---|
| **BakeTimeOptimized** (default) | Instances are baked into the entity scene during optimization. Zero instantiation cost when the section streams in. | Most content; builds and closed SubScenes |
| **RuntimeProgressive** | Spawns up to *Tile Size* instances per frame until the section is populated. Optional per-layer spawn interval pacing. | Very large sections; watching progressive loading in the Editor |
| **RuntimeImmediate** | Spawns the entire section buffer in a single frame. | Small instance counts or debugging - large sections can cause a frame spike |

The **Auto-Sync Section Settings To SubScenes** option (DataObject Spawn section in the Scene/Setup panel) writes Spawn Mode and Tile Size edits back into already-created DataObject SubScenes so they re-bake without re-running the full pipeline.

## Settings that matter most

DataObjects settings live in the **DataObject Setup** section of the Scene/Setup panel (see [Workflows Configuration](/editor-guide/engines/workflows-configuration)):

- **Objects Per Node** (default 16) - target instance count per QuadTree cell before subdivision.
- **Max Node Depth** (default 4, range 2–15) - how small cells are allowed to become.
- **Auto** - automatically adjusts max depth toward your objects-per-node target.
- **Draw QuadTree / Draw Tree Items** - Scene view visualization for the DataObjects grid, toggled from the menu icon next to the settings.

Changing these values rebuilds the DataObjects QuadTree in the background so the Scene view reflects the new partition immediately.

## DataObjects vs InstanceObjects

ProStream offers two distinct workflows for handling SubScene content.

**InstanceObjects** is a scene-copy/conversion workflow: it groups matched objects into sections, then clones the full GameObject hierarchies into generated SubScenes where they are later converted to ECS entities.

**DataObjects** stores a prefab reference plus compact per-instance transform data. SubScenes contain authoring stubs and buffers rather than duplicated hierarchies, which means:

- **Less SubScene duplication** - repeated prefabs serialize once, not once per placement.
- **Lower build size potential** - buffered transform data is substantially smaller than cloned hierarchies for heavily repeated content.
- **Lower runtime memory pressure** - the runtime holds the prefab plus spawned entities for currently-streamed sections, not duplicated authoring structure.

**Choose DataObjects when:**

- The same prefab appears many times across the scene.
- You want to reduce duplicated SubScene content, build size, and runtime memory.
- The object can be represented cleanly as a prefab plus transform-driven instances.

**Choose InstanceObjects when:**

- Each object is relatively unique - duplication savings would be small.
- Per-instance hierarchy or component state makes direct copying simpler.

Both workflows coexist in the same scene. Converted prefabs are automatically excluded from InstanceObjects matching, so you can route repeated content to DataObjects and unique content to InstanceObjects.

## Managing DataObjects

The <QuickInfo preset="terms.dataobject-manager"><code>DataObjectManager</code></QuickInfo> window (**Tools | instance.id | ProStream | DataObject Manager**, shortcut `Shift+Alt+G`) provides a searchable table of every DataObject in the scene, per-object status and fix actions, layer reassignment, scene-component toggles, and removal (which restores the original prefab instances). See the [DataObject Manager guide](/editor-guide/windows/dataobject-manager).

## What you get at the end

- `DataObject` assets plus a `DataObjectCollection` in the scene's data folder
- Compact SubScenes built from prefab references and transform buffers
- Section-aware entity spawning with configurable spawn modes at runtime
- Original prefab instances deactivated but recoverable via the DataObject Manager

## Related guides

- [Workflows Overview](/core-concepts/workflows)
- [InstanceObjects Workflow](/core-concepts/workflow-guides/instanceobjects-workflow)
- [Workflows Configuration](/editor-guide/engines/workflows-configuration)
- [DataObject Manager](/editor-guide/windows/dataobject-manager)
- [DataObject Spawning](/runtime-systems/dataobject-spawning)
- [Prepare Scene Process](/processes/prepare-scene)
- [SubScene Creation Process](/processes/process-subscenes)
