# SubScene Creation Process

## Overview

The SubScene Creation process is the final major step in the ProStream workflow. After calculating object positions and matching rules, this process creates physical Unity scene files (.unity) for each spatial division (QuadTree cell), organizes objects into streaming sections, and prepares the scene for distance-based runtime streaming.

This is an **automated process** that handles asset creation, object cloning, hierarchy organization, and scene management.

---

## When to Use

**Prerequisites:**
- Scene setup is complete
- Search filters are configured
- Match rules are enabled
- **Position Calculation has been run successfully**

**Trigger:** Click the **"Create SubScenes"** button in the ProStream Editor after positions are calculated.

---

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
- Reloads main scene to finalize changes
- Creates StreamingManager for runtime control
- Prepares scene for play mode testing

---

## Process Flow

```
User Clicks "Create SubScenes" Button
    ↓
PreCheck Validation
    ↓
Create SubScene Assets (Batch)
    ├── For Each QuadTree Cell:
    │   ├── Generate SubScene Name
    │   ├── Create SubScene GameObject
    │   ├── Create Directory Structure
    │   ├── Create Scene File (.unity)
    │   └── Register with AssetDatabase
    ↓
Open All SubScenes (Additive)
    ↓
Process Each SubScene
    ├── Create Section Hierarchies
    │   ├── Section_Ground (index 0)
    │   ├── Section_LargeObjects (index 1)
    │   └── Section_SmallObjects (index 2)
    │
    ├── Clone Objects to Sections
    │   ├── Get objects for this QuadTree cell
    │   ├── Check MatchTracker.SectionId
    │   ├── Clone to correct section parent
    │   └── Store cloned references
    │
    ├── Run Modifications
    │   ├── BeforeObjectCopy
    │   ├── PerSection
    │   ├── BeforeMoveToSubScene
    │   └── AfterMoveToSubScene
    │
    └── Move Section Hierarchies to SubScene
        └── SceneManager.MoveGameObjectToScene()
    ↓
Close All SubScenes
Save Main Scene
    ↓
Reload Main Scene
    ↓
Create StreamingManager
    ↓
Complete - Ready for Play Mode
```

---

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
└── [Original GameObjects remain temporarily]
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

---

## Key Components

### SubScene GameObject
**Components:**
- `SubScene` (Unity Entities) - Links to scene asset
- `SubSceneDataComponent` (ProStream) - Metadata and references

**Properties:**
- Position: World position of QuadTree cell center
- SceneAsset: Reference to .unity file
- Parent: SubSceneRoot GameObject

### Section GameObject
**Components:**
- `SubSceneSection` (ProStream) - Section configuration
- `SceneSectionAuthoring` (Unity Entities) - DOTS streaming

**Properties:**
- SectionIndex: Matches layer configuration (0, 1, 2, etc.)
- SectionData: Reference to layer settings (distance, persistent flag)

**Purpose:** Enables Unity Entities to load/unload sections independently based on distance.

---

## Streaming Sections Explained

**ProStream Layers → Unity Entities Sections:**

Layers defined in ProStream (e.g., "Ground", "LargeObjects", "SmallObjects") map to Unity Entities sections by index. Each section can be loaded/unloaded at runtime based on distance from the loading trigger.

**Example Configuration:**
- **Section 0 (Ground):** Load at 100m distance
- **Section 1 (LargeObjects):** Load at 200m distance
- **Section 2 (SmallObjects):** Load at 50m distance
- **Section 3 (Persistent):** Always loaded

**Runtime Behavior:**
When the player/camera is 150m away from a QuadTree cell:
- ✅ Section 1 (LargeObjects) is loaded (within 200m)
- ✅ Section 0 (Ground) is loaded (within 100m)
- ❌ Section 2 (SmallObjects) is NOT loaded (outside 50m)
- ✅ Section 3 (Persistent) is always loaded

---

## Asset Organization

**Default Path Structure:**
```
Assets/
└── SubScene_Assets/
    └── {SceneName}/
        └── Entity/
            ├── {SceneName}_Quad_0_0_InstanceObject.unity
            ├── {SceneName}_Quad_0_1_InstanceObject.unity
            ├── {SceneName}_Quad_1_0_InstanceObject.unity
            └── ... (one file per QuadTree cell)
```

**Naming Convention:**
- Format: `{SceneName}_Quad_{X}_{Y}_{Type}.unity`
- Example: `MyLevel_Quad_5_7_InstanceObject.unity`
- Negative coordinates use 'n' prefix: `MyLevel_Quad_n3_4_InstanceObject.unity`

---

## Modification System

Modifications allow custom processing at specific stages of SubScene creation.

**Execution Placements:**
1. **BeforeSubSceneCreation** - Before asset files are created
2. **BeforeObjectCopy** - Before cloning objects
3. **PerSection** - After copying objects to each section
4. **BeforeMoveToSubScene** - Before moving sections to SubScene
5. **AfterMoveToSubScene** - After moving to SubScene
6. **BeforeCloseSubScenes** - Before closing SubScene files
7. **AfterCloseSubScenes** - After closing all SubScenes

**Common Use Cases:**
- Mesh combining per section
- LOD generation
- Material batching
- Physics data baking
- Custom component setup

**Enable/Configure:** Modifications are managed in the ProStream Editor, similar to rules.

---

## Troubleshooting

### Issue: SubScene Files Not Created

**Symptoms:**
- Process completes but no `.unity` files in project
- Error: "SubScene Asset path is missing"

**Solutions:**
1. Check `Assets/SubScene_Assets/` folder exists
2. Verify write permissions on Assets folder
3. Check Console for AssetDatabase errors
4. Try `AssetDatabase.Refresh()` manually

### Issue: Objects Not Appearing in SubScenes

**Symptoms:**
- SubScenes created but empty
- Objects missing from sections

**Solutions:**
1. Verify Position Calculation ran successfully
2. Check MatchTracker components have `isMatched = true`
3. Verify MatchTracker.SectionId matches layer indices
4. Check section lookup dictionary in logs

### Issue: Scene Reloads Clears Objects

**Symptoms:**
- Objects disappear after scene reload
- SubScenes appear empty in hierarchy

**Solutions:**
1. This is normal - original objects are removed
2. Objects are now in SubScene files, not main scene
3. Check SubScene `.unity` files directly
4. Objects will load at runtime based on distance

### Issue: Build Errors

**Symptoms:**
- Build fails after creating SubScenes
- Missing reference errors

**Solutions:**
1. Ensure all SubScene assets are included in build
2. Check SRP (Scriptable Render Pipeline) assets assigned (see [Build/Runtime Issues](build-runtime.md))
3. Verify all prefab references are valid
4. Check that all required scenes are in Build Settings

---

## Best Practices

### Before Creation
- ✅ Run Position Calculation successfully first
- ✅ Verify all objects are matched (check logs)
- ✅ Test rule configuration thoroughly
- ✅ Save scene and backup project

### During Creation
- ✅ Don't cancel the process midway
- ✅ Monitor Console for warnings/errors
- ✅ Be patient - large scenes take time

### After Creation
- ✅ Test in Play Mode immediately
- ✅ Verify streaming behavior works
- ✅ Check SubScene files in Project window
- ✅ Inspect section organization in SubScene files
- ✅ Save your work!

### Performance Tips
- Smaller QuadTree cells = more SubScenes = more overhead
- Larger QuadTree cells = fewer SubScenes = less granular streaming
- Balance based on scene size and target platform
- Use persistent layers for critical objects
- Test on target hardware early

---

## Testing Your SubScenes

### In Editor (Play Mode)
1. Enter Play Mode
2. Move camera/player around scene
3. Observe SubScenes loading/unloading in Hierarchy
4. Check Entity Debugger (Window → DOTS → Entity Hierarchy)
5. Monitor performance with Profiler

### Scene View Visualization
- SubScene bounds shown as wireframe boxes
- Section gizmos (if enabled)
- Distance debug visualization (if enabled)

### Build Testing
1. Add main scene to Build Settings
2. Build for target platform
3. Test streaming in built application
4. Monitor memory usage and performance

---

## Related Topics

<seealso>
    <category ref="processes">
        <a href="position-calculation.md">Position Calculation Process (Required First)</a>
        <a href="basic-workflow.md">Complete Workflow Overview</a>
    </category>
    <category ref="components">
        <a href="scene-connector.md">SceneConnector Component</a>
        <a href="streaming-layers.md">Streaming Layers Configuration</a>
    </category>
    <category ref="addInfo">
        <a href="build-runtime.md">Build & Runtime Issues</a>
    </category>
</seealso>