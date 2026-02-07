# Modification Engine

The **Modification Engine** is a powerful extensibility system that allows you to hook into various stages of ProStream's workflow and perform custom processing on GameObjects, sections, or entire SubScenes.

## Overview

Think of modifications as **middleware** or **plugins** that extend ProStream's functionality without modifying core code. Modifications can run before, during, or after major processes like position calculation and SubScene creation.

## Key Concepts

### What is a Modification?

A modification is a `ScriptableObject` that inherits from `ModificationEngine` and implements custom logic to transform or enhance GameObjects during the ProStream workflow.

### When to Use Modifications

**Common Use Cases:**
- **Mesh Combining** - Merge multiple meshes per section for performance
- **LOD Generation** - Create LOD groups automatically
- **Component Removal** - Strip unnecessary components (e.g., colliders in visual-only sections)
- **Material Optimization** - Batch materials, reduce draw calls
- **Physics Baking** - Pre-compute physics data
- **Custom Data Setup** - Add/configure custom components
- **Validation** - Check for issues before finalizing SubScenes

## Execution Placements

Modifications can execute at multiple points in the workflow:

### Position Calculation Stage
- **BeforePositionCalculation** - Before rule matching begins
- **AfterPositionCalculation** - After rules applied, before SubScene creation

### SubScene Creation Stage
- **BeforeSubSceneCreation** - Before SubScene assets are created
- **BeforeObjectCopy** - Before cloning objects from main scene
- **PerSection** - After objects copied to each section (most common)
- **BeforeMoveToSubScene** - Before sections moved to SubScene files
- **AfterMoveToSubScene** - After sections in SubScene files
- **BeforeCloseSubScenes** - Before SubScene files are closed
- **AfterCloseSubScenes** - After all SubScenes closed

### Process Management
- **UponProcessStarting** - When any major process starts
- **UponProcessCompletion** - When any major process completes

### Scene Reset
- **BeforeSceneReset** - Before resetting scene state
- **AfterSceneReset** - After scene reset complete

### Build Pipeline
- **BeforeBuildStarted** - Before Unity build begins
- **AfterBuildComplete** - After Unity build finishes

### Manual Execution
- **Manual** - Only runs when explicitly triggered
- **Disabled** - Modification is inactive

## Built-in Modifications

### CombineMeshModification
**Purpose:** Combines multiple meshes into single mesh for performance

**Execution:** PerSection

**Benefits:**
- Reduces draw calls significantly
- Improves rendering performance
- Useful for static objects (ground, rocks, etc.)

**Configuration:**
- Target layer/section
- Material handling (combine or preserve)
- Mesh simplification options

### DisableMeshColliderModification
**Purpose:** Removes MeshCollider components from GameObjects

**Execution:** PerSection or AfterMoveToSubScene

**Use Case:**
- Remove colliders from visual-only sections
- Reduce physics overhead
- Keep colliders in dedicated collision layers only

### RemoveMatchComponent
**Purpose:** Removes MatchTracker and related components after processing

**Execution:** AfterCloseSubScenes

**Use Case:**
- Clean up temporary components
- Reduce runtime memory usage
- Remove editor-only data

## Creating Custom Modifications

### Step 1: Create ScriptableObject

```csharp
using instance.id.ProStream;
using UnityEngine;

[CreateAssetMenu(fileName = "MyCustomModification", 
                 menuName = "ProStream/Modifications/My Custom Modification")]
public class MyCustomModification : ModificationEngine
{
    [SerializeField] private float multiplier = 1.5f;
    [SerializeField] private Color targetColor = Color.white;
    
    public override string Title => "My Custom Modification";
    
    public override ExecutionPlacement ExecutionPlacement => 
        ExecutionPlacement.PerSection;
}
```

### Step 2: Implement Modification Logic

```csharp
// Modify individual GameObjects
public override GameObject ApplyModification(GameObject gObject)
{
    // Example: Scale objects
    gObject.transform.localScale *= multiplier;
    
    // Example: Change material color
    var renderer = gObject.GetComponent<Renderer>();
    if (renderer && renderer.material)
    {
        renderer.material.color = targetColor;
    }
    
    return gObject;
}

// Run once per section before processing objects
public override void PrepareModification(GameObject sectionParent)
{
    // Example: Add section-level component
    var sectionData = sectionParent.AddComponent<MyCustomSectionData>();
    sectionData.Initialize();
    
    Log("Preparing section: " + sectionParent.name);
}
```

### Step 3: Create Asset Instance

1. Right-click in Project window
2. Select **Create → ProStream → Modifications → My Custom Modification**
3. Name the asset (e.g., `ScaleObjects_Mod`)
4. Configure settings in Inspector

### Step 4: Enable in ProStream Editor

1. Open ProStream Editor
2. Navigate to **Modifications** section
3. Click **Add Modification**
4. Select your modification asset
5. Enable it (checkbox)
6. Configure execution placement and order

## Best Practices

### Performance
- Keep modifications lightweight
- Use batch processing when possible
- Cache component references
- Avoid expensive operations in tight loops
- Profile modifications with Unity Profiler

### Design
- Make modifications configurable via Inspector
- Provide clear Title and description
- Use appropriate ExecutionPlacement
- Handle edge cases (null checks, missing components)
- Log important operations for debugging

### Testing
- Test with small scenes first
- Verify modifications work at all execution placements
- Check results in SubScene files after creation
- Test in Play Mode and builds
- Validate with various scene types

## Common Use Cases

### Mesh Combining Example

```csharp
public override void PrepareModification(GameObject sectionParent)
{
    var meshFilters = sectionParent.GetComponentsInChildren<MeshFilter>();
    var combine = new CombineInstance[meshFilters.Length];
    
    for (int i = 0; i < meshFilters.Length; i++)
    {
        combine[i].mesh = meshFilters[i].sharedMesh;
        combine[i].transform = meshFilters[i].transform.localToWorldMatrix;
    }
    
    var combinedMesh = new Mesh();
    combinedMesh.CombineMeshes(combine);
    
    // Apply combined mesh
    var meshFilter = sectionParent.AddComponent<MeshFilter>();
    meshFilter.mesh = combinedMesh;
}
```

### Component Cleanup Example

```csharp
public override GameObject ApplyModification(GameObject gObject)
{
    // Remove unnecessary components
    if (gObject.TryGetComponent<Collider>(out var collider))
    {
        DestroyImmediate(collider);
    }
    
    if (gObject.TryGetComponent<Rigidbody>(out var rb))
    {
        DestroyImmediate(rb);
    }
    
    return gObject;
}
```

## See Also

- [Operation Engine](/editor-guide/engines/operation-engine) - Major process execution
- [SubScene Creation](/processes/process-subscenes) - When modifications run
- [Standard Workflow](/getting-started/standard-workflow) - Complete setup guide
