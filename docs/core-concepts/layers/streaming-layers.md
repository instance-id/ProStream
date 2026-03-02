---
showLayerBasicsStreamingDetails: true
---

# Streaming Layers

Streaming layers control when section content loads and unloads based on distance from your Loading Trigger (player, camera, or custom trigger).

## Access Streaming Layers

<!-- Start Display this info in layer-basics.md -->
<!--@include: ./layer-basics.md  -->
<!-- End Display this info in layer-basics.md -->

## Layer Configuration Strategy

### Distance-Based Loading

Configure layers based on object visibility and importance:  
(Good starting point for distance settings, but adjust based on your scene's scale and content)

**Far Distance (1024+)**

- Mesh Terrain
- Large buildings and structures

**Medium Distance (512-1024)**

- Medium buildings
- Large props
- Trees and vegetation

**Close Distance (256-512)**

- Small props
- Detail objects
- Ground clutter

**Very Close (0-256)**

- Tiny details
- High-poly models

## How Runtime Uses Layer Ranges

At runtime, Entity SubScene systems evaluate distance to each section bound and compare against layer ranges.

- **Load**: within start/end range
- **Unload**: beyond end range (with unload buffer multiplier)

GameObject SubScene streaming uses a separate GO loading range setting in LayerData.

See [Runtime Streaming](/runtime-systems/runtime-streaming) for full runtime details.

## Creating Custom Layers

You can create custom layers to better organize your content:

1. Open the Layer Editor
2. Click **Add Layer**
3. Configure the layer name and distance
4. Assign rules to match objects to this layer

## Practical Tuning Tips

1. Start with defaults and test in Play Mode.
2. Increase ranges for large landmarks that must appear early.
3. Decrease ranges for dense small props to reduce memory/load spikes.
4. Use profiler + visual testing together before locking values.
