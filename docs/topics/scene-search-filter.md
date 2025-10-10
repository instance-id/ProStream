# SceneSearchFilter

<card-summary>SceneSearchFilter Info</card-summary>

## Add Scene Search Filters

<snippet id="add_search_filter_id">

> **Purpose:** SceneSearchFilters define which areas of your scene ProStream will process. They improve performance by limiting the scope to specific hierarchies.
>
> {style="note"}

> **Important:** All GameObjects must be Prefabs to be compatible with ProStream systems. The Prefab system is used to differentiate one GameObject hierarchy from another. Non-Prefab GameObjects are skipped by the matching systems.
>
> {style="warning"}

## How to Add Scene Search Filters

**Method 1: ProStream Editor (Recommended)**

1. Open ProStream Editor: <ui-path>Tools | instance.id | ProStream | ProStream Editor</ui-path>
2. Click the <control>Add Search Filters</control> button
3. A hierarchy selector window will open showing root-level GameObjects
4. Select one or more root GameObjects that contain your prefabs
5. Click <control>Confirm</control>

**What happens automatically:**
- ProStream adds `SceneSearchFilter` component to selected GameObjects
- Locates all prefab instances under those GameObjects
- Adds `MatchTracker` components to each prefab child
- Sets tracker status to "Searchable"

**Method 2: Context Menu (Alternative)**

<table>
<tr><td>

- Right-click on one or many top-level GameObjects in the scene hierarchy
- Select <ui-path>ProStream | Add Scene Search Filter</ui-path>

</td>
<td>

![add_search_filter.png](add_search_filter.png){width="450" thumbnail="true"}

</td></tr>
<tr><td colspan="2">

This will add a SceneSearchFilter component to the GameObject and begin indexing the child prefab GameObjects.

</td></tr>

</table>

## How Search Filters Work

**Hierarchy Structure:**
```
Scene
├── Buildings (SearchFilter)
│   ├── Building_01 (Prefab → MatchTracker added)
│   ├── Building_02 (Prefab → MatchTracker added)
│   └── Building_03 (Prefab → MatchTracker added)
├── Props (SearchFilter)
│   ├── Prop_01 (Prefab → MatchTracker added)
│   └── Prop_02 (Prefab → MatchTracker added)
└── Camera (No filter → ignored)
```

**Key Points:**
- Only prefab instances **under** search filter GameObjects are tracked
- This allows organizing large scenes into manageable sections
- Improves performance by limiting the scope of object tracking
- You can have multiple search filters in a scene

## MatchTracker Component

When you add a search filter, ProStream automatically adds `MatchTracker` components to all prefab children:

**MatchTracker Properties:**
- `FilterId` - References parent SceneSearchFilter
- `MatchStatus` - Searchable, NotSearchable, or Converted
- `IsEnabled` - Whether tracker is active
- `IsMatched` - Whether a rule matched this object
- `SectionId` - Which streaming layer this object belongs to

**You don't need to add MatchTracker manually** - it's automatic.

</snippet>
