# Runtime Streaming Systems

ProStream's runtime streaming systems are built on Unity's DOTS (Data-Oriented Technology Stack) and use ECS (Entity Component System) for high-performance, distance-based scene streaming.

## Overview

These systems automatically load and unload SubScenes based on proximity to a loading trigger (typically the player or camera).

## Key Runtime Components

- **SubSceneLoadingSystem** - Handles loading SubScenes and sections
- **SubSceneUnloadingSystem** - Handles unloading SubScenes and sections
- **StreamingManager** - Coordinates streaming operations
- **ProStreamSystem** - Base system infrastructure
- **Loading Trigger** - Reference position for distance calculations (GameObject)

## Core Concepts

### Distance-Based Streaming

ProStream calculates the distance between the **Loading Trigger** (your player/camera) and each SubScene. When the distance falls within configured thresholds, sections are loaded or unloaded.

**Distance Calculation Example:**
```
Player Position: (0, 0, 0)
SubScene Position: (100, 0, 50)
Distance: ~111 units

If Section "LargeObjects" loads at 150m:
→ Section IS loaded (111m < 150m)

If Section "SmallObjects" loads at 50m:
→ Section NOT loaded (111m > 50m)
```

### Section-Based Loading

Each SubScene contains multiple **sections** (Ground, LargeObjects, SmallObjects, etc.). Sections can load/unload independently based on their configured distances.

**Benefits:**
- Fine-grained control over what loads when
- Reduced memory usage (only load what's visible)
- Improved performance (fewer objects to process)
- Seamless streaming (no loading screens)

## SubSceneLoadingSystem

**Location:** `Runtime/Scripts/Streaming/SubSceneLoadingSystem.cs`

### Purpose

Manages the loading of SubScenes and their sections based on distance from the loading trigger.

### How It Works

```
Every Frame (Update):

1. Calculate distance to each SubScene
2. Determine which sections should be loaded
3. Queue loading requests for new sections
4. Execute loading jobs asynchronously
5. Update loaded section tracking
```

### State Machine

The loading system maintains internal states for each SubScene:

- **Unloaded** - SubScene not in memory
- **Loading** - SubScene being loaded
- **Loaded** - SubScene fully loaded and active
- **Streaming** - Sections loading/unloading dynamically

```
Unloaded → Loading → Loaded → Streaming
    ↓                              ↓
    ←──────────────────────────────
         (Distance exceeds threshold)
```

### ECS Queries

The system uses ECS queries to efficiently process SubScenes:

```csharp
// Query for SubScenes that need loading
EntityQuery loadingQuery = GetEntityQuery(
    ComponentType.ReadOnly<SubSceneData>(),
    ComponentType.ReadOnly<WorldTransform>(),
    ComponentType.Exclude<LoadedSection>()
);

// Query for SubScenes with sections to load
EntityQuery sectionQuery = GetEntityQuery(
    ComponentType.ReadOnly<SceneSection>(),
    ComponentType.ReadOnly<SectionDistance>()
);
```

### Jobs for Performance

Loading operations run as parallel jobs using Unity's Job System with Burst compilation:

```csharp
[BurstCompile]
public struct DistanceCalculationJob : IJobParallelFor
{
    [ReadOnly] public float3 loadingTriggerPosition;
    [ReadOnly] public NativeArray<float3> subScenePositions;
    public NativeArray<float> distances;
    
    public void Execute(int index)
    {
        distances[index] = math.distance(
            loadingTriggerPosition, 
            subScenePositions[index]
        );
    }
}
```

## SubSceneUnloadingSystem

**Location:** `Runtime/Scripts/Streaming/SubSceneUnloadingSystem.cs`

### Purpose

Manages the unloading of SubScenes and sections when they exceed distance thresholds or when triggered manually.

### How It Works

```
Every Frame (Update):

1. Check loaded sections against distance thresholds
2. Identify sections to unload
3. Queue unloading requests
4. Execute unloading jobs
5. Release resources
6. Update tracking data
```

### Unloading Strategy - Hysteresis

ProStream uses slightly different thresholds for loading vs unloading to prevent "flickering" (rapid load/unload cycles).

**Example:**
- **Load at:** 150m
- **Unload at:** 160m (10m hysteresis buffer)

This prevents objects from loading/unloading repeatedly when the player hovers around the threshold.

**Configuration:**

```csharp
public void ConfigureHysteresis(float buffer)
{
    StreamingManager.Instance.HysteresisBuffer = buffer;
}
```

### Memory Management

The unloading system ensures proper cleanup:
- Destroys entity data
- Releases scene references
- Clears cached data
- Triggers garbage collection hints (when appropriate)

## StreamingManager

**Location:** `Runtime/Scripts/MonoBehaviour/StreamingManager.cs`

### Purpose

High-level coordinator for all streaming operations. Acts as the bridge between MonoBehaviour world and ECS systems.

### Key Responsibilities

**Loading Trigger Management**
- Tracks the reference position (player/camera)
- Updates trigger position every frame
- Provides position to ECS systems

**System Coordination**
- Enables/disables streaming systems
- Controls streaming behavior
- Handles streaming state

**Configuration Management**
- Applies streaming settings
- Manages distance thresholds
- Handles persistent sections

**Debug Visualization**
- Displays streaming boundaries (gizmos)
- Shows loaded/unloaded sections
- Provides runtime feedback

### Setup

StreamingManager is **automatically created** after SubScene creation. You can also add it manually.

**Manual Setup:**
1. Create empty GameObject in scene
2. Add `StreamingManager` component
3. Assign Loading Trigger (player/camera)
4. Configure settings in Inspector

### Inspector Settings

**Loading Trigger**
- Reference to player/camera Transform
- Used for distance calculations
- Auto-finds Camera.main if not set

**Streaming Settings**
- Enable/disable streaming
- Hysteresis buffer distance
- Update frequency
- Debug visualization options

**Section Configuration**
- Override section distances
- Enable/disable specific sections
- Persistent section settings

## Runtime Behavior

### Initialization

When Play Mode starts:

1. StreamingManager initializes
2. ECS systems are created
3. SubScene data is loaded
4. Initial sections are loaded (if within range)
5. Streaming begins

### During Play

Every frame:

1. StreamingManager updates Loading Trigger position
2. SubSceneLoadingSystem calculates distances
3. Sections within threshold are queued for loading
4. SubSceneUnloadingSystem checks loaded sections
5. Sections beyond threshold are queued for unloading
6. Jobs execute asynchronously
7. Scene updates reflect changes

### Hierarchy During Play Mode

```
YourScene (Main)
├── SceneConnector
├── StreamingManager
├── SubSceneRoot
│   ├── YourScene_Quad_0_0 (SubScene - Loaded)
│   │   ├── Section_Ground (Loaded)
│   │   ├── Section_LargeObjects (Loaded)
│   │   └── Section_SmallObjects (Not Loaded)
│   ├── YourScene_Quad_0_1 (SubScene - Not Loaded)
│   └── ...
└── Camera
```

## Performance Optimization

### Distance Calculation

- Uses Burst-compiled jobs for parallel processing
- Calculates squared distance (avoids sqrt when possible)
- Batches calculations per frame

### Loading/Unloading

- Asynchronous operations don't block main thread
- Spreads loading across multiple frames
- Prioritizes closest sections first

### Memory Management

- Only loaded sections consume memory
- Unloaded sections are fully released
- Hysteresis prevents memory thrashing

## Debugging Runtime Streaming

### Console Logging

Enable streaming debug logs in StreamingManager:

```
[Streaming] Loading section: MyScene_Quad_0_0.Section_Ground (distance: 45m)
[Streaming] Unloading section: MyScene_Quad_2_2.Section_SmallObjects (distance: 165m)
```

### Gizmos Visualization

Enable gizmos in Scene view during Play Mode:
- Green spheres = Loaded sections
- Red spheres = Unloaded sections
- Yellow lines = Loading trigger radius

### Profiler

Monitor streaming performance:
- **CPU Usage** - Check system overhead
- **Memory** - Watch for memory leaks
- **Loading Time** - Measure section load times

## Common Runtime Issues

**Sections not loading**
- Check Loading Trigger is assigned
- Verify distances are configured correctly
- Ensure StreamingManager is enabled
- Check Console for errors

**Sections loading too late**
- Increase section load distances
- Reduce hysteresis buffer
- Check for performance bottlenecks

**Memory usage too high**
- Reduce section load distances
- Split large sections into smaller ones
- Unload unused sections manually

**Flickering (rapid load/unload)**
- Increase hysteresis buffer
- Adjust distance thresholds
- Check Loading Trigger movement speed

## Advanced Configuration

### Custom Loading Trigger

```csharp
public class CustomLoadingTrigger : MonoBehaviour
{
    void Update()
    {
        // Update StreamingManager with custom position
        StreamingManager.Instance.SetLoadingTriggerPosition(transform.position);
    }
}
```

### Manual Section Control

```csharp
// Manually load a specific section
StreamingManager.Instance.LoadSection("MyScene_Quad_0_0", "Ground");

// Manually unload a specific section
StreamingManager.Instance.UnloadSection("MyScene_Quad_2_2", "SmallObjects");
```

### Event Callbacks

```csharp
// Subscribe to streaming events
StreamingManager.Instance.OnSectionLoaded += HandleSectionLoaded;
StreamingManager.Instance.OnSectionUnloaded += HandleSectionUnloaded;

void HandleSectionLoaded(string subSceneName, string sectionName)
{
    Debug.Log($"Loaded: {subSceneName}.{sectionName}");
}
```

## See Also

- [Streaming Layers](/core-concepts/streaming-layers) - Configure layer distances
- [SubScene Creation](/processes/process-subscenes) - How SubScenes are created
- [Standard Workflow](/getting-started/standard-workflow) - Complete setup guide
- [Troubleshooting](/troubleshooting/troubleshooting) - Common issues and solutions
