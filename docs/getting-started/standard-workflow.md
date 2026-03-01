# Standard Workflow

::: info
Get up and running with ProStream in just a few minutes. This guide walks through the essential steps to set up streaming in a new scene.
:::

## At a Glance

1. Setup the scene for ProStream
2. Add Scene Search Filters
3. Configure Match Rules
4. Configure Streaming Layers
5. Run **Prepare Scene**
6. Run **Create SubScenes**
7. Validate streaming in Play Mode

<!-- Begin Requirements -->
<!--@include: ./requirements.md-->
<!-- End Requirements -->

::: tip
If you haven't installed ProStream yet, see [Setup](/getting-started/setup)
:::

::: warning Prefab Requirement
Only prefab instances are tracked and processed for streaming. Non-prefab scene GameObjects are ignored.
:::

## Quick Start Steps

### Step 1: Setup Scene for ProStream

1. Open the ProStream Editor window: **Tools | instance.id | ProStream | ProStream Editor**

2. Click the **Setup Current Scene** button

   ![Setup Current Scene Button](/images/usage_basic_quick_newscene.png)

   - ProStream validates and registers the current scene
   - ProStream creates and wires required scene objects and assets
   - Wait for the process to complete

**What just happened:**

- ProStream created a [SceneConnector](/editor-guide/components/scene-connector) GameObject:

![SceneConnector GameObject](/images/scene_connector_object.png)

```
SceneConnector (automatically created)
  SceneConnectorData
  WorkflowContainer
  SceneSearchFilterManager
  SelectionGroupContainer
  VisualizationManager
```

- Created asset directory structure in `SceneName/SceneData/`
- Created SceneLock, LayerData, SceneSettings, InstanceObjectCollection and UserRuleCollection assets
- Initialized default layers (Ground, LargeObjects, MediumObjects, SmallObjects, Foliage)
- Copied example rules to your scene
- Scene is now ready for configuration

::: info
Setup is performed in a single pass. Depending on editor state, you may still see UI refreshes during or after setup.
:::

### Step 2: Add Scene Search Filters

Scene Search Filters define which areas of your scene ProStream will process. You select structural parent GameObjects, and ProStream tracks prefab children under them.

1. In the ProStream Editor window, click **Add Search Filters** button

2. A hierarchy selector window will open showing recommended filter candidates

3. Select one or more parent GameObjects that contain the objects you want to stream
   - Typically these are parent GameObjects organizing your scene content
   - Example: "Buildings", "Props", "Vegetation"
   - You can select multiple GameObjects (hold Ctrl/Cmd)

4. Click **Confirm** in the selector window

![Add Search Filter Context Menu](/images/add_search_filter.png)

**What just happened:**

- ProStream added `SceneSearchFilter` components to your selected GameObjects
- Found all prefab instances under those GameObjects
- Added `MatchTracker` components to each prefab child
- Set tracker status to "Searchable"
- Only objects under search filters will be processed for streaming

::: tip Organization tip
Search filters help organize large scenes. Only prefab instances under filter GameObjects are tracked for streaming. This improves performance by limiting the scope of object tracking.
:::

### Step 3: Configure Match Rules

Match rules categorize objects into streaming layers (Ground, Large Objects, Small Objects, etc.).

1. In the ProStream Editor window (if closed, reopen via **Tools | instance.id | ProStream | ProStream Editor**)

2. In the Scene Tools tab, click the **Setup Match Rules** button
   - This opens the Rule Editor menu with all available rules

3. Browse the rule list organized by type:
   - **MatchBySearchQuery** - Rules using Unity Search queries
   - **MatchByGOQLRule** - Rules using GameObject Query Language
   - **MatchByDefault** - Fallback rule for unmatched objects
   - **MatchByComponent** - Manual rule assignment using a component on GameObjects

4. Enable rules for your scene:

![Enable Example Rules](/images/enable_rule.png)

   - Locate the rules you wish to enable
   - Double-click a rule to enable it
     or
   - Right-click and select **Add to Scene** from context menu

You can also verify enabled rules by viewing the SceneConnector's inspector:

5. Verify rules are enabled:
   - Select the `SceneConnector` GameObject
   - Check the inspector for enabled rules in the list
   - Enabled rules will show up in the `Rule List`

![SceneConnector Rules](/images/enabled_rules.png)

::: warning Rule Execution Order
Rules are processed in list order. The first matching rule wins. The `MatchByDefault` rule automatically runs last to catch any unmatched objects.
:::

::: tip Quick Tip
You can also single-click a rule to select it and view its properties in the inspector

You can edit and preview query results by clicking the icon on the right side of the query input box:

![Edit and Preview Query](/images/edit_search_query.png)
:::

### Step 4: Configure Streaming Layers

Layers determine loading distances for different object types.

1. In ProStream Editor, open the **Loading** tab

2. In **Settings**, open **Edit LayerData**

3. Click **Edit Loading Distances**

![Access Layer Editor](/images/layer_tab.png)

4. In the Layer Data editor, adjust loading distances:

![Adjust Layer Distances](/images/edit_loading_range.png)

   - **Ground:** 2048 (loads at medium distance)
   - **LargeObjects:** 1024 (loads farther out)
   - **SmallObjects:** 512 (loads close up)

::: info What this means
Objects in "SmallObjects" layer load when camera is within 512 units. Objects in "LargeObjects" layer load when camera is within 1024 units.
:::

**Persistent Layers:** Layers marked as Persistent are always loaded and don't need a range set:

![Persistent Layers](/images/persistent_range.png)

See [Streaming Layers](/core-concepts/streaming-layers) for detailed configuration.

### Step 5: Prepare Scene

This is where ProStream analyzes your scene and assigns objects to layers.

1. In the ProStream Editor window (if closed, reopen via **Tools | instance.id | ProStream | ProStream Editor**)

2. Go to the **Setup** tab

3. Click **Prepare Scene** button

4. Wait for processing to complete (progress bar will show)

::: danger If you get warning or error feedback
- Check Console for specific messages
- Ensure at least one rule is enabled
- Verify at least one Scene Search Filter is added
- Verify your enabled rules actually match your prefab objects
- See [Troubleshooting](/troubleshooting/troubleshooting)
:::

See [Prepare Scene Process](/processes/prepare-scene) for complete details.

### Step 6: Create SubScenes

Now create the actual SubScene files that will stream at runtime.

1. In ProStream Editor (still on Setup tab)

   - The **Create SubScenes** button becomes available after **Prepare Scene** completes successfully

2. Click **Create SubScenes** button

3. Wait for processing (this may take a minute)

**What's happening:**

- ProStream creates scene files (.unity) for each spatial region
- Objects are cloned into appropriate SubScenes and sections
- Scene is reloaded to finalize changes

**After Completion:**

- Check **Project | Assets | SubScene_Assets | YourSceneName | Entity**
- You should see multiple `.unity` files (one per spatial region)

See [SubScene Creation Process](/processes/process-subscenes) for complete details.

### Step 7: Test in Play Mode

Time to see streaming in action!

1. Ensure your scene has a **Camera** or Player controller and it is assigned to the Loading Trigger field in the ProStream Editor or SceneConnector

![Assign Loading Trigger](/images/assign_loading_trigger.png)

2. Enter **Play Mode**

3. Move the camera/character around the scene

**What to observe:**

- SubScenes load/unload as you move
- Objects appear/disappear based on distance

::: tip Performance Check
Open **Window | Analysis | Profiler** to monitor memory and CPU usage. SubScenes should load/unload efficiently without major spikes in cpu or memory.

- If you see performance issues, ensure that your subscenes are not too large (too many objects in one subscene can cause spikes)
- Too many small subscenes can also cause overhead of constantly loading/unloading scenes for small movements. Aim for a balance based on your scene's content and scale.
:::

## Next Steps

Congratulations! You now have a working ProStream setup.

### Refine Your Configuration

**Improve Rule Matching**
- Create custom rules for specific object types
- Adjust rule priorities
- See [Rule Engine](/editor-guide/engines/rule-engine)

**Optimize Streaming**
- Adjust layer distances based on object importance
- Use Persistent layers for always-loaded objects
- See [Streaming Layers](/core-concepts/streaming-layers)

**Add Modifications**
- Separate Colliders for physics interaction
- Combine meshes
- See [Modification Engine](/editor-guide/engines/modification-engine)

### Learn More

**Essential Reading**

- [Prepare Scene Process](/processes/prepare-scene) - Understand rule matching
- [SubScene Creation Process](/processes/process-subscenes) - Understand SubScene generation
- [Runtime Systems](/runtime-systems/runtime-streaming) - How streaming works at runtime

## Common Quick Start Issues

::: details Expand to troubleshoot common setup issues

**Setup button says 'Scene must be saved'**
- Solution: ProStream requires scenes to be saved to disk before setup. Save your scene via **File | Save Scene** first.

**SceneConnector not created after setup**
- Check the Console for any errors during setup
- Look for `SceneName/SceneData/` folder in your Assets

**No SearchFilter Objects found**
- Solution: You forgot Step 2! Click "Add Search Filters" in ProStream Editor and select parent GameObjects that contain your prefabs.

**No MatchTrackers added**
- Check: Your selected GameObjects contain prefab instances (not regular GameObjects)
- Prefabs are children of the search filter GameObject
- Check Console for processing messages

**No rules have been added**
- Solution: Enable at least one rule in the Rule Editor (Step 3).

**No objects matched**
- Rules are enabled (checkmark in Rule Editor)
- Rules actually match your objects (test queries in Unity Search: `Ctrl+K`)
- Confirm objects are prefab instances under selected search filter parents

**SubScenes empty in Play Mode**
- Check: Prepare Scene completed successfully
- SubScene creation completed successfully
- Check SubScene `.unity` files - open them to verify objects are inside
- Check Console for errors

**Streaming not working**
- Check: You're in Play Mode
- Camera/player is moving around
- Streaming distances are appropriate for your scene size
- StreamingManager exists in scene (auto-created after SubScene creation)
:::

For more issues, see [Troubleshooting](/troubleshooting/troubleshooting)

## Pro Tips

::: details Start Small
- Test with 20-30 objects first
- Verify everything works
- Then scale up to your actual scene
:::

::: details Use Examples
- Enable example rules and modify them
- Don't create rules from scratch initially
- Learn by observing what works
:::

::: details Check Console
- Console messages guide you through the process
- Errors are usually clear about what's missing
- Don't ignore warnings
:::

::: details Save Often
- Save scene before Prepare Scene
- Save scene before Create SubScenes
- ProStream operations can't be undone easily
:::

::: details Iterate
- You can re-run Prepare Scene anytime
- Adjust rules and re-calculate
- Only create SubScenes when satisfied with configuration
:::

## What You Learned

- How to set up ProStream in a scene
- How to configure search filters and rules
- How to set up streaming layers
- How to run the Prepare Scene process
- How to create SubScenes
- How to test streaming behavior

**You're now ready to use ProStream in your projects!**

## See Also

**Getting Started**
- [Setup](/getting-started/setup)
- [Requirements](/getting-started/requirements)

**Core Concepts**
- [Rule Engine](/editor-guide/engines/rule-engine)
- [Streaming Layers](/core-concepts/streaming-layers)
- [Scene Search Filter](/editor-guide/components/scene-search-filter)

**Processes**
- [Prepare Scene](/processes/prepare-scene)
- [SubScene Creation](/processes/process-subscenes)
