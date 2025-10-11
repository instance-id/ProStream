# Common Quick Start Issues

<snippet id="common_quick_start_issues">

<chapter title="Common Quick Start Issues" id="common-issues" collapsible="true">
<deflist>
    <def title="Setup button says 'Scene must be saved'">
        <p>
            <b>Solution:</b>
            ProStream requires scenes to be saved to disk before setup. Save your scene via
            <ui-path>File | Save Scene</ui-path>
            first.
        </p>
    </def>
    <def title="SceneConnector not created after setup">
        <p>
            <b>Check:</b>
        </p>
        <list>
            <li>The scene automatically reloaded after clicking Setup</li>
            <li>Check the Console for any errors during setup</li>
            <li>Verify the scene has the "StreamingScene" label in Project window</li>
            <li>Look for
                <path>SceneName/SceneData/</path>
                folder in your Assets
            </li>
        </list>
    </def>
    <def title="No SearchFilter Objects found">
        <p>
            <b>Solution:</b>
            You forgot Step 3! Click "Add Search Filters" in ProStream Editor and select root GameObjects that contain your prefabs.
        </p>
    </def>
    <def title="No MatchTrackers added">
        <p>
            <b>Check:</b>
        </p>
        <list>
            <li>Your selected GameObjects contain prefab instances (not regular GameObjects)</li>
            <li>Prefabs are children of the search filter GameObject</li>
            <li>Check Console for processing messages</li>
        </list>
    </def>
    <def title="No rules have been added">
        <p>
            <b>Solution:</b>
            Enable at least one rule in the Rule Editor (Step 4).
        </p>
    </def>
    <def title="No objects matched">
        <p>
            <b>Check:</b>
        </p>
        <list>
            <li>Search query in SceneSearchFilter is correct</li>
            <li>Rules are enabled (checkmark in Rule Editor)</li>
            <li>Rules actually match your objects (test queries in Unity Search:
                <shortcut>Ctrl+K</shortcut>
                )
            </li>
        </list>
    </def>
    <def title="SubScenes empty in Play Mode">
        <p>
            <b>Check:</b>
        </p>
        <list>
            <li>Position Calculation completed successfully</li>
            <li>SubScene creation completed successfully</li>
            <li>Check SubScene
                <path>.unity</path>
                files - open them to verify objects are inside
            </li>
            <li>Check Console for errors</li>
        </list>
    </def>
    <def title="Streaming not working">
        <p>
            <b>Check:</b>
        </p>
        <list>
            <li>You're in Play Mode</li>
            <li>Camera/player is moving around</li>
            <li>Streaming distances are appropriate for your scene size</li>
            <li>StreamingManager exists in scene (auto-created after SubScene creation)</li>
        </list>
    </def>
</deflist>

<p>For more issues, see <a href="troubleshooting.md"> Troubleshooting</a></p>

</chapter>

</snippet>
