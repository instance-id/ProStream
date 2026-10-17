# DataObject Spawning

The [DataObjects workflow](/core-concepts/workflow-guides/dataobjects-workflow) converts repeated prefab instances into prefab references plus compact per-section transform buffers. At runtime, dedicated ECS systems load each referenced prefab once, spawn entities from the section buffers, and destroy them again when the section streams out.

This page covers the runtime lifecycle and tuning. For authoring and editor flow, see the [DataObjects workflow guide](/core-concepts/workflow-guides/dataobjects-workflow).

## Runtime lifecycle

### 1. Prefab loading - `DataObjectPrefabLoadSystem`

When a DataObject section streams in, this system reads the `EntityPrefabReferenceComponent`s baked from section 0 and requests each prefab through Unity's `EntityPrefabReference.LoadAsync`.

Loaded prefabs are stored on a **section-independent proxy entity**: the proxy is not part of any section, so the loaded prefab stays valid for the life of the whole SubScene rather than being freed when a single section streams out. This avoids load/unload races for prefabs referenced by multiple sections.

### 2. Instance spawning - `DataObjectSpawnSystem` + `DataObjectSpawnJob`

`DataObjectSpawnSystem` watches for sections carrying position buffers and a loaded prefab reference, then runs `DataObjectSpawnJob` - a Burst-compiled parallel job that:

- instantiates one entity per transform entry in the `DataObjectPositionBuffer`
- applies each entry's position and rotation (`LocalTransform`)
- applies non-uniform scale through a `PostTransformMatrix`
- tags every spawned entity with `DataObjectSectionComponent` (section index + origin GUID) so the unload system can find it later

How much of a section spawns per frame depends on its **spawn mode** (below).

### 3. Section unload cleanup - `DataObjectSectionUnloadingSystem`

When a section's SubScene unloads, this system:

1. Finds a cleanup marker entity carrying that section's index.
2. Queries all entities tagged `DataObjectSectionComponent` for the matching section and origin scene.
3. Destroys them and removes the section's spawn-progress singleton, freeing the instance memory.

Because cleanup keys off the shared section component rather than the section entity itself, it works regardless of which entity the unload event arrived on.

## Spawn modes

Each `SectionData` (streaming layer) exposes a **Spawn Mode** and **Tile Size** used by its DataObject sections.

The `RuntimeProgressive` mode follows the tile-based progressive instantiation strategy Unity's Demo team documented for [Time Ghost](https://discussions.unity.com/t/making-of-time-ghost-using-dots-ecs-for-more-complex-environments/1537850): rather than instantiating an entire section in a single frame (which causes CPU spikes at scale), the section buffer is subdivided and populated in bounded per-frame batches.

| Mode | Behavior | Notes |
|---|---|---|
| **BakeTimeOptimized** (default) | Entities are instantiated during the entity-scene optimization pass and serialized into the entity scene. | No runtime instantiation cost when the section streams in. If a section is streamed while still open for editing in the Editor, ProStream falls back to runtime spawn so the content still appears. |
| **RuntimeProgressive** | `DataObjectSpawnSystem` spawns up to **Tile Size** instances per frame until the section buffer is consumed. | Spreads instantiation cost across frames; useful for very large sections. Optional per-layer **spawn interval** adds pacing between bursts (see API below). |
| **RuntimeImmediate** | The entire section buffer is instantiated in one frame. | Corresponds to the "instantiate everything in one go" approach Unity documented as causing "a considerable spike on CPU" in Time Ghost. Fine for small sections or diagnostics; use `RuntimeProgressive` at scale. |

**Tile Size** is the per-frame instantiation budget for `RuntimeProgressive` (the larger the tile, the faster sections populate; the smaller, the smoother each frame).

Per-section Spawn Mode and Tile Size edits written through **Auto-Sync Section Settings To SubScenes** are applied to already-created DataObject SubScenes so they re-bake without re-running Prepare Scene or Create SubScenes.

## Bake-time path - `DataObjectBakeInstantiateSystem`

For `BakeTimeOptimized` sections, `DataObjectBakeInstantiateSystem` runs inside Unity's `EntitySceneOptimizations` world during entity-scene baking:

- Reads each section's `DataObjectPositionBuffer` and the loaded `EntityPrefabReference`.
- Instantiates the full buffer and assigns each instance to the correct scene section (`SceneSection` + `SceneTag`).
- Computes section bounds (`SectionBoundsData`) so distance-based loading works with baked content.
- Marks spawned entities with `DataObjectBakedTag` and removes the consumed buffer.

## Runtime tuning - `DataObjectTileSizeAPI`

`DataObjectTileSizeAPI` (namespace `instance.id.ProStream`) exposes static helpers for adjusting DataObject spawning while the game is running:

```csharp
using instance.id.ProStream;

// Override the per-frame tile size for layer 2
DataObjectTileSizeAPI.SetTileSize(2, 128);

// Add a minimum interval between spawn bursts for layer 2 (seconds)
DataObjectTileSizeAPI.SetSpawnInterval(2, 0.05f);

// Restore the baked per-section tile size
DataObjectTileSizeAPI.ResetTileSize(2);
```

Per-layer overrides take precedence over the baked `Tile Size` on the section. `ResetTileSize` returns the layer to its baked value. Setting a tile size of `0` restores baked behavior as well.

Changes apply to sections that stream in after the call - already-spawned sections are unaffected.

## Performance notes

- `BakeTimeOptimized` is the lowest-cost runtime path - instantiation cost moves to build/bake time, trading entity-scene size for frame-time stability.
- `RuntimeProgressive` trades total spawn latency for a bounded per-frame cost; tune **Tile Size** (and the optional spawn interval) to fit your frame budget.
- `RuntimeImmediate` concentrates the full section cost into one frame - prefer it only for small sections or diagnostics.
- The workflow stores one prefab reference plus transform data rather than cloned hierarchies, so heavily repeated content benefits most in build size and runtime memory.

## See Also

- [DataObjects Workflow](/core-concepts/workflow-guides/dataobjects-workflow) - authoring, conversion, and pipeline flow
- [Runtime Streaming](/runtime-systems/runtime-streaming) - the underlying section load/unload systems
- [Advanced Runtime Configuration](/runtime-systems/advanced-configuration) - runtime loading-range adjustment
- [Workflows Configuration](/editor-guide/engines/workflows-configuration) - QuadTree and auto-sync settings
