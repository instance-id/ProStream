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
</step>
<step>
    <p>In the Layer Editor, adjust loading distances:</p>
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
</note>

<p>See <a href="streaming-layers.md"> Streaming Layers</a> for detailed configuration.</p>
</procedure>

</snippet>
