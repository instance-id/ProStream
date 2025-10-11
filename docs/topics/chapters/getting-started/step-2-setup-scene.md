# Step 2: Setup Scene for ProStream

<snippet id="step_2_setup_scene">

<procedure title="Setup Scene for ProStream" id="step-2-setup-scene">

<step>
    <p>Open the ProStream Editor window:
        <ui-path>Tools | instance.id | ProStream | ProStream Editor</ui-path>
    </p>
</step>

<step>

<p>
<a href="prostream-editor.md#prostream_editor_image" summary="ProStream Setup Image">Click the <control>Setup Current Scene</control> button </a>
</p>
    <list>
        <li>ProStream will apply a "StreamingScene" label to your scene</li>
        <li>The scene will automatically save and reload</li>
        <li>Wait for the process to complete</li>
    </list>

</step>

<p>
    <b>What just happened:</b>
</p>
<list>
    <li>ProStream created a <code>SceneConnector</code> GameObject</li>
    <li>Created asset directory structure in
        <path>SceneName/SceneData/</path>
    </li>
    <li>Created SceneLock, LayerData, SceneSettings, and RuleCollection assets</li>
    <li>Initialized default layers (Ground, LargeObjects, MediumObjects, SmallObjects, Foliage)</li>
    <li>Copied example rules to your scene</li>
    <li>Scene is now ready for configuration</li>
</list>

<note>
    <p>The scene reload is necessary for ProStream to complete the setup process. This is automatic and takes only a few seconds.</p>
</note>
</procedure>

</snippet>
