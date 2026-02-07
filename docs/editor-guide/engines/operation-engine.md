# Operation Engine

The **Operation Engine** is the execution framework that performs major tasks in ProStream. While [Modifications](/editor-guide/engines/modification-engine) enhance and transform data during processes, **Operations** are the actual processes themselves.

## Overview

Operations are typically complex, multi-step procedures that orchestrate workflows like calculating positions, creating SubScenes, or resetting scene state.

### Operations vs Modifications

| Aspect | Operations | Modifications |
|--------|-----------|---------------|
| **Purpose** | Execute major processes | Transform/enhance data |
| **Scope** | Entire workflows | Specific stages |
| **Execution** | Triggered explicitly | Run during operations |
| **Examples** | Calculate positions, Create SubScenes | Combine meshes, Remove components |
| **Complexity** | High (multi-phase) | Low to Medium (focused) |

## Built-in Operations

### GenerateLocationDataOp
**Purpose:** Calculate object positions and apply match rules

**What it does:**
- Applies all enabled match rules
- Assigns objects to sections
- Creates QuadTree spatial grid
- Generates ObjectSectionDetails
- Builds QuadSubSceneData

**Trigger:** "Calculate Positions" button

**Documentation:** [Position Calculation Process](/processes/position-calculation)

### CreateSubScenesOp
**Purpose:** Create SubScene asset files

**Workflow-specific implementations:**
- `CreateGameObjectSubScenesOp` - For standard GameObject workflow
- `CreateDataObjectSubScenesOp` - For DataObject workflow
- `CreateInstanceObjectSubSceneWorkflow` - For InstanceObject workflow

**What it does:**
- Creates SubScene asset files
- Generates section hierarchies
- Clones and organizes objects
- Executes modifications at various stages
- Finalizes and saves SubScenes

**Trigger:** "Create SubScenes" button

**Documentation:** [SubScene Creation Process](/processes/process-subscenes)

### ResetSceneOp
**Purpose:** Reset scene to pre-processing state

**What it does:**
- Removes SubScene GameObjects
- Clears generated data
- Resets SceneConnector state
- Optionally deletes SubScene assets
- Returns scene to clean state

**Trigger:** "Reset Scene" button

**Use Case:**
- Start over with different configuration
- Clean up after testing
- Remove broken SubScene setup

### TrackPrefabsOp
**Purpose:** Track and manage prefab references

**What it does:**
- Scans scene for prefab instances
- Records prefab dependencies
- Validates prefab connections
- Helps maintain prefab integrity during processing

**Trigger:** Automatic during setup

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

```csharp
// Before main operation
RunModifications(ExecutionPlacement.BeforePositionCalculation);

// Main operation logic
PerformCalculations();

// After main operation
RunModifications(ExecutionPlacement.AfterPositionCalculation);
```

## Creating Custom Operations

Custom operations are advanced and typically not needed for most users. If you need custom workflow behavior, consider using [Modifications](/editor-guide/engines/modification-engine) instead.

## Operation State Management

Operations track their state during execution:

**States:**
- **Idle** - Not running
- **Preparing** - Initializing
- **Running** - Executing main logic
- **Finalizing** - Cleaning up
- **Complete** - Finished successfully
- **Error** - Failed with error
- **Cancelled** - User cancelled

## Progress Reporting

Operations report progress through:
- Progress bars in ProStream Editor
- Console log messages
- Status updates in UI

## Error Handling

Operations handle errors gracefully:
- Validation before execution
- Try-catch blocks around critical sections
- Rollback on failure when possible
- Clear error messages in console

## See Also

- [Modification Engine](/editor-guide/engines/modification-engine) - Extend operation behavior
- [Position Calculation](/processes/position-calculation) - GenerateLocationDataOp details
- [SubScene Creation](/processes/process-subscenes) - CreateSubScenesOp details
