# Common Quick Start Issues

<snippet id="common_quick_start_issues">

<chapter title="Common Quick Start Issues" id="common-issues" collapsible="true">
     Setup button says 'Scene must be saved'">

Solution:
: ProStream requires scenes to be saved to disk before setup. Save your scene via
<ui-path>File | Save Scene</ui-path>
first.


SceneConnector not created after setup
: Check:
: - The scene automatically reloaded after clicking Setup
: - Check the Console for any errors during setup
: - Verify the scene has the "StreamingScene" label in Project window
: - Look for <path>SceneName/SceneData/</path> folder in your Assets

No SearchFilter Objects found
: Solution:
: You forgot Step 3! Click "Add Search Filters" in ProStream Editor and select root GameObjects that contain your prefabs.

No MatchTrackers added
: Check:
: - Your selected GameObjects contain prefab instances (not regular GameObjects)
: - Prefabs are children of the search filter GameObject
: - Check Console for processing messages

No rules have been added
: Solution:
: Enable at least one rule in the Rule Editor (Step 4).

No objects matched
: Check:
: - Search query in SceneSearchFilter is correct
: - Rules are enabled (checkmark in Rule Editor)
: - Rules actually match your objects (test queries in Unity Search: <shortcut>Ctrl+K</shortcut> )

SubScenes empty in Play Mode
: Check:
: - Position Calculation completed successfully
: - SubScene creation completed successfully
: - Check SubScene <path>.unity</path> files - open them to verify objects are inside
: - Check Console for errors

Streaming not working
: Check:
: - You're in Play Mode
: - Camera/player is moving around
: - Streaming distances are appropriate for your scene size
: - StreamingManager exists in scene (auto-created after SubScene creation)

For more issues, see <a href="troubleshooting.md"> Troubleshooting</a>

</chapter>

</snippet>
