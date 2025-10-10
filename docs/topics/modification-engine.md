# Modification Engine

## Overview

The **Modification Engine** is a powerful extensibility system that allows you to hook into various stages of ProStream's workflow and perform custom processing on GameObjects, sections, or entire SubScenes. Modifications can run before, during, or after major processes like position calculation and SubScene creation.

Think of modifications as **middleware** or **plugins** that extend ProStream's functionality without modifying core code.

---

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

---

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

---

## Built-in Modifications

ProStream includes several ready-to-use modifications:

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

### CombinePerSectionModification
**Purpose:** Similar to CombineMeshModification but section-aware

**Execution:** PerSection

**Use Case:** Combine meshes within each section separately

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

### FillLODModification
**Purpose:** Automatically generates LOD groups

**Execution:** PerSection

**Use Case:**
- Create LOD levels for objects without them
- Configure LOD distances based on section
- Improve rendering performance for distant objects

---

## Creating Custom Modifications

### Step 1: Create ScriptableObject

Create a new C# script that inherits from `ModificationEngine`:

```csharp
// Filename: Runtime/CustomModifications/MyCustomModification.cs

using instance.id.ProStream;
using UnityEngine;

[CreateAssetMenu(fileName = "MyCustomModification", 
                 menuName = "ProStream/Modifications/My Custom Modification")]
public class MyCustomModification : ModificationEngine
{
    // Configuration fields
    [SerializeField] private float multiplier = 1.5f;
    [SerializeField] private Color targetColor = Color.white;
    
    // Override Title property
    public override string Title => "My Custom Modification";
    
    // Set execution placement
    public override ExecutionPlacement ExecutionPlacement => 
        ExecutionPlacement.PerSection;
}
```

### Step 2: Implement Modification Logic

Override methods based on your needs:

#### Per-GameObject Modifications

```csharp
// Filename: Runtime/CustomModifications/MyCustomModification.cs
// Method: MyCustomModification.ApplyModification

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

// Or modify transforms
public override Transform ApplyModification(Transform tObject)
{
    // Your custom logic here
    return tObject;
}
```

#### Per-Section Preparations

```csharp
// Filename: Runtime/CustomModifications/MyCustomModification.cs
// Method: MyCustomModification.PrepareModification

// Run once per section before processing objects
public override void PrepareModification(GameObject sectionParent)
{
    // Example: Add section-level component
    var sectionData = sectionParent.AddComponent<MyCustomSectionData>();
    sectionData.Initialize();
    
    // Example: Prepare data structures
    Log("Preparing section: " + sectionParent.name);
}

// Or prepare with list of objects
public override void PrepareModification(List<GameObject> objects)
{
    // Batch processing preparation
    Log($"Preparing {objects.Count} objects for modification");
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

---

## Modification Properties

### Core Properties

**ExecutionPlacement**
- Determines when modification runs
- Set via property override or Inspector

**ExecutionOrder** (optional)
- Controls order within same ExecutionPlacement
- Lower numbers run first (-1 = unordered)

**ModificationEnabled**
- Whether modification is active
- Toggled in ProStream Editor

**SceneType**
- Which scene types this modification applies to
- Options: Entity, GameObject, InstanceObject, etc.

**ModRunType**
- How modification should run
- Options: None, PerObject, PerSection, PerSubScene

---

## Advanced Features

### Execution Checks

Use helper methods to control execution:

```csharp
// Filename: Runtime/CustomModifications/AdvancedModification.cs
// Method: AdvancedModification.ApplyModification

public override GameObject ApplyModification(GameObject gObject)
{
    // Only run for specific placement and scene type
    if (!ExecutionCheck(ExecutionPlacement.PerSection, SceneType.Entity))
        return gObject;
    
    // Your modification logic
    return gObject;
}
```

### Parameter Validation

```csharp
// Filename: Runtime/CustomModifications/AdvancedModification.cs
// Method: AdvancedModification.PrepareModification

public override T PrepareModification<T>(params object[] parameters)
{
    // Verify parameter type
    if (!VerifyParameter<SceneConnector>(parameters[0], out var connector))
        return default;
    
    // Use validated parameter
    Log($"Processing scene: {connector.gameObject.scene.name}");
    return default;
}
```

### Lifecycle Callbacks

```csharp
// Filename: Runtime/CustomModifications/AdvancedModification.cs
// Class: AdvancedModification

// Called when modification is enabled
public override void UponEnabled()
{
    base.UponEnabled();
    Log("Modification enabled!");
    // Initialize resources
}

// Called when modification is disabled
public override void UponDisabled()
{
    base.UponDisabled();
    Log("Modification disabled!");
    // Cleanup resources
}
```

---

## Best Practices

### Performance
- ✅ Keep modifications lightweight
- ✅ Use batch processing when possible
- ✅ Cache component references
- ✅ Avoid expensive operations in tight loops
- ✅ Profile modifications with Unity Profiler

### Design
- ✅ Make modifications configurable via Inspector
- ✅ Provide clear Title and description
- ✅ Use appropriate ExecutionPlacement
- ✅ Handle edge cases (null checks, missing components)
- ✅ Log important operations for debugging

### Testing
- ✅ Test with small scenes first
- ✅ Verify modifications work at all execution placements
- ✅ Check results in SubScene files after creation
- ✅ Test in Play Mode and builds
- ✅ Validate with various scene types

### Documentation
- ✅ Comment your code thoroughly
- ✅ Document configuration fields
- ✅ Explain expected behavior
- ✅ Note any requirements or limitations
- ✅ Provide usage examples

---

## Troubleshooting

### Issue: Modification Not Running

**Causes:**
- Modification not enabled in ProStream Editor
- Wrong ExecutionPlacement for workflow
- SceneType filter doesn't match

**Solutions:**
1. Check enabled state in ProStream Editor
2. Verify ExecutionPlacement is correct
3. Ensure SceneType includes target scenes
4. Check Console for errors
5. Add logging to verify calls

### Issue: Modification Runs Multiple Times

**Cause:** ExecutionPlacement called multiple times

**Solution:**
- Review when your chosen placement executes
- Use ExecutionOrder to control sequencing
- Add guards in code to prevent duplicate processing

### Issue: Objects Not Modified

**Causes:**
- Wrong method overridden
- Returning wrong value
- Filtering excluding objects

**Solutions:**
1. Override correct method (ApplyModification vs PrepareModification)
2. Ensure you return modified GameObject/Transform
3. Check filtering logic (ExecutionCheck, etc.)
4. Log to verify method is called
5. Inspect objects in Inspector during process

### Issue: Performance Problems

**Causes:**
- Expensive operations per object
- No caching or batching
- Inefficient algorithms

**Solutions:**
1. Profile with Unity Profiler
2. Move expensive work to PrepareModification
3. Batch similar operations
4. Cache component references
5. Consider different ExecutionPlacement

---

## Example: Complete Custom Modification

```csharp
// Filename: Runtime/CustomModifications/RemoveUnusedComponents.cs

using System.Collections.Generic;
using instance.id.ProStream;
using UnityEngine;

[CreateAssetMenu(fileName = "RemoveUnusedComponents", 
                 menuName = "ProStream/Modifications/Remove Unused Components")]
public class RemoveUnusedComponents : ModificationEngine
{
    [SerializeField] private bool removeAnimators = true;
    [SerializeField] private bool removeAudioSources = true;
    [SerializeField] private bool removeParticleSystems = false;
    
    private int removedCount = 0;
    
    public override string Title => "Remove Unused Components";
    public override ExecutionPlacement ExecutionPlacement => 
        ExecutionPlacement.PerSection;
    
    // Initialize counters per section
    public override void PrepareModification(GameObject sectionParent)
    {
        removedCount = 0;
        Log($"Processing section: {sectionParent.name}");
    }
    
    // Process each GameObject
    public override GameObject ApplyModification(GameObject gObject)
    {
        if (removeAnimators)
        {
            var animator = gObject.GetComponent<Animator>();
            if (animator)
            {
                DestroyImmediate(animator);
                removedCount++;
            }
        }
        
        if (removeAudioSources)
        {
            var audioSource = gObject.GetComponent<AudioSource>();
            if (audioSource)
            {
                DestroyImmediate(audioSource);
                removedCount++;
            }
        }
        
        if (removeParticleSystems)
        {
            var particleSystem = gObject.GetComponent<ParticleSystem>();
            if (particleSystem)
            {
                DestroyImmediate(particleSystem);
                removedCount++;
            }
        }
        
        return gObject;
    }
    
    // Log results after section complete
    public override void PrepareModification(List<GameObject> objects)
    {
        Log($"Removed {removedCount} unused components from {objects.Count} objects");
    }
}
```

---

## Related Topics

<seealso>
    <category ref="engines">
        <a href="rule-engine.md">Rule Engine</a>
        <a href="operation-engine.md">Operation Engine</a>
    </category>
    <category ref="processes">
        <a href="position-calculation.md">Position Calculation Process</a>
        <a href="process-subscenes.md">SubScene Creation Process</a>
    </category>
    <category ref="advanced">
        <a href="">Custom Development Guide (Coming Soon)</a>
    </category>
</seealso>