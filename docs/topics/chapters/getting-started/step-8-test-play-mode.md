# Step 8: Test in Play Mode

<snippet id="step_8_test_play_mode">

<procedure title="Test in Play Mode" id="step-8-test-play-mode">

Time to see streaming in action!

<step>

Ensure your scene has a <control>Camera</control> or Player controller

</step>

<step>

Enter <control>Play Mode</control>

</step>

<step>

Move the camera around the scene

</step>

**What to observe:**

- SubScenes load/unload as you move
- Objects appear/disappear based on distance
- Check <control>Hierarchy</control> window - SubScenes load additively

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

**Performance Check:** Open <ui-path>Window | Analysis | Profiler</ui-path> to monitor memory and CPU usage. SubScenes should load/unload efficiently.

</tip>
</procedure>

</snippet>
