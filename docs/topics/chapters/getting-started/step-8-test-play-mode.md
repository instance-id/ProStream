# Step 8: Test in Play Mode

<snippet id="step_8_test_play_mode">

<procedure title="Test in Play Mode" id="step-8-test-play-mode">
<p>Time to see streaming in action!</p>

<step>
    <p>Ensure your scene has a
        <control>Camera</control>
        or Player controller
    </p>
</step>
<step>
    <p>Enter
        <control>Play Mode</control>
    </p>
</step>
<step>
    <p>Move the camera around the scene</p>
</step>

<p>
    <b>What to observe:</b>
</p>
<list>
    <li>SubScenes load/unload as you move</li>
    <li>Objects appear/disappear based on distance</li>
    <li>Check
        <control>Hierarchy</control>
        window - SubScenes load additively
    </li>
</list>

<code-block lang="text" collapsible="true" collapsed-title="Hierarchy during Play Mode">
YourScene (Main)
├── SceneConnector
├── SubSceneRoot
│   ├── YourScene_Quad_0_0 (SubScene - Loaded)
│   ├── YourScene_Quad_0_1 (SubScene - Not Loaded)
│   └── ...
└── Camera
</code-block>

<tip>
    <p>
        <b>Performance Check:</b>
        Open
        <ui-path>Window | Analysis | Profiler</ui-path>
        to monitor memory and CPU usage. SubScenes should load/unload efficiently.
    </p>
</tip>
</procedure>

</snippet>
