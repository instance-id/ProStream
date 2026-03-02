# SubScene Creation Process

SubScene Creation is the final major step in the ProStream workflow. After **Prepare Scene** (triggered by Calculate Positions), this process creates physical `.unity` scene files for spatial cells, organizes cloned objects into sections, and prepares runtime streaming data.

## Overview

This is an **automated process** that handles asset creation, object cloning, hierarchy organization, and scene management.

## When to Use

**Prerequisites:**
- Scene setup is complete
- Search filters are configured
- Match rules are enabled
- **Prepare Scene (Calculate Positions) has completed successfully**

**Trigger:** Click the **"Create SubScenes"** button in the ProStream Editor after positions are calculated.

## What It Does

### 1. SubScene Asset Creation
- Creates a `.unity` scene file for each QuadTree cell
- Organizes assets in `Assets/SubScene_Assets/{SceneName}/Entity/`
- Registers files with Unity's AssetDatabase
- Links SubScene components to scene assets

### 2. Section Hierarchy Creation
- Creates section GameObjects within each SubScene (e.g., "Section_Ground", "Section_LargeObjects")
- Adds `SubSceneSection` component (ProStream)
- Adds `SceneSectionAuthoring` component (Unity Entities)
- Configures section indices for distance-based streaming

### 3. Object Cloning & Organization
- Clones matched GameObjects from main scene
- Parents clones to appropriate section hierarchies
- Preserves hierarchy relationships
- Removes "(Clone)" suffix from names

### 4. Modification Execution
- Runs enabled modifications at various stages
- Examples: mesh combining, LOD setup, material optimization
- Configurable execution timing (before copy, per section, after move, etc.)

### 5. Scene Reload & Cleanup
- Finalizes scene/subscene data and marks scene progress
- Ensures StreamingManager runtime references are configured
- Prepares scene for play mode testing

## Process Flow

The Create SubScenes process uses the same **Workflow** architecture as Prepare Scene. For every active workflow (e.g., `InstanceObjectsWorkflow`), it runs through 3 specific stages:

```
User Clicks "Create SubScenes" Button
    ↓
Set SubSceneCreationInProgress Flag
    ↓
CreateSubScenesOp.PerformOperation()
    ↓
Iterate Active Workflows (3 Stages Each)
    ├── STAGE 1: Initialize
    │   - Verify workflow identifier and component
    │   - Validate settings
    │
    ├── STAGE 2: Execute
    │   - Process spatial data (e.g., QuadTree from Prepare Scene)
    │   - Create SubScene Assets (Batch creation on disk)
    │   - Open all SubScenes additively
    │   - Process Each SubScene:
    │       ├── Create Section Hierarchies (Ground, LargeObjects, etc.)
    │       ├── Clone Objects to Sections
    │       ├── Run Modifications (BeforeMoveToSubScene, PerSection, etc.)
    │       └── Move Section Hierarchies to SubScene
    │   - Close All SubScenes
    │   - Save main scene
    │
    └── STAGE 3: Cleanup
        - Register scene reload callbacks
        - Reload current scene (cleans temporary objects)
        - Create StreamingManager (Runtime bridge)
        - Run validation and finalize streaming state
    ↓
Complete - Ready for Play Mode
```

## SubScene Hierarchy Structure

**Main Scene After Creation:**
```
MyScene.unity
├── SceneConnector
├── SubSceneRoot
│   ├── MyScene_Quad_0_0 (SubScene GameObject)
│   ├── MyScene_Quad_0_1 (SubScene GameObject)
│   ├── MyScene_Quad_1_0 (SubScene GameObject)
│   └── ... (more SubScenes)
└── [Original GameObjects remain unless your workflow/modifications move/remove them]
```

**Individual SubScene File (MyScene_Quad_0_0.unity):**
```
MyScene_Quad_0_0.unity
├── Section_Ground (SectionIndex = 0)
│   ├── Rock_001 (cloned from main scene)
│   ├── Rock_002 (cloned from main scene)
│   ├── Terrain_Chunk (cloned from main scene)
│   └── ... (more ground objects)
│
├── Section_LargeObjects (SectionIndex = 1)
│   ├── Building_001 (cloned from main scene)
│   ├── Tree_Large_001 (cloned from main scene)
│   └── ... (more large objects)
│
└── Section_SmallObjects (SectionIndex = 2)
    ├── Prop_001 (cloned from main scene)
    ├── Grass_Patch_001 (cloned from main scene)
    └── ... (more small objects)
```

## Key Components

### SubScene GameObject
**Components:**
- `SubScene` (Unity Entities) - Links to scene asset
- `SubSceneDataComponent` (ProStream) - Metadata and references

**Properties:**
- Position: World position of QuadTree cell center
- SceneAsset: Reference to .unity file
- AutoLoadScene: Whether to load automatically

### Section GameObject
**Components:**
- `SubSceneSection` (ProStream) - Section metadata
- `SceneSectionAuthoring` (Unity Entities) - ECS conversion data

**Properties:**
- SectionIndex: Unique identifier (0, 1, 2, etc.)
- SectionName: Layer name (Ground, LargeObjects, etc.)
- LoadingRange: Layer-driven start/end range used by streaming systems

## Asset Organization

SubScene files are organized in a structured directory:

```
Assets/
└── SubScene_Assets/
    └── MyScene/
        └── Entity/
            ├── MyScene_Quad_0_0.unity
            ├── MyScene_Quad_0_1.unity
            ├── MyScene_Quad_1_0.unity
            └── ... (more SubScene files)
```

## Modification Execution Points

Modifications can run at various stages during SubScene creation:

1. **BeforeSubSceneCreation** - Before any assets are created
2. **BeforeMoveToSubScene** - Before moving section content to SubScene scenes
3. **AfterMoveToSubScene** - After objects are moved into SubScene scenes
4. **BeforeCloseSubScenes** - Before additive SubScene close/save stage
5. **AfterCloseSubScenes** - After close/finalize stage

See [Modification Engine](/editor-guide/engines/modification-engine) for details.

## Console Output

During execution, you'll see progress in the Console:

```
[ProStream] Starting SubScene Creation
[ProStream] Creating 16 SubScene assets...
[ProStream] SubScene assets created
[ProStream] Opening SubScenes additively...
[ProStream] Processing SubScene: MyScene_Quad_0_0
  - Creating section hierarchies...
  - Cloning 23 objects...
  - Running modifications...
  - Moving to SubScene file...
[ProStream] Processing SubScene: MyScene_Quad_0_1
  ...
[ProStream] Closing SubScenes...
[ProStream] Finalizing streaming state...
[ProStream] SubScene Creation Complete in 12.5s
```

## Common Issues

**SubScene files not created**
- Check Console for errors
- Verify Prepare Scene completed
- Ensure write permissions in Assets folder
- Check disk space

**Objects not appearing in SubScenes**
- Verify objects were matched during Prepare Scene
- Check MatchTracker.IsMatched is true
- Ensure objects are prefabs
- Open SubScene files manually to inspect

**Finalization fails**
- Save scene before running process
- Close other scenes first
- Check for compilation errors
- Try restarting Unity

**StreamingManager not created**
- Check if already exists in scene
- Verify SubScene creation completed
- Look for errors in Console

## Performance Considerations

**Processing Time**
- More objects = longer processing
- Complex modifications increase time
- Large scenes may take several minutes

**Memory Usage**
- All SubScenes are opened during processing
- Large scenes may require significant memory
- Close other applications if needed

**Disk Space**
- Each SubScene is a separate file
- Large scenes create many files
- Ensure adequate disk space

## After Completion

Once SubScene Creation completes successfully:

1. SubScene files are created
2. Objects are organized into sections
3. Streaming state is marked ready for runtime systems
4. Scene is ready for Play Mode testing

## Testing in Play Mode

1. Enter Play Mode
2. Move camera/player around scene
3. Watch SubScenes load/unload in Hierarchy
4. Monitor performance in Profiler

## Rebuilding SubScenes

To rebuild SubScenes after changes:

1. Delete existing SubScene files (optional)
2. Adjust configuration (rules, layers, etc.)
3. Re-run Prepare Scene (Calculate Positions)
4. Re-run Create SubScenes

::: warning
Creating SubScenes will overwrite existing SubScene files. Make backups if you've made manual changes to SubScene files.
:::

## See Also

- [Prepare Scene](/processes/prepare-scene) - Previous step in workflow
- [Runtime Streaming](/runtime-systems/runtime-streaming) - How streaming works at runtime
- [Modification Engine](/editor-guide/engines/modification-engine) - Customize SubScene creation
- [Standard Workflow](/getting-started/standard-workflow) - Complete guide
