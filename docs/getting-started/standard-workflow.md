# Standard Workflow

Get up and running with ProStream in just a few minutes! This guide will walk you through the essential steps to set up streaming in a simple scene.

## Prerequisites

Before you start, make sure that you have the following:

- Unity 2022.3.0f1 or later (Unity 6.1 is recommended)
- Scriptable Render Pipeline (SRP) installed and configured (URP or HDRP)
- Scene GameObjects which are not [Prefabs](/core-concepts/importance-of-prefabs) are ignored
- (Recommended) Scene Prefabs are children of an Empty Root-Level Parent GameObject

::: tip
If you haven't installed ProStream yet, see [Installation](/getting-started/installation)
:::

## Quick Start Steps

### Step 1: Setup Scene for ProStream

1. Open the ProStream Editor window: **Tools | instance.id | ProStream | ProStream Editor**

2. Click the **Setup Current Scene** button

   ![Setup Current Scene Button](/images/usage_basic_quick_newscene.png)

   - ProStream will apply a "StreamingScene" label to your scene
   - The scene will automatically save and reload
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
```

- Created asset directory structure in `SceneName/SceneData/`
- Created SceneLock, LayerData, SceneSettings, and RuleCollection assets
- Initialized default layers (Ground, LargeObjects, MediumObjects, SmallObjects, Foliage)
- Applied "StreamingScene" label to enable ProStream's asset processor:

![Streaming Scene Label](/images/streaming_scene_label.png)

- Copied example rules to your scene
- Scene is now ready for configuration

::: info
The scene reload is necessary for ProStream to complete the setup process. This is automatic and takes only a few seconds.
:::

### Step 2: Add Scene Search Filters

Scene Search Filters define which areas of your scene ProStream will process. You select root-level GameObjects, and ProStream tracks all prefab children under them.

1. In the ProStream Editor window, click **Add Search Filters** button

2. A hierarchy selector window will open showing root-level GameObjects

3. Select one or more root GameObjects that contain the objects you want to stream
   - Typically these are parent GameObjects organizing your scene content
   - Example: "Buildings", "Terrain", "Props", "Vegetation"
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
   - **MatchByName** - Rules matching object names
   - **MatchByGOQLRule** - Rules using GameObject Query Language
   - **MatchByDefault** - Fallback rule for unmatched objects

4. Enable rules for your scene:

![Enable Example Rules](/images/pst_2_enable_match_image_psTutorial.png)

   - Expand the `MatchBySearchQuery` category
   - Right-click `Example - Cube`
   - Select **Add to Scene** from context menu
   - Repeat for `Example - Sphere`

You can also verify enabled rules by viewing the SceneConnector's inspector:

![Scene Match Rules](/images/open_match_files.png)

5. Verify rules are enabled:
   - Select the `SceneConnector` GameObject
   - Check the inspector for enabled rules in the list
   - Enabled rules will show a checkmark or badge in the Rule Editor

::: warning Rule Execution Order
Rules are processed in list order. The first matching rule wins. The `MatchByDefault` rule automatically runs last to catch any unmatched objects.
:::

::: tip Quick Tip
You can also single-click a rule to select it and view its properties in the inspector, or double-click to open its editor for detailed configuration.

You can edit and preview query results by clicking the icon on the right side of the query input box:

![Edit and Preview Query](/images/pst_2_edit_preview_query_image_psTutorial.png)
:::

### Step 4: Configure Streaming Layers

Layers determine loading distances for different object types.

1. In SceneConnector inspector, find **Streaming Layers** section

2. Click **Layer Editor** button

![Access Layer Editor](/images/pst_3_menuLayerEditor_image_psTutorial.png)

3. In the Layer Editor, adjust loading distances:

![Adjust Layer Distances](/images/pst_3_layerDistanceLoad_image_psTutorial.png)

   - **Ground:** 100m (loads at medium distance)
   - **LargeObjects:** 150m (loads farther out)
   - **SmallObjects:** 50m (loads close up)

::: info What this means
Objects in "SmallObjects" layer load when camera is within 50m. Objects in "LargeObjects" layer load when camera is within 150m.

**Persistent Layers:** Layers marked as Persistent are always loaded and don't need a range set:

![Persistent Layers](/images/pst_3_layerEditorPersistent_image_psTutorial.png)
:::

See [Streaming Layers](/core-concepts/streaming-layers) for detailed configuration.

### Step 5: Calculate Positions

This is where ProStream analyzes your scene and assigns objects to layers.

1. In the ProStream Editor window (if closed, reopen via **Tools | instance.id | ProStream | ProStream Editor**)

2. Go to the **Setup** tab

3. Click **Calculate Positions** button

4. Wait for processing to complete (progress bar will show)

```
Run Process: CalculateLocations
Running Phase 3: Rule Matching
  Search Query Matches: 28 objects
Running Phase 4: Spatial Calculation
  QuadTree cells created: 4
  Objects assigned: 28
Position Calculation Complete
```

::: danger If you get errors
- Check Console for specific messages
- Ensure at least one rule is enabled
- Verify SceneSearchFilter exists and has a query
- See [Troubleshooting](/troubleshooting/troubleshooting)
:::

See [Position Calculation Process](/processes/position-calculation) for complete details.

### Step 6: Create SubScenes

Now create the actual SubScene files that will stream at runtime.

1. In ProStream Editor (still on Setup tab)

2. Click **Create SubScenes** button

3. Wait for processing (this may take a minute)

**What's happening:**

- ProStream creates scene files (.unity) for each spatial region
- Objects are cloned into appropriate SubScenes and sections
- Scene is reloaded to finalize changes

```console
Creating SubScene Assets...
Processing SubScenes...
SubScene creation complete
Scene reloaded
```

**After Completion:**

- Check **Project | Assets | SubScene_Assets | YourSceneName | Entity**
- You should see multiple `.unity` files (one per spatial region)

See [SubScene Creation Process](/processes/process-subscenes) for complete details.

### Step 7: Test in Play Mode

Time to see streaming in action!

1. Ensure your scene has a **Camera** or Player controller

2. Enter **Play Mode**

3. Move the camera around the scene

**What to observe:**

- SubScenes load/unload as you move
- Objects appear/disappear based on distance
- Check **Hierarchy** window - SubScenes load additively

```
YourScene (Main)
├── SceneConnector
├── SubSceneRoot
│   ├── YourScene_Quad_0_0 (SubScene - Loaded)
│   ├── YourScene_Quad_0_1 (SubScene - Not Loaded)
│   └── ...
└── Camera
```

::: tip Performance Check
Open **Window | Analysis | Profiler** to monitor memory and CPU usage. SubScenes should load/unload efficiently.
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
- Combine meshes for better performance
- Remove unnecessary components
- See [Modification Engine](/editor-guide/engines/modification-engine)

### Learn More

**Essential Reading**

- [Position Calculation Process](/processes/position-calculation) - Understand rule matching
- [SubScene Creation Process](/processes/process-subscenes) - Understand SubScene generation
- [Runtime Systems](/runtime-systems/runtime-streaming) - How streaming works at runtime

## Common Quick Start Issues

**Setup button says 'Scene must be saved'**
- Solution: ProStream requires scenes to be saved to disk before setup. Save your scene via **File | Save Scene** first.

**SceneConnector not created after setup**
- Check: The scene automatically reloaded after clicking Setup
- Check the Console for any errors during setup
- Verify the scene has the "StreamingScene" label in Project window
- Look for `SceneName/SceneData/` folder in your Assets

**No SearchFilter Objects found**
- Solution: You forgot Step 2! Click "Add Search Filters" in ProStream Editor and select root GameObjects that contain your prefabs.

**No MatchTrackers added**
- Check: Your selected GameObjects contain prefab instances (not regular GameObjects)
- Prefabs are children of the search filter GameObject
- Check Console for processing messages

**No rules have been added**
- Solution: Enable at least one rule in the Rule Editor (Step 3).

**No objects matched**
- Check: Search query in SceneSearchFilter is correct
- Rules are enabled (checkmark in Rule Editor)
- Rules actually match your objects (test queries in Unity Search: `Ctrl+K`)

**SubScenes empty in Play Mode**
- Check: Position Calculation completed successfully
- SubScene creation completed successfully
- Check SubScene `.unity` files - open them to verify objects are inside
- Check Console for errors

**Streaming not working**
- Check: You're in Play Mode
- Camera/player is moving around
- Streaming distances are appropriate for your scene size
- StreamingManager exists in scene (auto-created after SubScene creation)

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
- Save scene before Calculate Positions
- Save scene before Create SubScenes
- ProStream operations can't be undone easily
:::

::: details Iterate
- You can re-run Calculate Positions anytime
- Adjust rules and re-calculate
- Only create SubScenes when satisfied with configuration
:::

## What You Learned

- How to set up ProStream in a scene
- How to configure search filters and rules
- How to set up streaming layers
- How to run the position calculation process
- How to create SubScenes
- How to test streaming behavior

**You're now ready to use ProStream in your projects!**

## See Also

**Getting Started**
- [Installation](/getting-started/installation)
- [Prerequisites](/getting-started/prerequisites)

**Core Concepts**
- [Rule Engine](/editor-guide/engines/rule-engine)
- [Streaming Layers](/core-concepts/streaming-layers)
- [Scene Search Filter](/editor-guide/components/scene-search-filter)

**Processes**
- [Position Calculation](/processes/position-calculation)
- [SubScene Creation](/processes/process-subscenes)
