# Scene Search Filter

SceneSearchFilters define which areas of your scene ProStream will process. They improve performance by limiting the scope to specific hierarchies.

::: warning Important
All GameObjects must be Prefabs to be compatible with ProStream systems. The Prefab system is used to differentiate one GameObject hierarchy from another. Non-Prefab GameObjects are skipped by the matching systems.
:::

## How to Add Scene Search Filters

### Method 1: ProStream Editor (Recommended)

1. Open ProStream Editor: **Tools | instance.id | ProStream | ProStream Editor**
2. Click the **Add Search Filters** button
3. A hierarchy selector window will open showing root-level GameObjects
4. Select one or more root GameObjects that contain your prefabs
5. Click **Confirm**

**What happens automatically:**

- ProStream adds <QuickInfo preset="terms.scene-search-filter"><code>SceneSearchFilter</code></QuickInfo> component to selected GameObjects
- Locates all prefab instances under those GameObjects
- Adds <QuickInfo preset="terms.match-tracker"><code>MatchTracker</code></QuickInfo> components to each prefab child
- Sets tracker status to "Searchable"

### Method 2: Context Menu (Alternative)

1. Right-click on one or many top-level GameObjects in the scene hierarchy
2. Select **ProStream | Add Scene Search Filter**

![Add Search Filter Context Menu](/images/add_search_filter.png)

This will add a SceneSearchFilter component to the GameObject and begin indexing the child prefab GameObjects.

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

When you add a search filter, ProStream automatically adds <QuickInfo preset="terms.match-tracker"><code>MatchTracker</code></QuickInfo> components to all prefab children:

**MatchTracker Properties:**

- `FilterId` - References parent SceneSearchFilter
- `MatchStatus` - Searchable, NotSearchable, or Converted
- `IsEnabled` - Whether tracker is active
- `IsMatched` - Whether a rule matched this object
- `SectionId` - Which streaming layer this object belongs to

**You don't need to add MatchTracker manually** - it's automatic.

## See Also

- [Importance of Prefabs](/core-concepts/importance-of-prefabs) - Why prefabs are required
- [Rule Engine](/editor-guide/engines/rule-engine) - How objects are matched
- [Standard Workflow](/getting-started/standard-workflow) - Complete setup guide
