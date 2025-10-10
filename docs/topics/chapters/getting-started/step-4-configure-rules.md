# Step 4: Configure Match Rules

<snippet id="step_4_configure_rules">

<procedure title="Configure Match Rules" id="step-4-configure-rules">
    <p>Match rules categorize objects into streaming layers (Ground, Large Objects, Small Objects, etc.).</p>

<step>
    <p>In the ProStream Editor window (if closed, reopen via
        <ui-path>Tools | instance.id | ProStream | ProStream Editor</ui-path>
        )
    </p>
</step>
<step>
    <p>In the Scene Tools tab, click the
        <control>Setup Match Rules</control>
        button
    </p>
    <p>This opens the Rule Editor menu with all available rules</p>
</step>
<step>
    <p>Browse the rule list organized by type:</p>
    <list>
        <li><b>MatchBySearchQuery</b> - Rules using Unity Search queries</li>
        <li><b>MatchByName</b> - Rules matching object names</li>
        <li><b>MatchByGOQLRule</b> - Rules using GameObject Query Language</li>
        <li><b>MatchByDefault</b> - Fallback rule for unmatched objects</li>
    </list>
</step>
<step>
    <p>Enable rules for your scene:</p>
    <list>
        <li>Expand the <code>MatchBySearchQuery</code> category</li>
        <li>Right-click <code>Example - Cube</code></li>
        <li>Select <control>Add to Scene</control> from context menu</li>
        <li>Repeat for <code>Example - Sphere</code></li>
    </list>
</step>
<step>
    <p>Verify rules are enabled:</p>
    <list>
        <li>Select the <code>SceneConnector</code> GameObject</li>
        <li>Check the inspector for enabled rules in the list</li>
        <li>Enabled rules will show a checkmark or badge in the Rule Editor</li>
    </list>
</step>

<note>
    <p>
        <b>Rule Execution Order:</b>
        Rules are processed in list order. The first matching rule wins. The <code>MatchByDefault</code> rule automatically runs last to catch any unmatched objects.
    </p>
</note>

<tip>
    <p>
        <b>Quick Tip:</b>
        You can also single-click a rule to select it and view its properties in the inspector, or double-click to open its editor for detailed configuration.
    </p>
</tip>
</procedure>

</snippet>
