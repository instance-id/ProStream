# Step 3: Add Scene Search Filters

<snippet id="step_3_add_search_filters">

<procedure title="Add Scene Search Filters" id="step-3-add-search-filters">
    <p>Scene Search Filters define which areas of your scene ProStream will process. You select root-level GameObjects, and ProStream tracks all prefab children under them.</p>

<step>
    <p>In the ProStream Editor window, click
        <control>Add Search Filters</control>
        button
    </p>
</step>

<step>
    <p>A hierarchy selector window will open showing root-level GameObjects</p>
</step>

<step>
    <p>Select one or more root GameObjects that contain the objects you want to stream</p>
    <list>
        <li>Typically these are parent GameObjects organizing your scene content</li>
        <li>Example: "Buildings", "Terrain", "Props", "Vegetation"</li>
        <li>You can select multiple GameObjects (hold Ctrl/Cmd)</li>
    </list>
</step>

<step>
    <p>Click
        <control>Confirm</control>
        in the selector window
    </p>
</step>

<p>
    <b>What just happened:</b>
</p>
    <list>
        <li>ProStream added <code>SceneSearchFilter</code> components to your selected GameObjects</li>
        <li>Found all prefab instances under those GameObjects</li>
        <li>Added <code>MatchTracker</code> components to each prefab child</li>
        <li>Set tracker status to "Searchable"</li>
        <li>Only objects under search filters will be processed for streaming</li>
    </list>

<note>
    <p>
        <b>Organization tip:</b>
        Search filters help organize large scenes. Only prefab instances under filter GameObjects are tracked for streaming. This improves performance by limiting the scope of object tracking.
    </p>
</note>
</procedure>

</snippet>
