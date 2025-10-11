# Operation Engine

## Overview

The **Operation Engine** is the execution framework that performs major tasks in ProStream. While [Modifications](modification-engine.md) enhance and transform data during processes, **Operations** are the actual processes themselves - the heavy lifting that drives ProStream's core functionality.

Operations are typically complex, multi-step procedures that orchestrate workflows like calculating positions, creating SubScenes, or resetting scene state.

---

## Key Concepts

### What is an Operation?

An operation is a `ScriptableObject` that inherits from `OperationEngine` and implements a complete workflow or process. Operations are the "verbs" of ProStream - they **do** things, while modifications **modify** things.

###Key Differences: Operations vs Modifications

| Aspect | Operations | Modifications |
|--------|-----------|---------------|
| **Purpose** | Execute major processes | Transform/enhance data |
| **Scope** | Entire workflows | Specific stages |
| **Execution** | Triggered explicitly | Run during operations |
| **Examples** | Calculate positions, Create SubScenes | Combine meshes, Remove components |
| **Complexity** | High (multi-phase) | Low to Medium (focused) |

---

## Built-in Operations

ProStream includes several core operations:

### GenerateLocationDataOp
**Purpose:** Calculate object positions and apply match rules

**What it does:**
- Applies all enabled match rules
- Assigns objects to sections
- Creates QuadTree spatial grid
- Generates ObjectSectionDetails
- Builds QuadSubSceneData

**Trigger:** "Calculate Positions" button

**Documentation:** [Position Calculation Process](position-calculation.md)

---

### CreateSubScenesOp (Base)
**Purpose:** Base class for SubScene creation operations

**Workflow-specific implementations:**
- `CreateGameObjectSubScenesOp` - For standard GameObject workflow
- `CreateDataObjectSubScenesOp` - For DataObject workflow
- `CreateInstanceObjectSubSceneWorkflow` - For InstanceObject workflow
- `CreateRemoteSceneSubScenesOp` - For RemoteScene workflow
- `CreateColliderScenesWorkflow` - For ColliderObject workflow

**What it does:**
- Creates SubScene asset files
- Generates section hierarchies
- Clones and organizes objects
- Executes modifications at various stages
- Finalizes and saves SubScenes

**Trigger:** "Create SubScenes" button

**Documentation:** [SubScene Creation Process](process-subscenes.md)

---

### ResetSceneOp
**Purpose:** Reset scene to pre-processing state

**What it does:**
- Removes SubScene GameObjects
- Clears generated data
- Resets SceneConnector state
- Optionally deletes SubScene assets
- Returns scene to clean state

**Trigger:** "Reset Scene" button (Tools tab)

**Use Case:**
- Start over with different configuration
- Clean up after testing
- Remove broken SubScene setup

---

### TrackPrefabsOp
**Purpose:** Track and manage prefab references

**What it does:**
- Scans scene for prefab instances
- Records prefab dependencies
- Validates prefab connections
- Helps maintain prefab integrity during processing

**Trigger:** Automatic during setup

---

### ConvertObjectsToDataOp
**Purpose:** Convert GameObjects to DataObjects (workflow-specific)

**What it does:**
- Extracts data from GameObjects
- Creates DataObject representations
- Prepares for entity conversion
- Optimizes for DOTS pipeline

**Trigger:** Part of DataObject workflow

---

## Operation Execution Flow

### Typical Operation Structure

```
Operation Triggered (Button Click / Event)
    ↓
PrepareOperation()
    - Validate parameters
    - Initialize data structures
    - Perform pre-checks
    ↓
PerformOperation()
    - Execute main logic
    - Call sub-processes
    - Run modifications at appropriate stages
    - Handle errors/cancellation
    ↓
Finalize
    - Save results
    - Update state
    - Trigger callbacks
    - Clean up resources
    ↓
Complete
```

### Integration with Modifications

Operations call modifications at specific execution placements:

```c#
// Filename: Runtime/Operations/ExampleOp.cs
// Method: ExampleOp.PerformOperation

public override void PerformOperation(params object[] parameters)
{
    // Early stage
    RunModifications(ExecutionPlacement.BeforeSubSceneCreation);
    
    // Create SubScene assets
    CreateSubSceneAssets();
    
    // Mid stage
    RunModifications(ExecutionPlacement.BeforeObjectCopy);
    
    // Process objects
    for (each section)
    {
        CopyObjectsToSection();
        
        // Per-section modifications
        RunModifications(ExecutionPlacement.PerSection, section);
    }
    
    // Late stage
    RunModifications(ExecutionPlacement.AfterMoveToSubScene);
}
```

---

## Creating Custom Operations

### When to Create Custom Operations

Consider creating a custom operation when you need to:
- Implement a new workflow type
- Add a major new feature
- Automate complex multi-step processes
- Create specialized processing pipelines

**Note:** Most customization should be done with [Modifications](modification-engine.md), not Operations. Operations are for framework-level extensions.

### Step 1: Create ScriptableObject

```c#
// Filename: Runtime/CustomOperations/MyCustomOperation.cs

using Cysharp.Threading.Tasks;
using instance.id.ProStream;
using UnityEngine;

[CreateAssetMenu(fileName = "MyCustomOperation", 
                 menuName = "ProStream/Operations/My Custom Operation")]
public class MyCustomOperation : OperationEngine
{
    // Operation metadata
    public override SceneType sceneType => SceneType.Entity;
    public override ExecutionPlacement executionPlacement => 
        ExecutionPlacement.Manual;
}
```

### Step 2: Implement Operation Logic

```c#
// Filename: Runtime/CustomOperations/MyCustomOperation.cs
// Method: MyCustomOperation.PerformOperation

public override async UniTask PerformOperation<T>(
    T parameter, 
    params object[] parameters) 
    where T : MonoBehaviour
{
    // Validate parameters
    if (!VerifyParameter<SceneConnector>(parameter, out var connector))
        return;
    
    // Initialize timer for performance tracking
    var timer = GetTimer("MyCustomOperation");
    timer.Start("Total Time", "MyCustomOperation");
    
    try
    {
        // Phase 1: Preparation
        Log("Phase 1: Preparing operation");
        await PreparePhase(connector);
        
        // Phase 2: Execution
        Log("Phase 2: Executing main logic");
        await ExecutePhase(connector);
        
        // Phase 3: Finalization
        Log("Phase 3: Finalizing");
        FinalizePhase(connector);
        
        timer.Stop("Total Time");
        Log($"Operation complete: {timer.GetTime("Total Time")}ms");
    }
    catch (System.Exception ex)
    {
        Log($"Operation failed: {ex.Message}", Level.Error);
        throw;
    }
}
```

### Step 3: Add Helper Methods

```c#
// Filename: Runtime/CustomOperations/MyCustomOperation.cs
// Class: MyCustomOperation

private async UniTask PreparePhase(SceneConnector connector)
{
    // Validation
    if (connector.ruleList.IsNullOrZero())
    {
        Log("No rules configured", Level.Error);
        return;
    }
    
    // Clear previous data
    connector.Data.ClearSetupData();
    
    // Run pre-modifications
    RunModifications(connector, ExecutionPlacement.UponProcessStarting);
    
    await UniTask.Yield();
}

private async UniTask ExecutePhase(SceneConnector connector)
{
    // Main operation logic
    int processedCount = 0;
    
    foreach (var obj in connector.MatchedGameObjects)
    {
        // Process each object
        ProcessObject(obj);
        processedCount++;
        
        // Yield periodically for responsiveness
        if (processedCount % 100 == 0)
            await UniTask.Yield();
    }
    
    Log($"Processed {processedCount} objects");
}

private void FinalizePhase(SceneConnector connector)
{
    // Save results
    connector.SaveData();
    
    // Run post-modifications
    RunModifications(connector, ExecutionPlacement.UponProcessCompletion);
    
    // Update state
    connector.Settings.CustomOperationComplete = true;
}
```

---

## Operation Properties

### SceneType
Specifies which scene types this operation applies to:
- `SceneType.Entity` - Standard entity scenes
- `SceneType.GameObject` - GameObject scenes
- `SceneType.InstanceObject` - Instance object scenes
- `SceneType.WorkflowObject` - Workflow-specific scenes

### ExecutionPlacement
Defines when the operation can be executed:
- `ExecutionPlacement.Manual` - Triggered explicitly by user
- Other placements typically used for modifications

---

## Advanced Features

### Async/Await Support

Operations support async execution using UniTask:

```c#
// Filename: Runtime/CustomOperations/AsyncOperation.cs
// Method: AsyncOperation.PerformOperation

public override async UniTask PerformOperation<T>(
    T parameter, 
    params object[] parameters) 
    where T : MonoBehaviour
{
    // Long-running operations
    await LongRunningProcess();
    
    // Yield control periodically
    await UniTask.Yield();
    
    // Delay if needed
    await UniTask.Delay(100);
}
```

### Performance Tracking

Use built-in Timer for performance monitoring:

```c#
// Filename: Runtime/CustomOperations/TimedOperation.cs
// Method: TimedOperation.PerformOperation

var timer = GetTimer("MyOperation");

timer.Start("Phase1", "Phase 1 Processing");
// ... do work ...
timer.Stop("Phase1");

timer.Start("Phase2", "Phase 2 Processing");
// ... do work ...
timer.Stop("Phase2");

Log($"Phase 1: {timer.GetTime("Phase1")}ms");
Log($"Phase 2: {timer.GetTime("Phase2")}ms");
```

### Error Handling

Implement robust error handling:

```c#
// Filename: Runtime/CustomOperations/SafeOperation.cs
// Method: SafeOperation.PerformOperation

public override void PerformOperation(params object[] parameters)
{
    try
    {
        // Validate all parameters
        ValidateParameters(parameters);
        
        // Execute operation
        ExecuteCore(parameters);
    }
    catch (System.ArgumentException ex)
    {
        Log($"Invalid parameters: {ex.Message}", Level.Error);
        RollbackChanges();
    }
    catch (System.Exception ex)
    {
        Log($"Unexpected error: {ex.Message}", Level.Error);
        RollbackChanges();
        throw; // Re-throw for critical errors
    }
    finally
    {
        // Always clean up
        CleanupResources();
    }
}
```

---

## Best Practices

### Design
- ✅ Break complex operations into phases
- ✅ Make operations cancellable (check for user input)
- ✅ Provide progress feedback
- ✅ Use async/await for long operations
- ✅ Validate all inputs thoroughly

### Performance
- ✅ Profile with Timer
- ✅ Yield control periodically (Unity Dot.Yield())
- ✅ Batch similar operations
- ✅ Cache expensive lookups
- ✅ Use object pooling for frequent allocations

### Error Handling
- ✅ Validate before processing
- ✅ Provide clear error messages
- ✅ Implement rollback for partial failures
- ✅ Log errors with context
- ✅ Don't swallow exceptions silently

### Integration
- ✅ Support modification system
- ✅ Fire appropriate events
- ✅ Update SceneConnector state
- ✅ Save results properly
- ✅ Clean up temporary data

### Testing
- ✅ Test with various scene sizes
- ✅ Verify cancellation works
- ✅ Test error conditions
- ✅ Validate output data
- ✅ Check for memory leaks

---

## Troubleshooting

### Issue: Operation Not Executing

**Causes:**
- Operation not properly registered
- Parameter validation failing
- Exceptions thrown early

**Solutions:**
1. Check Console for error messages
2. Add logging to entry points
3. Verify parameter types match
4. Use debugger to trace execution

### Issue: Operation Hangs/Freezes

**Causes:**
- No yielding in long operations
- Infinite loops
- Blocking calls

**Solutions:**
1. Add `await UniTask.Yield()` periodically
2. Check loop conditions
3. Profile to find bottlenecks
4. Add timeout logic

### Issue: Incomplete Results

**Causes:**
- Early exit on errors
- Partial processing
- State not saved properly

**Solutions:**
1. Check for exceptions/errors in Console
2. Verify finalization logic runs
3. Ensure save operations succeed
4. Add validation after processing

---

## Comparison with Modifications

### When to Use Operations

- ✅ Implementing new workflows
- ✅ Major process automation
- ✅ Complex multi-phase procedures
- ✅ Framework-level features

### When to Use Modifications

- ✅ Enhancing existing workflows
- ✅ Transforming objects
- ✅ Adding optional processing steps
- ✅ Customizing behavior at specific stages

**Rule of Thumb:** If you're not sure, start with a Modification. Most customization needs are better served by modifications.

---

## Related Topics

<seealso>
    <category ref="engines">
        <a href="modification-engine.md">Modification Engine</a>
        <a href="rule-engine.md">Rule Engine</a>
    </category>
    <category ref="processes">
        <a href="position-calculation.md">Position Calculation Process</a>
        <a href="process-subscenes.md">SubScene Creation Process</a>
    </category>
</seealso>
