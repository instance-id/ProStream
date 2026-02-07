# Troubleshooting

Common issues and solutions for ProStream.

## Setup Issues

### Scene must be saved before setup

**Issue:** Setup button shows "Scene must be saved" message

**Solution:** ProStream requires scenes to be saved to disk before setup. Save your scene via **File | Save Scene** first.

### SceneConnector not created after setup

**Issue:** SceneConnector GameObject doesn't appear after clicking Setup

**Check:**
- The scene automatically reloaded after clicking Setup
- Check the Console for any errors during setup
- Verify the scene has the "StreamingScene" label in Project window
- Look for `SceneName/SceneData/` folder in your Assets

### Lost References / Missing Scripts

**Issue:** Components show as "Missing Script" after installation/update

**Cause:** Installing or updating ProStream while a scene with ProStream components is open

**Solution:**
1. Close all scenes before installing/updating
2. Install/update ProStream
3. Reopen scenes after installation completes
4. If references are lost, you may need to re-run scene setup

## Search Filter Issues

### No SearchFilter Objects found

**Issue:** Error message during Calculate Positions

**Solution:** You need to add Scene Search Filters! Click "Add Search Filters" in ProStream Editor and select root GameObjects that contain your prefabs.

### No MatchTrackers added

**Issue:** Objects under search filters aren't being tracked

**Check:**
- Your selected GameObjects contain prefab instances (not regular GameObjects)
- Prefabs are children of the search filter GameObject
- Check Console for processing messages
- Verify objects are actually prefabs (blue icon in hierarchy)

## Rule Matching Issues

### No rules have been added

**Issue:** Error during Calculate Positions

**Solution:** Enable at least one rule in the Rule Editor. Open **Scene Match Rules > Rule Editor** and enable example rules.

### No objects matched

**Issue:** Calculate Positions completes but no objects are matched

**Check:**
- Search query in SceneSearchFilter is correct
- Rules are enabled (checkmark in Rule Editor)
- Rules actually match your objects (test queries in Unity Search: `Ctrl+K`)
- Objects are under search filters
- Objects are prefabs

### Objects matched by wrong rule

**Issue:** Objects assigned to incorrect layer/section

**Solution:**
- Check rule priority order (first match wins)
- Reorder rules in Rule Editor
- Make earlier rules more specific
- Test queries individually

## Position Calculation Issues

### Calculate Positions fails immediately

**Issue:** Process fails with errors

**Check:**
- At least one search filter is configured
- At least one rule is enabled
- Scene is saved
- No compilation errors
- Check Console for specific error messages

### Process hangs or takes very long

**Issue:** Calculate Positions doesn't complete

**Possible causes:**
- Very large scene (thousands of objects)
- Complex search queries
- Validation enabled with many objects

**Solutions:**
- Disable validation temporarily
- Simplify search queries
- Split scene into smaller sections
- Check Console for progress messages

## SubScene Creation Issues

### SubScenes empty in Play Mode

**Issue:** SubScenes load but contain no objects

**Check:**
- Position Calculation completed successfully
- SubScene creation completed successfully
- Open SubScene `.unity` files manually to verify objects are inside
- Check Console for errors during creation
- Verify objects were matched during Position Calculation

### SubScene files not created

**Issue:** No `.unity` files in SubScene_Assets folder

**Check:**
- Position Calculation was run first
- Write permissions in Assets folder
- Sufficient disk space
- Console for specific errors

### Scene reload fails

**Issue:** Unity hangs or crashes during scene reload

**Solutions:**
- Save scene before running process
- Close other scenes first
- Check for compilation errors
- Try restarting Unity
- Check Unity version compatibility

## Runtime/Streaming Issues

### Streaming not working

**Issue:** Objects don't load/unload during Play Mode

**Check:**
- You're in Play Mode
- Camera/player is moving around
- Streaming distances are appropriate for your scene size
- StreamingManager exists in scene (auto-created after SubScene creation)
- Loading Trigger is assigned in StreamingManager
- StreamingManager is enabled

### Sections not loading

**Issue:** SubScenes don't load when player is nearby

**Check:**
- Loading Trigger is assigned in StreamingManager
- Distances are configured correctly in Layer Editor
- StreamingManager component is enabled
- Check Console for errors
- Verify SubScene files exist

### Sections loading too late/early

**Issue:** Objects pop in too close or load too far away

**Solution:**
- Adjust layer distances in Layer Editor
- Increase distances for earlier loading
- Decrease distances for later loading
- Adjust hysteresis buffer

### Memory usage too high

**Issue:** Game uses too much memory

**Solutions:**
- Reduce layer load distances
- Split large layers into smaller ones
- Use more aggressive culling
- Check for memory leaks in Profiler

## Build Issues

### No Objects In Game (Build)

**Issue:** After building, no objects appear in the game

**Cause:** SRP asset not assigned in build settings

**Solution:** Ensure an SRP asset is assigned in the following places:

| Location | Setting |
|----------|---------|
| **Project Settings \ Graphics** | Scriptable Render Pipeline Settings |
| **Project Settings \ Graphics** | URP Global Settings |
| **Project Settings \ Quality** | Rendering (per quality level) |

![SRP Global Settings](/images/ts_settings_srp_global_asset.png)
![SRP Quality Settings](/images/ts_settings_srp_quality_asset.png)

### ObjectDisposedException errors

**Issue:** Constant "UNKNOWN_OBJECT_TYPE has been deallocated" errors

**Cause:** Installing/updating Entities package while scene with SubScenes is open

**Solution:**
1. Close all scenes
2. Update packages
3. Restart Unity
4. Reopen scenes

## Validation Issues

### Validation finds many errors

**Issue:** Validation reports numerous compatibility issues

**Approach:**
1. Address critical errors first
2. Fix warnings that apply to your setup
3. Ignore warnings that don't affect your use case
4. See [Validation & Diagnostics](/editor-guide/tools/validation-diagnostics) for details

### Validation takes too long

**Issue:** Calculate Positions is very slow with validation enabled

**Solution:**
- Disable "Check for advanced issues"
- Only enable validation when needed
- Run validation separately using Diagnostics Hub

## Performance Issues

### Editor performance slow

**Issue:** Unity Editor is sluggish with ProStream

**Possible causes:**
- Very large scene
- Many search filters
- Complex rules

**Solutions:**
- Limit search filter scope
- Simplify rules
- Close unnecessary Editor windows
- Increase Unity's memory allocation

### Runtime performance issues

**Issue:** Game runs slowly with streaming

**Check:**
- Too many sections loading simultaneously
- Distances too large (loading too much)
- Complex modifications running
- Profile with Unity Profiler to identify bottlenecks

## Common Error Messages

### "Scene must have at least one search filter"

**Solution:** Add search filters via ProStream Editor

### "No enabled rules found"

**Solution:** Enable at least one rule in Rule Editor

### "Position calculation not complete"

**Solution:** Run Calculate Positions before Create SubScenes

### "Failed to create SubScene asset"

**Solution:** Check write permissions and disk space

### "Loading trigger not assigned"

**Solution:** Assign player/camera to StreamingManager's Loading Trigger field

## Getting Help

If you're still experiencing issues:

1. **Check Console** - Most errors have detailed messages
2. **Enable Debug Logging** - Turn on verbose logging in settings
3. **Review Documentation** - Check relevant sections
4. **Verify Prerequisites** - Ensure all requirements are met
5. **Test with Simple Scene** - Reproduce issue in minimal setup

## See Also

- [Prerequisites](/getting-started/prerequisites) - Setup requirements
- [Standard Workflow](/getting-started/standard-workflow) - Complete guide
- [Validation & Diagnostics](/editor-guide/tools/validation-diagnostics) - Validation tools
- [Runtime Streaming](/runtime-systems/runtime-streaming) - Runtime behavior
