# Step 7: Create SubScenes

<snippet id="step_7_create_subscenes">

<procedure title="Create SubScenes" id="step-7-create-subscenes">

Now create the actual SubScene files that will stream at runtime.

<step>

In ProStream Editor (still on Setup tab)

</step>

<step>

Click <control>Create SubScenes</control> button

</step>

<step>

Wait for processing (this may take a minute)

</step>

**What's happening:**

- ProStream creates scene files (.unity) for each spatial region
- Objects are cloned into appropriate SubScenes and sections
- Scene is reloaded to finalize changes

<code-block lang="console">
Creating SubScene Assets...
Processing SubScenes...
SubScene creation complete
Scene reloaded
</code-block>

**After Completion:**

- Check <ui-path>Project | Assets | SubScene_Assets | YourSceneName | Entity</ui-path>
- You should see multiple <path>.unity</path> files (one per spatial region)

See <a href="process-subscenes.md"> SubScene Creation Process</a> for complete details.

</procedure>

</snippet>
