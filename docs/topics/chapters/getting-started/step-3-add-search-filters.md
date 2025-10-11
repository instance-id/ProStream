# Step 3: Add Scene Search Filters

<snippet id="step_3_add_search_filters">

<procedure title="Add Scene Search Filters" id="step-3-add-search-filters">

Scene Search Filters define which areas of your scene ProStream will process. You select root-level GameObjects, and ProStream tracks all prefab children under them.

<step>

In the ProStream Editor window, click <control>Add Search Filters</control> button

</step>

<step>

A hierarchy selector window will open showing root-level GameObjects

</step>

<step>

Select one or more root GameObjects that contain the objects you want to stream

- Typically these are parent GameObjects organizing your scene content
- Example: "Buildings", "Terrain", "Props", "Vegetation"
- You can select multiple GameObjects (hold Ctrl/Cmd)

</step>

<step>

Click <control>Confirm</control> in the selector window

<img src="add_search_filter.png" alt="Add Search Filter Context Menu" width="450" thumbnail="true"/>

</step>

**What just happened:**

- ProStream added `SceneSearchFilter` components to your selected GameObjects
- Found all prefab instances under those GameObjects
- Added `MatchTracker` components to each prefab child
- Set tracker status to "Searchable"
- Only objects under search filters will be processed for streaming

<note>

**Organization tip:** Search filters help organize large scenes. Only prefab instances under filter GameObjects are tracked for streaming. This improves performance by limiting the scope of object tracking.

</note>
</procedure>

</snippet>
