In ProStream Editor, open the **Layers** tab

![Access Layer Editor](/images/layer_tab.png)

In the Layer Data editor, you can adjust the distance in which each SubScene layer will load into the scene.

![Adjust Layer Distances](/images/edit_loading_range.png)

::: tip Distance Guidelines

- **Higher number** = The farther away the Loading Trigger can be for the SubScene layer to load
- **Lower number** = The closer the Loading Trigger must be for the SubScene Layer to load
  :::

<!-- Start Display this info in streaming-layers.md -->

<div v-if="$frontmatter.showLayerBasicsStreamingDetails">

Each layer uses a range (`start`, `end`) for Entity SubScene streaming.
For example, `0-256` means the section can load when the trigger is within that range.

The numeric value in the right-side input box is the current maximum value, and the right-side slider is the current value. Hovering over the slider handle shows what the current distance setting is, and can be dragged left/right to be adjusted.

To raise the value above the current maximum, just input a new value into the right-side input box.

::: info Example Configuration

- **Ground:** 2048 (loads objects at a far distance)
- **LargeObjects:** 1024 (loads objects at a medium distance)
- **SmallObjects:** 512 (loads objects at a close distance)
  :::

::: info What this means
Objects in "SmallObjects" layer load when camera is within 512 units. Objects in "LargeObjects" layer load when camera is within 1024 units.
:::

</div>

<!-- End Display this info in streaming-layers.md -->

**Persistent Layers:** Layers marked as Persistent are always loaded and don't need a range set:

Use persistent sparingly for always-on critical content, because it bypasses normal distance streaming.

![Persistent Layers](/images/persistent_range.png)

<!-- Start Display this info in streaming-layers.md -->

<div v-if="$frontmatter.showLayerBasicsStreamingDetails">

## Default Layers

| Layer Name    | Default Distance | Purpose                       |
| ------------- | ---------------- | ----------------------------- |
| Ground        | 2048             | Terrain, roads, ground meshes |
| LargeObjects  | 1024             | Buildings, large structures   |
| MediumObjects | 512              | Medium-sized props, vehicles  |
| SmallObjects  | 256              | Small details, clutter        |
| Foliage       | 128              | Trees, bushes, grass          |

Defaults are starting points. Tune them for your world scale and camera/player speed.

</div>

<!-- End Display this info in streaming-layers.md -->