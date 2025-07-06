# SceneSearchFilter

<card-summary>SceneSearchFilter Info</card-summary>

## Add Scene Search Filters

<snippet id="add_search_filter_id">

> It is highly recommended to use SceneSearchFilters, as they help improve setup performance by designating and limit the search scope of the RuleEngine Match system to the child Objects of the SceneSearchFilter GameObject.

> All GameObjects must be Prefabs to be compatible with ProStream systems.  
> The Prefab system is used to differentiate one GameObject Hierarchy from another.  
> on-Prefab GameObjects are skipped by the matching systems.  
> {style="note"}

<table>
<tr><td>

Add Scene Search Filters
 - Right-click on (one or many) empty top-level GameObject in the scene hierarchy
 - Select `ProStream` -> `Add Scene Search Filter`

</td>
<td>

![add_search_filter.png](add_search_filter.png){width="450" thumbnail="true"}

</td></tr>
<tr><td colspan="2">

This will add a new SceneSearchFilter Component to the GameObject and begin indexing the child Prefab GameObjects.

</td></tr>

</table>

</snippet>
