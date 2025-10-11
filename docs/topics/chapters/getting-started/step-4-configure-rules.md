# Step 4: Configure Match Rules

<snippet id="step_4_configure_rules">

<procedure title="Configure Match Rules" id="step-4-configure-rules">

Match rules categorize objects into streaming layers (Ground, Large Objects, Small Objects, etc.).

<step>

In the ProStream Editor window (if closed, reopen via <ui-path>Tools | instance.id | ProStream | ProStream Editor</ui-path>)

</step>

<step>

In the Scene Tools tab, click the <control>Setup Match Rules</control> button

This opens the Rule Editor menu with all available rules

</step>

<step>

Browse the rule list organized by type:

- **MatchBySearchQuery** - Rules using Unity Search queries
- **MatchByName** - Rules matching object names
- **MatchByGOQLRule** - Rules using GameObject Query Language
- **MatchByDefault** - Fallback rule for unmatched objects

</step>

<step>

Enable rules for your scene:

<img src="pst_2_enable_match_image_psTutorial.png" alt="Enable Example Rules" width="250" thumbnail="true"/>

- Expand the `MatchBySearchQuery` category
- Right-click `Example - Cube`
- Select <control>Add to Scene</control> from context menu
- Repeat for `Example - Sphere`

You can also verify enabled rules by viewing the SceneConnector's inspector:

<img src="open_match_files.png" alt="Scene Match Rules" width="250" thumbnail="true"/>

</step>

<step>

Verify rules are enabled:

- Select the `SceneConnector` GameObject
- Check the inspector for enabled rules in the list
- Enabled rules will show a checkmark or badge in the Rule Editor

</step>

<note>

**Rule Execution Order:** Rules are processed in list order. The first matching rule wins. The `MatchByDefault` rule automatically runs last to catch any unmatched objects.

</note>

<tip>

**Quick Tip:** You can also single-click a rule to select it and view its properties in the inspector, or double-click to open its editor for detailed configuration.

You can edit and preview query results by clicking the icon on the right side of the query input box:

<img src="pst_2_edit_preview_query_image_psTutorial.png" alt="Edit and Preview Query" width="250" thumbnail="true"/>

</tip>
</procedure>

</snippet>
