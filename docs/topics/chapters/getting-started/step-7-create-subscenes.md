# Step 7: Create SubScenes

<snippet id="step_7_create_subscenes">

<procedure title="Create SubScenes" id="step-7-create-subscenes">
<p>Now create the actual SubScene files that will stream at runtime.</p>

<step>
    <p>In ProStream Editor (still on Setup tab)</p>
</step>
<step>
    <p>Click
        <control>Create SubScenes</control>
        button
    </p>
</step>
<step>
    <p>Wait for processing (this may take a minute)</p>
</step>

<p>
    <b>What's happening:</b>
</p>
<list>
    <li>ProStream creates scene files (.unity) for each spatial region</li>
    <li>Objects are cloned into appropriate SubScenes and sections</li>
    <li>Scene is reloaded to finalize changes</li>
</list>

<code-block lang="markdown">
Creating SubScene Assets...
Processing SubScenes...
SubScene creation complete
Scene reloaded
</code-block>

<p>
    <b>After Completion:</b>
</p>
<list>
    <li>Check
        <ui-path>Project | Assets | SubScene_Assets | YourSceneName | Entity</ui-path>
    </li>
    <li>You should see multiple
        <path>.unity</path>
        files (one per spatial region)
    </li>
</list>

<p>See <a href="process-subscenes.md"> SubScene Creation Process</a> for complete details.</p>
</procedure>

</snippet>
