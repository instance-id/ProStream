# Advanced Runtime Configuration

While ProStream sets up distance-based loading ranges automatically during the _Create SubScenes_ process, sometimes your project requires dynamic, runtime adjustments based on gameplay events.

## Dynamic Loading Ranges

ProStream utilizes a **Runtime Streaming Architecture** that allows you to easily adjust the loading ranges (start and end distances) for specific streaming sections while the game is running.

This is accomplished using the `LoadingDistanceSystem`, an ECS system that provides an API for safely updating the `LayerLoadingRanges` dynamic buffer.

### Updating Distances at Runtime

When you want to increase or decrease the loading distance of a specific layer/section (for example, if the player enters a vehicle and needs to see further ahead), you can use the `SetGlobal` method on the `LoadingDistanceSystem`.

This method requires the `SectionIndex` (which identifies the layer) and a `float2` representing the new `(StartDistance, EndDistance)`.

### Example Usage

Here is a minimal example from the ProStream procedural sample showing how you might dynamically adjust the loading distance for a specific layer during runtime:

```csharp
using instance.id.ProStream;
using Unity.Entities;
using Unity.Mathematics;
using UnityEngine;

public class MapSampleHelper : MonoBehaviour
{
    [Header("Layer Configuration")]
    [Tooltip("The ID of the section/layer you want to adjust (e.g., 0 for Ground)")]
    public int targetSectionIndex = 0;

    [Tooltip("The new loading range to apply at runtime")]
    public float2 newLoadingRange = new float2(0f, 500f);

    public void UpdateLoadingDistance()
    {
        // Use SetGlobal to safely update the ECS buffer from managed code
        LoadingDistanceSystem.SetGlobal(targetSectionIndex, newLoadingRange);

        Debug.Log($"Updated Layer {targetSectionIndex} to range: {newLoadingRange}");
    }
}
```

### How It Works Under the Hood

1. When `SetGlobal` is called, it accesses the `LayerLoadingRanges` singleton entity.
2. It locates the specific index within the dynamic buffer and overwrites the `float2` range.
3. It increments the `Version` on the `LayerLoadingRanges` component.
4. The `SubSceneLoadingSystem` and `SubSceneUnloadingSystem` detect the version change on their next update and automatically start using the new distances to evaluate whether a subscene should be loaded or unloaded.
