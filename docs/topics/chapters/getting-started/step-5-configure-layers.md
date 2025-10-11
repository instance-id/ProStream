# Step 5: Configure Streaming Layers

<snippet id="step_5_configure_layers">

<procedure title="Configure Streaming Layers" id="step-5-configure-layers">
<p>Layers determine loading distances for different object types.</p>

<step>
    <p>In SceneConnector inspector, find
        <control>Streaming Layers</control>
        section
    </p>
</step>
<step>
    <p>Click
        <control>Layer Editor</control>
        button
    </p>
    <img src="pst_3_menuLayerEditor_image_psTutorial.png" alt="Access Layer Editor" width="400"/>
</step>
<step>
    <p>In the Layer Editor, adjust loading distances:</p>
    <img src="pst_3_layerDistanceLoad_image_psTutorial.png" alt="Adjust Layer Distances" width="450"/>
    <list>
        <li>
            <b>Ground:</b>
            100m (loads at medium distance)
        </li>
        <li>
            <b>LargeObjects:</b>
            150m (loads farther out)
        </li>
        <li>
            <b>SmallObjects:</b>
            50m (loads close up)
        </li>
    </list>
</step>

<note>
    <p>
        <b>What this means:</b>
        Objects in "SmallObjects" layer load when camera is within 50m. Objects in "LargeObjects" layer load when camera is within 150m.
    </p>
    <p>
        <b>Persistent Layers:</b>
        Layers marked as Persistent are always loaded and don't need a range set:
    </p>
    <img src="pst_3_layerEditorPersistent_image_psTutorial.png" alt="Persistent Layers" width="400"/>
</note>

<p>See <a href="streaming-layers.md"> Streaming Layers</a> for detailed configuration.</p>
</procedure>

</snippet>
