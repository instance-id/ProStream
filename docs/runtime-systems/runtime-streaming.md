# Runtime Streaming Systems

ProStream runtime streaming uses DOTS systems plus managed helpers to load and unload scene content based on distance from a loading trigger.

## Overview

At runtime, ProStream supports two streaming paths:
- **Entity SubScene streaming** (ECS section load/unload using `RequestSceneLoaded`)
- **GameObject SubScene streaming** (managed `GameObjectSceneStreamingManager` + ECS systems)

Streaming only works after editor preparation is complete:
1. Scene setup
2. Search filters and enabled rules
3. Calculate Positions
4. Create SubScenes

If SubScenes were not created, there is nothing to stream.

## Key Runtime Components

- **StreamingManager**: scene bridge holding trigger/layer references and runtime toggles.
- **StreamingSystemsInitializer**: writes per-frame `StreamingSystemsConfig` (trigger position and flags).
- **SubSceneStreamingSetupSystem**: validates readiness and prepares ECS data (`LayerLoadingRanges`, bounds, setup singleton).
- **SubSceneLoadingSystem**: schedules `SubSceneLoadingJob` to add `RequestSceneLoaded`.
- **SubSceneUnloadingSystem**: schedules `SubSceneUnloadingJob` to remove `RequestSceneLoaded`.
- **GameObjectSceneLoadingSystem / GameObjectSceneUnloadingSystem**: load/unload GO SubScenes.

## System Gating (Important)

Entity streaming systems require setup singletons/components to exist before they run:
- `UseStreamingSystems`
- `StreamingSystemsConfig`
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

## StreamingManager (User-facing)

`StreamingManager` is created/used during SubScene creation workflow and provides:
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

High-level play mode flow:
1. Setup/initializer systems verify scene readiness (`StreamingReady`, trigger, layer data, SubScene data).
2. Streaming config is updated each frame with trigger position and load/unload flags.
3. Loading/unloading systems evaluate ranges and queue component changes.
4. Unity processes scene load state asynchronously.

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

- [Streaming Layers](/core-concepts/streaming-layers) - Configure distance ranges
- [SubScene Creation](/processes/process-subscenes) - Build SubScenes used at runtime
- [Standard Workflow](/getting-started/standard-workflow) - End-to-end setup flow
- [Troubleshooting](/troubleshooting/troubleshooting) - Common runtime issues
