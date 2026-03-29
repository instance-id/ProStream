# Runtime Streaming Systems

ProStream runtime streaming uses DOTS systems plus managed helpers to load and unload scene content based on distance from a loading trigger. The architecture (Runtime Streaming v2) combines a managed initialization gate, ECS setup systems, and dynamic execution systems.

## Overview

At runtime, ProStream supports two streaming paths:
- **Entity SubScene streaming** (ECS section load/unload using `RequestSceneLoaded`)
- **GameObject SubScene streaming** (managed `GameObjectSceneStreamingManager` + ECS systems)

Streaming only works after editor preparation is complete:
1. Scene setup
2. Search filters and enabled rules
3. Calculate Positions (Generates Spatial Data)
4. Create SubScenes

If SubScenes were not created, there is nothing to stream.

## Key Runtime Components

- **StreamingManager**: Scene bridge holding trigger/layer references and runtime toggles.
- **StreamingSystemsInitializer**: A managed initialization gate (`SystemBase`) that validates prerequisites, initializes `StreamingSystemsManager`, and pushes runtime state into ECS config (`StreamingSystemsConfig`) every frame.
- **SubSceneStreamingSetupSystem**: An ECS setup system (`SystemBase`) that initializes required entities, components, and dynamic buffers (`LayerLoadingRanges`).
- **SubSceneLoadingSystem**: An `ISystem` that schedules `SubSceneLoadingJob` to add `RequestSceneLoaded` based on player position and layer ranges.
- **SubSceneUnloadingSystem**: An `ISystem` that schedules `SubSceneUnloadingJob` to remove `RequestSceneLoaded` using the same prerequisites plus unload controls.
- **LoadingDistanceSystem**: Provides APIs for live, runtime-adjustable layer ranges (e.g., `SetGlobal`).

## System Gating (Important)

Entity streaming systems require setup singletons/components to exist before they run:
- `UseStreamingSystems`
- `StreamingSystemsConfig` (Updated every frame by the Initializer)
- `StreamingSetupComplete`
- `LayerLoadingRanges`

If these are missing, loading/unloading systems will not update.

## Distance Model

For Entity SubScenes, ProStream uses section bounds (`AABB`) and computes distance from trigger position to the closest point on the bounds.

### Loading check

`SubSceneLoadingJob` loads when distance is inside the configured range:
- `distance >= loadingStartDistance`
- `distance < loadingEndDistance`

Sections marked `persistent` are always loaded.

### Unloading check

`SubSceneUnloadingJob` unloads when outside the end range with a multiplier buffer:
- `adjustedEndDistance = loadingEndDistance * UnloadBufferMultiplier`

Current initializer value is `1.05f`.

### Runtime-Adjustable Layer Ranges

Loading ranges can be modified at runtime using the `LoadingDistanceSystem`. This allows for dynamic streaming adjustments based on gameplay events.
For example, updating a specific layer's range:
```csharp
// Example: Updating the range for a specific section index at runtime
LoadingDistanceSystem.SetGlobal(sectionIndex, new float2(newStartDistance, newEndDistance));
```

## StreamingManager (User-facing)

`StreamingManager` is created automatically during the SubScene creation workflow (Cleanup phase) and provides:
- Loading trigger reference
- Section collection (`LayerData`)
- Runtime toggles for entity and GO streaming

Exposed toggles include:
- `enableEntitySubScenes`, `enableLoading`, `enableUnloading`
- `enableGOSubScenes`, `enableGOLoading`, `enableGOUnloading`

Inspector fields include:
- **Loading Trigger**
- **Section Collection** (`LayerData`)
- Streaming status labels

## Runtime Lifecycle

High-level play mode flow (Runtime v2):
1. **Scene Readiness:** Scene becomes runtime-ready.
2. **Initialization:** `StreamingSystemsInitializer` passes prerequisites and initializes `StreamingSystemsManager`.
3. **Config Update:** The ECS config entity (`StreamingSystemsConfig`) is updated each frame.
4. **ECS Setup:** `SubSceneStreamingSetupSystem` initializes setup entities and buffers (`LayerLoadingRanges`).
5. **Execution:** `SubSceneLoadingSystem` schedules distance-based loading jobs, followed by `SubSceneUnloadingSystem`.
6. **Live Updates (Optional):** At runtime, `LoadingDistanceSystem.Set/SetGlobal` updates layer ranges, which the load/unload jobs will observe on subsequent updates.

## Troubleshooting Quick Checks

If sections do not stream:
1. Verify SubScenes were created successfully.
2. Verify `StreamingManager` exists and has Trigger + LayerData.
3. Verify scene progress reached `StreamingReady`.
4. Verify layer loading ranges are set for your scene scale.
5. Check Console for streaming setup/system warnings.

If loading/unloading feels unstable near boundaries:
1. Increase layer end distance.
2. Account for unload buffer multiplier behavior.

If GO SubScenes work in editor but not build:
1. Check that GO SubScene scenes are included in Build Settings.

## See Also

- [Streaming Layers](/core-concepts/layers/streaming-layers) - Configure distance ranges
- [SubScene Creation](/processes/process-subscenes) - Build SubScenes used at runtime
- [Standard Workflow](/getting-started/standard-workflow) - End-to-end setup flow
- [Troubleshooting](/troubleshooting/troubleshooting) - Common runtime issues
