# Modification Engine

The **Modification Engine** is a powerful extensibility system that allows you to hook into various stages of ProStream's workflow and perform custom processing on GameObjects, sections, or entire SubScenes.

## Overview

Think of modifications as **middleware** or **plugins** that extend ProStream's functionality without modifying core code. Modifications can run before, during, or after major processes like Prepare Scene and SubScene creation.

## Key Concepts

### What is a Modification?

A modification is a `ScriptableObject` that inherits from <QuickInfo preset="terms.modification-engine"><code>ModificationEngine</code></QuickInfo> and implements custom logic to transform or enhance GameObjects during the ProStream workflow.

### When to Use Modifications

**Common Use Cases:**
- **Mesh Combining** - Merge multiple meshes per section for performance
- **Collider Extraction** - Move colliders to separate layers to retain physics interaction
- **Component Removal** - Strip unnecessary components (e.g., colliders in visual-only sections)
- **Custom Data Setup** - Add/configure custom components

## Execution Placements

Modifications can execute at multiple points in the workflow:

### Prepare Scene Stage
- **BeforePositionCalculation** - Before rule matching begins
- **AfterPositionCalculation** - After rules applied, before SubScene creation

### SubScene Creation Stage
- **BeforeSubSceneCreation** - Before SubScene assets are created
- **AfterSubSceneCreation** - After SubScene creation stage
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
- **FinalizeAssets** - Final asset finalization stage

### Manual Execution
- **Manual** - Only runs when explicitly triggered
- **Disabled** - Modification is inactive

## Built-in Modifications

### CombineMeshModification
**Purpose:** Combines multiple meshes into single mesh for performance

**Execution:** Commonly used during process events (for example `BeforeMoveToSubScene`) based on your project setup

**Benefits:**
- Can reduce draw commands for unique, non-instanced geometry
- Can help with tightly clustered static geometry that is usually visible together
- Useful for some static sets (for example ground chunks or dense rock groups)

**DOTS/ECS Note:**
- In ECS SubScenes, Entities Graphics already batches efficiently when entities share the same mesh and material (DOTS instancing)
- Combining too aggressively can reduce culling granularity; if part of a combined mesh is visible, the whole mesh is rendered
- Prefer separate repeated objects when they can instance well and benefit from finer culling/occlusion; use mesh combining selectively and verify with profiling

**Configuration:**
- Target layer/section
<!-- - Material handling (combine or preserve)
- Mesh simplification options -->

**Usage Tips:**
- Best paired with a very specific match rule and target layer/section to target specific objects (e.g., A custom match rule that only matches small rock clusters, then combine those clusters into single meshes in a "Rocks_Combined" layer/section)

### DisableMeshColliderModification
**Purpose:** Removes MeshCollider components from GameObjects

**Execution:** Commonly `BeforeMoveToSubScene` (default settings)

**Use Case:**
- Remove colliders from visual-only sections
- Reduce physics overhead
- Keep colliders in dedicated collision layers only

### RemoveMatchComponents
**Purpose:** Removes MatchTracker and related components after processing

**Execution:** Commonly `BeforeMoveToSubScene` (default settings)

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
                 menuName = "instance.id/ProStream/ModificationEngine/MyCustomModification")]
public class MyCustomModification : ModificationEngine
{
    [SerializeField] private float multiplier = 1.5f;
    [SerializeField] private Color targetColor = Color.white;

    public override string Title => "My Custom Modification";

    public override ExecutionPlacement ExecutionPlacement =>
        ExecutionPlacement.BeforeMoveToSubScene;
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
2. Select **Create → instance.id → ProStream → ModificationEngine → MyCustomModification**
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
- Verify modifications work at all necessary execution placements
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
