# InstanceObjects Workflow

The <QuickInfo preset="terms.instanceobjects-workflow"><code>InstanceObjectsWorkflow</code></QuickInfo> is ProStream's default scene-processing workflow. It is the part of the pipeline that takes your matched prefab instances, builds the main spatial map for the scene, and turns that prepared data into the Entity SubScenes used for streaming.

If you are using ProStream in the normal way, this is the workflow doing most of the heavy lifting for scene preparation, section assignment, and SubScene generation.

## What it is responsible for

- Reading the tracked prefab instances stored in your scene's `InstanceObjectCollection`
- Building the main scene QuadTree used to divide dense content into manageable streaming regions
- Grouping objects by both spatial cell and streaming layer
- Writing the prepared `QuadSubSceneData` that the Create SubScenes process consumes later
- Creating the actual Entity SubScene assets and section hierarchies on disk

In practical terms, this workflow is what turns your authoring scene into a set of smaller streaming units that can potentially reduce loaded hierarchy size, improve memory behavior, and keep editor iteration more manageable in dense scenes.

## Where it fits in the pipeline

The InstanceObjects workflow participates in both major editor processes:

1. During [Prepare Scene](../../processes/prepare-scene.md), it validates tracked objects and generates spatial data.
2. During [SubScene Creation](../../processes/process-subscenes.md), it turns that prepared data into real `.unity` SubScene assets.

Because it is the default workflow asset, it is normally discovered automatically when the <QuickInfo preset="terms.scene-connector"><code>SceneConnector</code></QuickInfo> initializes the scene and populates its <QuickInfo preset="terms.workflow-container"><code>WorkflowContainer</code></QuickInfo>.

## Start-to-finish flow

### 1. Activation and registration

When the workflow is active in your project:

1. ProStream registers the InstanceObjects workflow asset and its component types.
2. The current scene's <QuickInfo preset="terms.scene-connector"><code>SceneConnector</code></QuickInfo> discovers that the workflow is active and enabled.
3. The <QuickInfo preset="terms.workflow-container"><code>WorkflowContainer</code></QuickInfo> creates an `IOWorkflowComponent` in the scene.
4. That component registers two internal workflow stages with the operation system:
   - `IOGenerateLocationWorkflow` for Prepare Scene
   - `CreateIOSubSceneWorkflow` for Create SubScenes

This means the same workflow stays involved from the first spatial analysis pass all the way through asset creation.

### 2. Prepare Scene: object validation

When you click **Prepare Scene**, ProStream asks active workflows to validate their data before main processing begins.

For InstanceObjects, that validation phase checks the scene's `InstanceObjectCollection`, confirms it contains tracked objects, and verifies that the workflow has the data it needs to continue.

This is the stage where ProStream catches obvious setup problems before it starts generating spatial data.

### 3. Prepare Scene: QuadTree generation and section packing

After rule matching has assigned your objects to streaming layers, the InstanceObjects workflow performs its main processing pass.

In that pass it:

1. Reads the `InstanceObjectCollection` for the current scene.
2. Builds or refreshes the workflow's `InstanceObjectQuadTreeGrid`.
3. Walks the resulting QuadTree nodes.
4. Collects all valid tracked objects inside each node.
5. Splits those objects by streaming layer.
6. Writes `ObjectSectionDetails` for each node-and-layer combination.
7. Stores the resulting `QuadSubSceneData` in `SceneConnectorData`.
8. Marks the workflow as ready for SubScene creation.

This prepared data is the contract between **Prepare Scene** and **Create SubScenes**. Once it exists, ProStream knows which cell each object belongs to and which section inside that cell it should be copied into.

::: tip
In normal production use, keep **Use QuadTree** enabled. That is the standard path used to generate the spatial data required for InstanceObjects SubScene creation.
:::

### 4. Create SubScenes: initialize the workflow

When you click **Create SubScenes**, the InstanceObjects workflow initializes itself again for the asset-creation phase.

At this point it resolves:

- the current `SceneConnector`
- the active scene settings
- the prepared `QuadSubSceneData`
- the workflow identifier used to locate only the data created by this workflow

If that prepared data is missing or invalid, the process stops rather than creating incomplete SubScenes.

### 5. Create SubScenes: create Entity SubScene assets

Once initialization succeeds, the workflow creates the actual Unity SubScene files on disk.

In the standard pipeline, ProStream:

1. Creates or finds the scene's `SubSceneRoot`
2. Creates a SubScene asset for each prepared QuadTree cell
3. Writes those assets under `Assets/SubScene_Assets/{SceneName}/Entity/`
4. Registers them with Unity's `AssetDatabase`

Each of those files represents one streaming region generated from the QuadTree pass.

### 6. Create SubScenes: create sections and copy objects

After the assets exist, ProStream opens each SubScene, creates section hierarchies, and clones the matched GameObjects into the correct locations.

That per-SubScene work includes:

- creating ProStream `SubSceneSection` objects
- adding Unity `SceneSectionAuthoring` data
- grouping objects by the layer they were matched into earlier
- copying source GameObjects into the correct section hierarchy
- removing the temporary `(Clone)` naming noise during organization

This is the step where your original authoring layout becomes a set of streaming-ready Entity SubScenes.

### 7. Modification hooks run during creation

The InstanceObjects workflow also passes through ProStream's standard modification hooks during SubScene creation.

That matters because modifications can change the final contents of the Entity SubScenes before they are saved. For example, the collider workflow uses modification events to optionally remove original colliders from the visual Entity copies while separate collider scenes are being created.

See [Modification Engine](../../editor-guide/engines/modification-engine.md) for the general hook system.

### 8. Final save and scene refresh

After sections are populated, ProStream closes the opened SubScenes, saves the generated data, and refreshes the scene state so runtime streaming systems can use the new assets.

## Settings that matter most

The main InstanceObjects controls live in [Workflows Configuration](../../editor-guide/engines/workflows-configuration.md):

- **Use QuadTree** controls whether the normal spatial slicing path is used.
- **Max Objects Per Node** defines the target density of each cell before subdivision.
- **Max QuadTree Depth** limits how small cells are allowed to become.
- **Auto Adjust Max Depth** lets ProStream keep subdividing until the average node density is closer to your target.
- **Draw QuadTree** and **Draw Tree Items** help you inspect the generated spatial mapping in the Scene view.

For dense scenes, these settings are what determine whether ProStream produces a few large SubScenes or many smaller ones.

## What you get at the end

When the InstanceObjects workflow finishes successfully, you have:

- prepared spatial data for the scene
- section-aware grouping by layer
- generated Entity SubScene assets on disk
- a scene layout ready for ECS conversion and runtime streaming

This is why InstanceObjects is the core workflow most users should understand first. The other workflows usually build on top of the spatial structure it establishes.

## Related guides

- [Workflows Overview](../workflows.md)
- [Workflows Configuration](../../editor-guide/engines/workflows-configuration.md)
- [Prepare Scene Process](../../processes/prepare-scene.md)
- [SubScene Creation Process](../../processes/process-subscenes.md)
