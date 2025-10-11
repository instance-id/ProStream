# Step 5: Configure Streaming Layers

<snippet id="step_5_configure_layers">

<procedure title="Configure Streaming Layers" id="step-5-configure-layers">

Layers determine loading distances for different object types.

<step>

In SceneConnector inspector, find <control>Streaming Layers</control> section

</step>

<step>

Click <control>Layer Editor</control> button

<img src="pst_3_menuLayerEditor_image_psTutorial.png" alt="Access Layer Editor" width="400"/>

</step>

<step>

In the Layer Editor, adjust loading distances:

<img src="pst_3_layerDistanceLoad_image_psTutorial.png" alt="Adjust Layer Distances" width="450"/>

- **Ground:** 100m (loads at medium distance)
- **LargeObjects:** 150m (loads farther out)
- **SmallObjects:** 50m (loads close up)

</step>

<note>

**What this means:** Objects in "SmallObjects" layer load when camera is within 50m. Objects in "LargeObjects" layer load when camera is within 150m.

**Persistent Layers:** Layers marked as Persistent are always loaded and don't need a range set:

<img src="pst_3_layerEditorPersistent_image_psTutorial.png" alt="Persistent Layers" width="400"/>

</note>

See <a href="streaming-layers.md"> Streaming Layers</a> for detailed configuration.

</procedure>

</snippet>
