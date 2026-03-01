# ProStream Offline Documentation

Generated: 2026-03-01

This document is generated from the VitePress source docs for offline distribution.

## Table of Contents

- Getting Started
  - 1. [Setup](#doc-1-setup)
  - 2. [Sample Project Quickstart](#doc-2-sample-project-quickstart)
  - 3. [Standard Workflow](#doc-3-standard-workflow)
- Core Concepts
  - 4. [Importance of Prefabs](#doc-4-importance-of-prefabs)
  - 5. [Streaming Layers](#doc-5-streaming-layers)
- Editor Guide
  - 6. [ProStream Editor](#doc-6-prostream-editor)
  - 7. [Scene Connector](#doc-7-scene-connector)
  - 8. [Scene Search Filter](#doc-8-scene-search-filter)
  - 9. [Rule Engine](#doc-9-rule-engine)
  - 10. [Modification Engine](#doc-10-modification-engine)
  - 11. [Operation Engine](#doc-11-operation-engine)
  - 12. [Validation and Diagnostics](#doc-12-validation-and-diagnostics)
- Processes
  - 13. [Prepare Scene](#doc-13-prepare-scene)
  - 14. [SubScene Creation](#doc-14-subscene-creation)
- Runtime Systems
  - 15. [Runtime Streaming](#doc-15-runtime-streaming)
- Troubleshooting
  - 16. [Common Issues](#doc-16-common-issues)
  - 17. [Build and Runtime](#doc-17-build-and-runtime)
- Reference
  - 18. [Settings Reference](#doc-18-settings-reference)
  - 19. [Change Log](#doc-19-change-log)
  - 20. [Install and Update](#doc-20-install-and-update)

## Setup Guide (Step by Step)

Use the numbered setup and quickstart sections below for a complete installation and first-run walkthrough.

## Getting Started

<a id="doc-1-setup"></a>

### 1. Setup

::: info
Upon first importing the ProStream package, the ProStream setup window appears automatically.
:::

![ProStream Setup](/images/import_prostream.png)


## Editor Requirements

Before you start, make sure that you have the following:

- The primary requirements of ProStream are that of the Data Oriented Technology Stack [(DOTS/ECS)](https://docs.unity3d.com/Packages/com.unity.entities.graphics@1.4/manual/requirements-and-compatibility.html)
- Unity 2022.3.0f1 or later (Unity 6.3 is recommended)
- Scriptable Render Pipeline (SRP) installed and configured (URP or HDRP)
- Any additional requirements as specified by the DOTS/ECS packages for your Editor version or target platform

## Additional Requirements and Recommendations

- Editor API Compatibility Level set to .Net Standard (required)
- Scene GameObjects which are to be converted to Entities need to be [Prefabs](/core-concepts/importance-of-prefabs)
- (Recommended) Scene Prefabs are children of an Empty Root-Level Parent GameObject

## Recommended Project Settings

To take full advantage of ProStream and the Data Oriented Technology Stack, it is recommended to use the following settings:

| Setting                                                                                                                | Value                                                                                                                                     |
| ---------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Scripting Backend                                                                                                      | [IL2CPP](https://docs.unity3d.com/Manual/IL2CPP.html)                                                                                     |
| API Compatibility Level                                                                                                | [.Net Standard 2(.1)](https://docs.unity3d.com/Manual/dotnetProfileSupport.html)                                                          |
| Graphics APIs                                                                                                          | [Vulkan, Metal, or DX11/12](https://docs.unity3d.com/Packages/com.unity.entities.graphics@1.2/manual/requirements-and-compatibility.html) |
| [Incremental GC (Garbage Collection)](https://docs.unity3d.com/Manual/performance-incremental-garbage-collection.html) | Enabled      

## 1) Open the ProStream Setup Window

Upon first importing the ProStream package (or when updating), the ProStream setup window will appear automatically.

For optimal performance, use the settings described above.

These settings can be automatically applied in the `Recommended Settings` window.

## 2) Apply Recommended Settings

Use the `Recommended Settings` window to apply required and recommended project changes.

![Recommended Settings](/images/ps_recommended_settings.png)

## 3) Import ProStream

If an appropriate SRP (URP/HDRP) is installed, press the `Import ProStream` button to begin installing the necessary dependencies and files.

![Import ProStream](/images/quick_start/requirements_met_setup.png)

::: warning SRP Requirement
An appropriate Scriptable Render Pipeline (URP or HDRP) must be installed before ProStream can be installed.
:::

## Why a setup process?

ProStream is designed to be installed as a proper package in order to ensure proper dependency installation and management and will not show up in your `Assets/` folder.

The purpose of the setup process is to ensure that the package is installed to the correct location and that the necessary dependencies are installed.

::: tip
The setup process can also be accessed by navigating to **Tools > instance.id > ProStream > (Setup/Update) ProStream**
:::

<a id="doc-2-sample-project-quickstart"></a>

### 2. Sample Project Quickstart

::: info
The focus of this guide is to get you up and running **quickly** with a new Unity project using the ProStream sample package.
:::

## At a Glance

1. Create a new Unity URP project
2. Import the ProStream package
3. Apply required/recommended project settings
4. Install ProStream and dependencies
5. Import sample assets
6. Open the sample scene and ProStream Main Editor
7. Run **Prepare Scene**
8. Run **Create SubScenes**
9. Play the scene and verify streaming

## 1) Create a New Unity URP Project

Create a new Unity project using the URP Core template via Unity Hub.

![New URP Project](/images/quick_start/new_urp_project.png)

## 2) Import the ProStream Package

![Import ProStream Package](/images/quick_start/import_prostream_package.png)

### Project Settings

From the ProStream Setup window, select the "View Settings Options" button.

![View Settings Options](/images/quick_start/view_settings_options.png)

This window will show you the required and recommended settings for your project (with required items being highlighted)
Check the boxes of the changes you wish to apply, then click the "Apply Changes" button to apply them.

![Check Box and Apply](/images/quick_start/check_box_and_apply.png)

::: tip Manual Configuration
These settings can also be configured manually in **Project Settings > Player > Other Settings**.

![Project Settings Player](/images/quick_start/project_settings_player.png)
:::

You will be prompted to restart the Editor if necessary.

![Restart To Apply](/images/quick_start/restart_to_apply.png)

## 3) Import ProStream and Dependencies

Once the requirements are met, you can import ProStream and its dependencies via the `Import ProStream` button.

![Import ProStream](/images/quick_start/requirements_met_setup.png)

## 4) Import Sample Assets

After the installation is complete, you can import the sample assets via the View Samples button. This will open the Package Manager to the ProStream package page and Samples tab.

![View Samples](/images/quick_start/view_samples.png)

Press the "Import" button to import the sample assets into your project.

![Import Sample](/images/quick_start/import_sample.png)

The samples will be imported into the `Assets/Samples/ProStream/<package_version>/Procedural Generation Sample/` folder.

### Open Sample Scene

Navigate to the `Assets/Samples/ProStream/<package_version>/Procedural Generation Sample/Scenes` folder and open the `Sample.unity` scene.

![Sample Imported](/images/quick_start/sample_imported.png)

## 5) Open ProStream Main Editor

The ProStream Main Editor can be opened in two ways:

- **A.** From the ProStream Setup window, select the "ProStream Editor" button.

![Open ProStream Editor 1](/images/quick_start/open_prostream_editor_1.png)

- **B.** From the Unity Editor menu, select "Tools > instance.id > ProStream > ProStream Editor" to open the main editor window.

![Open ProStream Editor 2](/images/quick_start/open_prostream_editor_2.png)

The sample scene and its associated assets are pre-configured to quickly get started and demonstrate ProStream.

![Scene Configured](/images/quick_start/scene_configured.png)

## 6) Prepare Scene

From the ProStream Main Editor, press the "Prepare Scene" button.

![Prepare Scene](/images/quick_start/prepare_scene.png)

::: details What happens during Prepare Scene?

- Create quadtree grid structures and calculates spatial data
- Runs checks against GameObjects and Components (validate materials, colliders, shaders, etc)
- Runs rule matching systems to categorize GameObjects into logical layers/sections (e.g., ground, buildings, vegetation)
:::

![Running Match Check Systems](/images/quick_start/running_match_check_systems.png)

## 7) Create SubScenes

When the `Prepare Scene` process is complete, the "Create SubScenes" button will become available. Press this button to begin the subscene creation process.

![Create SubScenes](/images/quick_start/create_subscenes.png)

The "Create SubScenes" process is the final major editor step that converts prepared scene data into actual Unity SubScene assets.

This process takes the QuadTree structure and StreamingManager from the Prepare Scene phase and creates SubScene asset files, populating them with cloned GameObjects organized by streaming sections. This enables streaming based on player position and distance settings per layer.

## 8) Process Complete

### What Was Created

During the "Create SubScenes" process, the following assets/components were generated:

- **SubScene Asset Files**: Unity SubScene Assets stored in `Assets/SubScene_Assets/Sample/Entity/`
- **SubScene GameObjects**: SubScene GameObjects are located in the hierarchy under the `SubSceneRoot` GameObject
- **StreamingManager**: Orchestrates editor and runtime streaming systems

![SubScenes and Components](/images/quick_start/subscenes_and_components.png)

### Next Steps

::: tip Ready to Validate
At this point, the scene is fully configured and ready to use.

You can now play the scene and test the streaming functionality.
:::

<a id="doc-3-standard-workflow"></a>

### 3. Standard Workflow

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


## Editor Requirements

Before you start, make sure that you have the following:

- The primary requirements of ProStream are that of the Data Oriented Technology Stack [(DOTS/ECS)](https://docs.unity3d.com/Packages/com.unity.entities.graphics@1.4/manual/requirements-and-compatibility.html)
- Unity 2022.3.0f1 or later (Unity 6.3 is recommended)
- Scriptable Render Pipeline (SRP) installed and configured (URP or HDRP)
- Any additional requirements as specified by the DOTS/ECS packages for your Editor version or target platform

## Additional Requirements and Recommendations

- Editor API Compatibility Level set to .Net Standard (required)
- Scene GameObjects which are to be converted to Entities need to be [Prefabs](/core-concepts/importance-of-prefabs)
- (Recommended) Scene Prefabs are children of an Empty Root-Level Parent GameObject

## Recommended Project Settings

To take full advantage of ProStream and the Data Oriented Technology Stack, it is recommended to use the following settings:

| Setting                                                                                                                | Value                                                                                                                                     |
| ---------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Scripting Backend                                                                                                      | [IL2CPP](https://docs.unity3d.com/Manual/IL2CPP.html)                                                                                     |
| API Compatibility Level                                                                                                | [.Net Standard 2(.1)](https://docs.unity3d.com/Manual/dotnetProfileSupport.html)                                                          |
| Graphics APIs                                                                                                          | [Vulkan, Metal, or DX11/12](https://docs.unity3d.com/Packages/com.unity.entities.graphics@1.2/manual/requirements-and-compatibility.html) |
| [Incremental GC (Garbage Collection)](https://docs.unity3d.com/Manual/performance-incremental-garbage-collection.html) | Enabled      

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

## Core Concepts

<a id="doc-4-importance-of-prefabs"></a>

### 4. Importance of Prefabs

The Prefab Asset acts as a template from which you can create new Prefab instances in the Scene.

ProStream uses Prefab system to differentiate one GameObject Hierarchy from another.

::: warning Important
All GameObjects must be Prefabs to be compatible with ProStream systems.
Non-Prefab GameObjects are skipped by the matching systems.
:::

As illustrated below, without Prefabs the only distinction between an `Organizational_Object` and a `Complex_GameObject` is the GameObjects name.
While this might be sufficient to visually distinguish between the two, programmatically, they are the same.

![Base Hierarchy](/images/additional/prefabs/base_hierarchy.png)
![Complex vs Organizational](/images/additional/prefabs/complex_vs_organizational.png)

Creating a Prefab removes the ambiguity and outlines a concrete blueprint of what a particular GameObject is and what it should contain.

With this distinction, the ProStream systems can accurately identify and match GameObjects in the scene.
![Clear Distinction](/images/additional/prefabs/clear_distinction.png)

### See Also

- [Unity Prefabs](https://docs.unity3d.com/Manual/Prefabs.html)

<a id="doc-5-streaming-layers"></a>

### 5. Streaming Layers

Streaming layers control when section content loads and unloads based on distance from your Loading Trigger (player, camera, or custom trigger).

Layer setup is one of the most important performance/quality controls in ProStream.

## Access Streaming Layers

![Layer Editor Menu](/images/pst_3_menuLayerEditor_image_psTutorial.png)

## Streaming Distance Editing

In the **Layer Editor** menu, you can adjust the distance in which each SubScene layer will load into the scene.

![Layer Distance Configuration](/images/pst_3_layerDistanceLoad_image_psTutorial.png)

Each layer uses a range (`start`, `end`) for Entity SubScene streaming.
For example, `0-256` means the section can load when the trigger is within that range.

::: tip Distance Guidelines
- **Higher number** = The farther away the Loading Trigger can be for the SubScene layer to load
- **Lower number** = The closer the Loading Trigger must be for the SubScene Layer to load
:::

The numeric value in the right-side input box is the current maximum value, and the right-side slider is the current value. Hovering over the slider handle shows what the current distance setting is, and can be dragged left/right to be adjusted.

To raise the value above the current maximum, just input a new value into the right-side input box.

## Persistent Layers

![Persistent Layers](/images/pst_3_layerEditorPersistent_image_psTutorial.png)

Layers marked as **Persistent** are always loaded, and thus, do not need to have a range set.

Use persistent sparingly for always-on critical content, because it bypasses normal distance streaming.

## Default Layers

ProStream creates these default layers during scene setup:

| Layer Name | Default Distance | Purpose |
|------------|------------------|---------|
| Ground | 2048 | Terrain, roads, ground meshes |
| LargeObjects | 1024 | Buildings, large structures |
| MediumObjects | 512 | Medium-sized props, vehicles |
| SmallObjects | 256 | Small details, clutter |
| Foliage | 128 | Trees, bushes, grass |

Defaults are starting points. Tune them for your world scale and camera/player speed.

## Layer Configuration Strategy

### Distance-Based Loading

Configure layers based on object visibility and importance:  
(Good starting point for distance settings, but adjust based on your scene's scale and content)

**Far Distance (1024+)**
- Mesh Terrain
- Large buildings and structures

**Medium Distance (512-1024)**
- Medium buildings
- Large props
- Trees and vegetation

**Close Distance (256-512)**
- Small props
- Detail objects
- Ground clutter

**Very Close (0-256)**
- Tiny details
- High-poly models

## How Runtime Uses Layer Ranges

At runtime, Entity SubScene systems evaluate distance to each section bound and compare against layer ranges.

- **Load**: within start/end range
- **Unload**: beyond end range (with unload buffer multiplier)

GameObject SubScene streaming uses a separate GO loading range setting in LayerData.

See [Runtime Streaming](/runtime-systems/runtime-streaming) for full runtime details.


## Creating Custom Layers

You can create custom layers to better organize your content:

1. Open the Layer Editor
2. Click **Add Layer**
3. Configure the layer name and distance
4. Assign rules to match objects to this layer

## Practical Tuning Tips

1. Start with defaults and test in Play Mode.
2. Increase ranges for large landmarks that must appear early.
3. Decrease ranges for dense small props to reduce memory/load spikes.
4. Use profiler + visual testing together before locking values.

## Editor Guide

<a id="doc-6-prostream-editor"></a>

### 6. ProStream Editor

The ProStream Editor is the main interface for configuring and managing ProStream in your Unity project.

![ProStream Editor Window](/images/main_ps_editor.png)

## Access ProStream Editor

To access the ProStream Editor, you can use the following methods:

1. Press `Shift+Alt+P` shortcut to open the ProStream Editor

2. Press the "ProStream Editor" button in the installer

   ![Open ProStream Editor](/images/quick_start/open_prostream_editor_1.png)

3. Use menu path **Tools → instance.id → ProStream → ProStream Editor**

   ![Open Menu](/images/quick_start/open_prostream_editor_2.png)

## Setup Scene

::: warning Important
Save your scene before setup. ProStream requires scenes to be saved to disk.
:::

Click the setup button in the ProStream Editor to configure the current scene for ProStream.

Depending on current scene diagnostics, this button can appear as **Setup Current Scene**, **Setup Current Scene For ProStream**, or **Fix Scene Configuration**.

![Setup Scene Button](/images/usage_basic_quick_newscene.png)

**What happens automatically:**
- Validates that the active scene is saved on disk (required)
- Creates scene data assets/folders for the active scene
- Creates ProStream assets (SceneLock, LayerData, SceneSettings, UserRuleCollection, InstanceObjectCollection, and a MatchRules directory)
- Creates or updates [SceneConnector](/editor-guide/components/scene-connector) and related scene objects:

![SceneConnector Object](/images/scene_connector_object.png)

```
SceneConnector (automatically created)
  SceneConnectorData
  WorkflowContainer
  SceneSearchFilterManager
  SelectionGroupContainer
  VisualizationManager
```

::: tip
Do not manually create SceneConnector. The setup process creates and wires it automatically.
:::

::: tip
Current setup flow performs a direct finalize step after asset creation and no longer relies on scene label/reload timing.
:::

## See Also

- [Standard Workflow](/getting-started/standard-workflow) - Complete setup guide
- [Scene Connector](/editor-guide/components/scene-connector) - Main component reference
- [Rule Engine](/editor-guide/engines/rule-engine) - Configure matching rules
- [Prepare Scene Process](/processes/prepare-scene) - Next major workflow step

<a id="doc-7-scene-connector"></a>

### 7. Scene Connector

# SceneConnector

The SceneConnector is a component that is used as the main connecting point for the ProStream systems.

![SceneConnector Fields](/images/SceneConnector/scene_connector.png)

::: info  
**Note:** SceneConnector is **automatically created** when you click "Setup Current Scene For ProStream" in the ProStream Editor. Do not manually create this component.
:::

See [ProStream Editor](/editor-guide/windows/prostream-editor) for setup instructions.

## Loading Trigger

The Loading Trigger position value is used to determine when a SubScene (and layers) loads and unloads from the world.
While it is not necessary for the **Loading Trigger** to be a Player Character (it can be a Camera, NPC Object, etc) it is necessary for the loading system to operate properly.

:::info
**If this field is left empty, when the system starts, it will attempt to locate and use Camera.main as the Loading Trigger.**
:::

## Search Filter

When the Search Filter field is populated, and the RuleEngine Match system runs, matches are restricted to child GameObjects of the Search Filter GameObject.

::: warning
**If no GameObjects are assigned to the Search Filter list, the system will attempt to match against all GameObjects in the hierarchy.**

This is typically undesired as this could include Cameras, Lighting, Light Probes, etc, and any number of things that you might wish to keep in the main parent scene.
:::



## Component Structure

The SceneConnector GameObject contains several child components:

### SceneConnectorData
Stores data and references for the SceneConnector.

### WorkflowContainer
Manages workflow state and process execution.

### SceneSearchFilterManager
Coordinates all Scene Search Filters in the scene.

### SelectionGroupContainer
Manages object selection groups for organization.

### VisualizationManager
Handles visualizations (e.g. Loading Distance Range, etc)



## See Also

- [ProStream Editor](/editor-guide/windows/prostream-editor) - How to set up scenes
- [Scene Search Filter](/editor-guide/components/scene-search-filter) - Define processing scope
- [Runtime Streaming](/runtime-systems/runtime-streaming) - How streaming works at runtime

<a id="doc-8-scene-search-filter"></a>

### 8. Scene Search Filter

SceneSearchFilters define which areas of your scene ProStream will process. They improve performance by limiting the scope to specific hierarchies.

::: warning Important
All GameObjects must be Prefabs to be compatible with ProStream systems. The Prefab system is used to differentiate one GameObject hierarchy from another. Non-Prefab GameObjects are skipped by the matching systems.
:::

## How to Add Scene Search Filters

### Method 1: ProStream Editor (Recommended)

1. Open ProStream Editor: **Tools | instance.id | ProStream | ProStream Editor**
2. Click the **Add Search Filters** button
3. A hierarchy selector window will open showing root-level GameObjects
4. Select one or more root GameObjects that contain your prefabs
5. Click **Confirm**

**What happens automatically:**

- ProStream adds `SceneSearchFilter` component to selected GameObjects
- Locates all prefab instances under those GameObjects
- Adds `MatchTracker` components to each prefab child
- Sets tracker status to "Searchable"

### Method 2: Context Menu (Alternative)

1. Right-click on one or many top-level GameObjects in the scene hierarchy
2. Select **ProStream | Add Scene Search Filter**

![Add Search Filter Context Menu](/images/add_search_filter.png)

This will add a SceneSearchFilter component to the GameObject and begin indexing the child prefab GameObjects.

## How Search Filters Work

**Hierarchy Structure:**

```
Scene
├── Buildings (SearchFilter)
│   ├── Building_01 (Prefab → MatchTracker added)
│   ├── Building_02 (Prefab → MatchTracker added)
│   └── Building_03 (Prefab → MatchTracker added)
├── Props (SearchFilter)
│   ├── Prop_01 (Prefab → MatchTracker added)
│   └── Prop_02 (Prefab → MatchTracker added)
└── Camera (No filter → ignored)
```

**Key Points:**

- Only prefab instances **under** search filter GameObjects are tracked
- This allows organizing large scenes into manageable sections
- Improves performance by limiting the scope of object tracking
- You can have multiple search filters in a scene

## MatchTracker Component

When you add a search filter, ProStream automatically adds `MatchTracker` components to all prefab children:

**MatchTracker Properties:**

- `FilterId` - References parent SceneSearchFilter
- `MatchStatus` - Searchable, NotSearchable, or Converted
- `IsEnabled` - Whether tracker is active
- `IsMatched` - Whether a rule matched this object
- `SectionId` - Which streaming layer this object belongs to

**You don't need to add MatchTracker manually** - it's automatic.

## See Also

- [Importance of Prefabs](/core-concepts/importance-of-prefabs) - Why prefabs are required
- [Rule Engine](/editor-guide/engines/rule-engine) - How objects are matched
- [Standard Workflow](/getting-started/standard-workflow) - Complete setup guide

<a id="doc-9-rule-engine"></a>

### 9. Rule Engine

The RuleEngine is the system used to match tracked GameObjects to streaming sections/layers.

## Overview

The RuleEngine system is extensible through rule provider types.

**Current Providers:**

- `MatchBySearchQuery` (Unity Search query rules)
- `MatchByGOQLRule` (GameObject Query Language rules)
- `MatchByComponent` (manual assignment component-based matching)
- `MatchByDefault` (fallback catch-all rule)
- Custom rules that inherit `RuleEngine`

## Rule Editor

![Rule Editor Window](/images/rule_editor_window.png)

## Configure Matching Rules

### Open Match Rules Menu

1. Press the "Scene Match Rules" button
2. This switches to the Rule Editor menu in the ProStream Editor

![Open Match Files](/images/open_match_files.png)

### Enable Example Rules

1. Locate the example items under the MatchBySearchQuery rules category
2. Double click rule to enable

![Enable Match Rules](/images/pst_2_enable_match_image_psTutorial.png)

You can also verify currently enabled rules in the SceneConnector inspector under `ruleList`.

### Edit and Preview Queries

You can edit and preview the results of the query by clicking icon on the right side of the query input box.

![Edit Preview Query](/images/pst_2_edit_preview_query_image_psTutorial.png)

## Rule Providers

### MatchBySearchQuery

Uses Unity's Search Query system to match objects. This is the most powerful and flexible provider.

**Example Queries:**
- `Tree` - Match prefabs with "Tree" in name
- `size>10` - Match prefabs larger than 10 units
- `tag:Environment` - Match prefabs with Environment tag

**Benefits:**
- Leverages Unity's built-in search
- Very flexible and powerful
- Can combine multiple criteria
- Preview results in Unity Search window

### MatchByGOQLRule

Uses GameObject Query Language for advanced matching.

**Example Queries:**
- `/Parent/**//SM_Bld_Castle*` - Match objects with names starting with SM_Bld_Castle under Parent
- `/Parent/**//SM_Bld_*!*Castle*` - Match objects with names starting with SM_Bld_ but not containing Castle under Parent

### MatchByDefault

Fallback rule that matches any unmatched objects.

**Behavior:**
- Always runs last
- Catches objects not matched by other rules
- Assigns to a default layer (which must be specified in the rule settings)

### MatchByComponent

Uses the `ManualAssignment` component to assign objects to a target section ahead of query-based matching.

**Behavior:**
- Processes before query rules
- Useful for explicit manual overrides
- Works well for one-off exceptions

## Creating Custom Rules

You can create custom rule providers by extending the `RuleEngine` class:

```csharp
using instance.id.ProStream;
using UnityEngine;

public class MatchByName : RuleEngine
{
    // Base Class Overrides
    public override string Title => "Match By Name";
    public override string RuleName => FriendlyName(name, typeof(MatchByName));

    // Rule Members
    private enum MatchType { Contains, DoesNotContain }

    [SerializeField] private MatchType matchType;
    [SerializeField] private string nameMatchString;

    public override int CheckRule(Transform obj)
    {
        return matchType switch
        {
            MatchType.Contains when obj.name.Contains(nameMatchString) => Matched,
            MatchType.DoesNotContain when !obj.name.Contains(nameMatchString) => Matched,
            _ => Unmatched
        };
    }
}
```

## Rule Execution

### Execution Order

Rules are processed in the order they appear in the list:

1. First rule checks object
2. If matched, assign to layer and stop
3. If not matched, try next rule
4. Continue until match found or list exhausted
5. MatchByDefault catches any remaining objects

### Rule Priority

You can reorder rules by dragging them in the Rule Editor:

- Higher priority rules should be first
- More specific rules before general rules (Ex. Foliage rules -> Ground rules -> Large Object rules)
- MatchByDefault should always be last

## Rule Configuration

### Assigning to Layers

Each rule is assigned to a specific streaming layer:

- Ground
- LargeObjects
- MediumObjects
- SmallObjects
- Foliage
- Custom layers

### Rule Settings

**Common Settings:**
- **Enabled** - Whether rule is active
- **Priority** - Execution order
- **Target Layer** - Which layer matched objects go to
- **Description** - Notes about the rule

## Testing Rules

### Preview in Unity Search

1. Open Unity Search (`Ctrl+K`)
2. Enter your search query
3. Verify correct objects are found
4. Refine query as needed

### Test During Prepare Scene

1. Enable console logging
2. Run Prepare Scene
3. Check console for match statistics
4. Verify objects assigned to correct layers

### Inspect MatchTracker

1. Select a prefab instance in scene
2. Check MatchTracker component
3. Verify `IsMatched` is true
4. Check `SectionId` shows correct layer

## Best Practices

### Start with Examples

- Enable example rules first
- Modify them for your needs
- Learn by observing what works

### Be Specific

- More specific rules = better control
- Use multiple criteria in queries
- Test queries before enabling

## Common Issues

**No objects matched**
- Check search query syntax
- Verify objects are prefabs
- Ensure objects are under search filters
- Test query in Unity Search window

**Wrong objects matched**
- Query too broad - add more criteria
- Check rule priority order
- Verify layer assignments

**Objects matched by wrong rule**
- Reorder rules (priority)
- Make earlier rules more specific
- Check for overlapping criteria

**Rule not executing**
- Verify rule is enabled
- Check that rule is in SceneConnector list
- Ensure no errors in rule code

## Performance Considerations

**Query Complexity**

- Simple queries are faster
- Complex queries may slow calculation
- Balance specificity vs performance

**Rule Count**

- More rules = longer processing
- Combine similar rules when possible
- Remove unused rules

**Match Early**

- Put common matches first
- Reduces checks for most objects
- Improves overall performance

## See Also

- [Streaming Layers](/core-concepts/streaming-layers) - Configure layer distances
- [Prepare Scene](/processes/prepare-scene) - How rules are applied
- [Scene Search Filter](/editor-guide/components/scene-search-filter) - Define processing scope
- [Standard Workflow](/getting-started/standard-workflow) - Complete setup guide

<a id="doc-10-modification-engine"></a>

### 10. Modification Engine

The **Modification Engine** is a powerful extensibility system that allows you to hook into various stages of ProStream's workflow and perform custom processing on GameObjects, sections, or entire SubScenes.

## Overview

Think of modifications as **middleware** or **plugins** that extend ProStream's functionality without modifying core code. Modifications can run before, during, or after major processes like Prepare Scene and SubScene creation.

## Key Concepts

### What is a Modification?

A modification is a `ScriptableObject` that inherits from `ModificationEngine` and implements custom logic to transform or enhance GameObjects during the ProStream workflow.

### When to Use Modifications

**Common Use Cases:**
- **Mesh Combining** - Merge multiple meshes per section for performance
- **LOD Generation** - Create LOD groups automatically
- **Component Removal** - Strip unnecessary components (e.g., colliders in visual-only sections)
- **Material Optimization** - Batch materials, reduce draw calls
- **Physics Baking** - Pre-compute physics data
- **Custom Data Setup** - Add/configure custom components
- **Validation** - Check for issues before finalizing SubScenes

## Execution Placements

Modifications can execute at multiple points in the workflow:

### Prepare Scene Stage
- **BeforePositionCalculation** - Before rule matching begins
- **AfterPositionCalculation** - After rules applied, before SubScene creation

### SubScene Creation Stage
- **BeforeSubSceneCreation** - Before SubScene assets are created
- **AfterSubSceneCreation** - After SubScene creation stage
- **BeforeMoveToSubScene** - Before sections moved to SubScene files
- **AfterMoveToSubScene** - After sections in SubScene files
- **BeforeCloseSubScenes** - Before SubScene files are closed
- **AfterCloseSubScenes** - After all SubScenes closed

### Process Management
- **UponProcessStarting** - When any major process starts
- **UponProcessCompletion** - When any major process completes

### Scene Reset
- **BeforeSceneReset** - Before resetting scene state
- **AfterSceneReset** - After scene reset complete

### Build Pipeline
- **BeforeBuildStarted** - Before Unity build begins
- **AfterBuildComplete** - After Unity build finishes
- **FinalizeAssets** - Final asset finalization stage

### Manual Execution
- **Manual** - Only runs when explicitly triggered
- **Disabled** - Modification is inactive

## Built-in Modifications

### CombineMeshModification
**Purpose:** Combines multiple meshes into single mesh for performance

**Execution:** Commonly used during process events (for example `BeforeMoveToSubScene`) based on your project setup

**Benefits:**
- Can reduce draw commands for unique, non-instanced geometry
- Can help with tightly clustered static geometry that is usually visible together
- Useful for some static sets (for example ground chunks or dense rock groups)

**DOTS/ECS Note:**
- In ECS SubScenes, Entities Graphics already batches efficiently when entities share the same mesh and material (DOTS instancing)
- Combining too aggressively can reduce culling granularity; if part of a combined mesh is visible, the whole mesh is rendered
- Prefer separate repeated objects when they can instance well and benefit from finer culling/occlusion; use mesh combining selectively and verify with profiling

**Configuration:**
- Target layer/section
<!-- - Material handling (combine or preserve)
- Mesh simplification options -->

**Usage Tips:**
- Best paired with a very specific match rule and target layer/section to target specific objects (e.g., A custom match rule that only matches small rock clusters, then combine those clusters into single meshes in a "Rocks_Combined" layer/section)

### DisableMeshColliderModification
**Purpose:** Removes MeshCollider components from GameObjects

**Execution:** Commonly `BeforeMoveToSubScene` (default settings)

**Use Case:**
- Remove colliders from visual-only sections
- Reduce physics overhead
- Keep colliders in dedicated collision layers only

### RemoveMatchComponents
**Purpose:** Removes MatchTracker and related components after processing

**Execution:** Commonly `BeforeMoveToSubScene` (default settings)

**Use Case:**
- Clean up temporary components
- Reduce runtime memory usage
- Remove editor-only data

## Creating Custom Modifications

### Step 1: Create ScriptableObject

```csharp
using instance.id.ProStream;
using UnityEngine;

[CreateAssetMenu(fileName = "MyCustomModification",
                 menuName = "instance.id/ProStream/ModificationEngine/MyCustomModification")]
public class MyCustomModification : ModificationEngine
{
    [SerializeField] private float multiplier = 1.5f;
    [SerializeField] private Color targetColor = Color.white;

    public override string Title => "My Custom Modification";

    public override ExecutionPlacement ExecutionPlacement =>
        ExecutionPlacement.BeforeMoveToSubScene;
}
```

### Step 2: Implement Modification Logic

```csharp
// Modify individual GameObjects
public override GameObject ApplyModification(GameObject gObject)
{
    // Example: Scale objects
    gObject.transform.localScale *= multiplier;

    // Example: Change material color
    var renderer = gObject.GetComponent<Renderer>();
    if (renderer && renderer.material)
    {
        renderer.material.color = targetColor;
    }

    return gObject;
}

// Run once per section before processing objects
public override void PrepareModification(GameObject sectionParent)
{
    // Example: Add section-level component
    var sectionData = sectionParent.AddComponent<MyCustomSectionData>();
    sectionData.Initialize();

    Log("Preparing section: " + sectionParent.name);
}
```

### Step 3: Create Asset Instance

1. Right-click in Project window
2. Select **Create → instance.id → ProStream → ModificationEngine → MyCustomModification**
3. Name the asset (e.g., `ScaleObjects_Mod`)
4. Configure settings in Inspector

### Step 4: Enable in ProStream Editor

1. Open ProStream Editor
2. Navigate to **Modifications** section
3. Click **Add Modification**
4. Select your modification asset
5. Enable it (checkbox)
6. Configure execution placement and order

## Best Practices

### Performance
- Keep modifications lightweight
- Use batch processing when possible
- Cache component references
- Avoid expensive operations in tight loops
- Profile modifications with Unity Profiler

### Design
- Make modifications configurable via Inspector
- Provide clear Title and description
- Use appropriate ExecutionPlacement
- Handle edge cases (null checks, missing components)
- Log important operations for debugging

### Testing
- Test with small scenes first
- Verify modifications work at all necessary execution placements
- Check results in SubScene files after creation
- Test in Play Mode and builds
- Validate with various scene types

## Common Use Cases

### Mesh Combining Example

```csharp
public override void PrepareModification(GameObject sectionParent)
{
    var meshFilters = sectionParent.GetComponentsInChildren<MeshFilter>();
    var combine = new CombineInstance[meshFilters.Length];

    for (int i = 0; i < meshFilters.Length; i++)
    {
        combine[i].mesh = meshFilters[i].sharedMesh;
        combine[i].transform = meshFilters[i].transform.localToWorldMatrix;
    }

    var combinedMesh = new Mesh();
    combinedMesh.CombineMeshes(combine);

    // Apply combined mesh
    var meshFilter = sectionParent.AddComponent<MeshFilter>();
    meshFilter.mesh = combinedMesh;
}
```

### Component Cleanup Example

```csharp
public override GameObject ApplyModification(GameObject gObject)
{
    // Remove unnecessary components
    if (gObject.TryGetComponent<Collider>(out var collider))
    {
        DestroyImmediate(collider);
    }

    if (gObject.TryGetComponent<Rigidbody>(out var rb))
    {
        DestroyImmediate(rb);
    }

    return gObject;
}
```

## See Also

- [Operation Engine](/editor-guide/engines/operation-engine) - Major process execution
- [SubScene Creation](/processes/process-subscenes) - When modifications run
- [Standard Workflow](/getting-started/standard-workflow) - Complete setup guide

<a id="doc-11-operation-engine"></a>

### 11. Operation Engine

The **Operation Engine** is the execution framework that performs major tasks in ProStream. While [Modifications](/editor-guide/engines/modification-engine) enhance and transform data during processes, **Operations** are the actual processes themselves.

## Overview

Operations are multi-step procedures that orchestrate major processes such as:
- Prepare Scene (currently triggered by **Calculate Positions**)
- Create SubScenes
- Reset Scene
- Track Prefabs / tracker refresh operations

### Operations vs Modifications

| Aspect | Operations | Modifications |
|--------|-----------|---------------|
| **Purpose** | Execute major processes | Transform/enhance data |
| **Scope** | Entire workflows | Specific stages |
| **Execution** | Triggered explicitly | Run during operations |
| **Examples** | Prepare Scene, Create SubScenes, Reset Scene | Remove/disable components, LOD/material adjustments |
| **Complexity** | High (multi-phase) | Low to Medium (focused) |

## Built-in Operations

### GenerateLocationDataOp
**Purpose:** Prepare scene data (matching + spatial data) before SubScene creation

**What it does:**
- Applies all enabled match rules
- Assigns objects to sections
- Creates QuadTree spatial grid
- Generates ObjectSectionDetails
- Builds QuadSubSceneData

**Trigger:** **Calculate Positions** button

**Documentation:** [Prepare Scene Process](/processes/prepare-scene)

### CreateSubScenesOp
**Purpose:** Create SubScene asset files

**Workflow-specific implementations:**
- `CreateGameObjectSubScenesOp` - For standard GameObject workflow
- `CreateDataObjectSubScenesOp` - For DataObject workflow
- `CreateInstanceObjectSubSceneWorkflow` - For InstanceObject workflow

**What it does:**
- Creates SubScene asset files
- Generates section hierarchies
- Clones and organizes objects
- Executes modifications at various stages
- Finalizes and saves SubScenes

**Trigger:** "Create SubScenes" button

**Documentation:** [SubScene Creation Process](/processes/process-subscenes)

### ResetSceneOp
**Purpose:** Reset scene to pre-processing state

**What it does:**
- Removes SubScene GameObjects
- Clears generated data
- Resets SceneConnector state
- Optionally deletes SubScene assets
- Returns scene to clean state

**Trigger:** "Reset Scene" button

**Use Case:**
- Start over with different configuration
- Clean up after testing
- Remove broken SubScene setup

### TrackPrefabsOp
**Purpose:** Refresh prefab/tracker relationships used by matching and setup

**What it does:**
- Scans scene for prefab instances
- Updates tracking state for matching workflows

**Trigger:** Automatic during setup

## Operation Execution Flow

### Typical Operation Structure

```
Operation Triggered (Button Click / Event)
    ↓
PrepareOperation()
    - Validate parameters
    - Initialize data structures
    - Perform pre-checks
    ↓
PerformOperation()
    - Execute main logic
    - Call sub-processes
    - Run modifications at appropriate stages
    - Handle errors/cancellation
    ↓
Finalize
    - Save results
    - Update state
    - Trigger callbacks
    - Clean up resources
    ↓
Complete
```

### Integration with Modifications

Operations call modifications at specific execution placements:

```csharp
// Before main operation
RunModifications(ExecutionPlacement.BeforePositionCalculation);

// Main operation logic
PerformCalculations();

// After main operation
RunModifications(ExecutionPlacement.AfterPositionCalculation);
```

During Create SubScenes, common placements also include:
- `BeforeSubSceneCreation`
- `BeforeMoveToSubScene`
- `AfterMoveToSubScene`
- `BeforeCloseSubScenes`
- `AfterCloseSubScenes`

## Creating Custom Operations

Custom operations are advanced and typically not needed for most users. If you need custom workflow behavior, consider using [Modifications](/editor-guide/engines/modification-engine) instead.

## Progress Reporting

Operations report progress through:
- Progress bars in ProStream Editor
- Console log messages
- Status updates in UI

## Error Handling

Operations handle errors gracefully:
- Validation before execution
- Try-catch blocks around critical sections
- Rollback on failure when possible
- Clear error messages in console

## See Also

- [Modification Engine](/editor-guide/engines/modification-engine) - Extend operation behavior
- [Prepare Scene](/processes/prepare-scene) - GenerateLocationDataOp details
- [SubScene Creation](/processes/process-subscenes) - CreateSubScenesOp details

<a id="doc-12-validation-and-diagnostics"></a>

### 12. Validation and Diagnostics

ProStream includes validation and diagnostics tools to catch scene issues before conversion and runtime.

## ValidationEngine (Pipeline Validation)

`ValidationEngine` runs during **Calculate Positions** when validation checks are enabled in settings.
It validates tracked objects and reports errors/warnings before you proceed.

### Enabling Validation

Validation settings are found in the **Settings Panel** under the **Search/Match** tab:

**Settings:**
- **Check for basic issues** - Fast scan for common problems
- **Check for advanced issues** - Deeper analysis (slower)

::: tip
Current package defaults initialize both options as enabled. Teams may still override per-scene settings.
:::

### Basic Issues Checked

When **Check for basic issues** is enabled, current validators include:

| Issue | Description |
|-------|-------------|
| Missing Materials | Renderer with null/missing material references |
| Invalid MeshCollider Setup | MeshCollider missing shared mesh |
| Invalid Bounds | Invalid or zero bounds on non-particle objects |
| Invalid Scale | Negative, zero, tiny, NaN, or Infinity scale values |

### Advanced Issues Checked

When **Check for advanced issues** is enabled, shader compatibility checks are added (SRP-dependent):

| Issue | Description |
|-------|-------------|
| Shader Compatibility | Detects shaders/materials incompatible with DOTS/SRP conversion/runtime |

### Validation Results

After validation completes, results are displayed in the Console:

```
Validation completed: All 452 objects passed validation
```

Or if issues are found:

```
Validation found 3 critical errors and 12 warnings
```

::: danger
**Critical errors** indicate objects that will likely fail during SubScene conversion or at runtime. Address these before proceeding.

**Warnings** indicate potential issues that may or may not cause problems depending on your setup.
:::

If issues are found, ProStream can prompt you to continue or cancel the process.

## ProStreamDiagnostics (Ad-hoc Diagnostics)

The diagnostics window provides on-demand checks outside the normal workflow.

### Opening Diagnostics

**Keyboard Shortcut:** Press **Alt+Shift+D** to open the diagnostics window.

**Menu:** **Tools → instance.id → ProStream → Diagnostics Window**

### Diagnostic Tools

#### Scene Analysis
- Missing mesh references
- Missing material references
- Missing mesh collider meshes
- Missing scripts
- Non-DOTS shader checks
- Extra LOD-in-prefab checks

### Running Diagnostics

1. Open Diagnostics Window
2. Select diagnostic tool from list
3. Configure options (if any)
4. Click **Run Diagnostic**
5. Review results in output panel

### Diagnostic Results

Results are displayed with:
- **Pass** - No issues found
- **Warning** - Potential issues
- **Error** - Critical issues

## Common Issues and Fixes

### Missing Mesh References

**Issue:** MeshFilter has no mesh assigned

**Fix:**
1. Select the object in hierarchy
2. Assign a mesh in MeshFilter component
3. Or remove the MeshFilter if not needed

### Null Materials

**Issue:** Renderer has null material slots

**Fix:**
1. Select the object
2. Assign materials to all slots in Renderer
3. Or remove unused material slots

### Incompatible Shaders

**Issue:** Shader not compatible with DOTS/Entities

**Fix:**
1. Replace with DOTS-compatible shader
2. Use URP/HDRP Lit shader
3. Or create custom DOTS shader

### Broken Prefab Connections

**Issue:** Prefab instance disconnected from asset

**Fix:**
1. Select the object
2. Use **GameObject → Prefab → Revert** to reconnect
3. Or delete and re-instantiate prefab

## Best Practices

### Run Validation Early

- Enable validation during initial setup
- Fix issues before Calculate Positions
- Prevents problems during SubScene creation

### Regular Checks

- Run diagnostics after major scene changes
- Validate before creating SubScenes
- Check after importing new assets

### Document Issues

- Note recurring issues
- Create custom validation rules if needed
- Share findings with team

### Automated Validation

Consider enabling validation in your workflow:
- Pre-commit hooks
- CI/CD pipeline checks
- Automated testing

## See Also

- [Troubleshooting](/troubleshooting/troubleshooting) - Common issues and solutions
- [Standard Workflow](/getting-started/standard-workflow) - Complete setup guide
- [Requirements](/getting-started/requirements) - Setup requirements

## Processes

<a id="doc-13-prepare-scene"></a>

### 13. Prepare Scene

`Prepare Scene` is the core preprocessing step in the ProStream workflow. In current UI this step is still triggered by **Calculate Positions**, but the process prepares all matching/spatial data needed for SubScene creation.

## Overview

This is a multi-phase process that:
- validates workflow prerequisites,
- applies enabled match rules,
- builds spatial data (QuadTree/subscene data),
- and updates scene progress for the next stage.

## When to Use

**Prerequisites:**
- Scene setup is complete (SceneConnector added)
- At least one SceneSearchFilter is configured
- At least one match rule is enabled
- Layer/section configuration is complete

**Trigger:** Click **Calculate Positions** in the ProStream Editor setup flow.

::: tip
This page documents the process name as **Prepare Scene**. In code/events, this is still associated with `ProcessType.CalculateLocations` and `GenerateLocationDataOp`.
:::

## What It Does

### Phase 1: Workflow Object Checking
- Validates workflow-specific requirements
- Prepares internal data structures
- Checks for configuration issues

### Phase 2: Validation (Optional)
- Runs ValidationEngine when enabled in Settings
- Scans for compatibility issues (materials/colliders/bounds/scale and optional shader checks)
- Reports errors and warnings to console
- See [Validation & Diagnostics](/editor-guide/tools/validation-diagnostics) for details

### Phase 3: Rule Matching (CORE)
- Applies all enabled match rules in priority order
- Categorizes GameObjects into sections
- Marks objects as matched/unmatched
- Assigns section IDs (Ground, LargeObjects, etc.)

### Phase 4: Spatial Calculation
- Creates QuadTree grid based on scene bounds
- Assigns objects to spatial cells
- Calculates data for each future SubScene
- Generates ObjectSectionDetails
- Builds QuadSubSceneData structures

### Phase 5: Finalization
- Validates all calculated data
- Runs validation groups
- Updates progress state
- Marks process as complete

## Process Flow

```
User Clicks "Calculate Positions" (Prepare Scene)
    ↓
Display Progress UI
    ↓
PreCheck Validation
    ├── Check for SceneSearchFilters
    ├── Check for enabled rules
    └── Check for layer data
    ↓
Clear Previous Data
    ├── Remove Selection Groups
    └── Clear Setup Data
    ↓
Schedule ProcessType.CalculateLocations Event
    ↓
ProcessRunner Handles Event
    ↓
Set HierarchyUpdateInProgress Flag
    ↓
Run BeforePositionCalculation Modifications (Optional)
    ↓
GenerateLocationDataOp.PerformOperation()
    │
    ├── PHASE 1: Workflow Object Checking
    │   └── Validate workflow-specific objects
    │
    ├── PHASE 2: Validation (if enabled)
    │   ├── Run ValidationEngine
    │   └── Report errors/warnings
    │
    ├── PHASE 3: Rule Matching ⭐ CRITICAL
    │   ├── CheckManualMatches (MatchByComponent)
    │   ├── CheckCustomMatches (Custom rules)
    │   ├── CheckSearchQueryMatches (Primary matching)
    │   ├── CheckGoQLMatches (GameObject Query Language)
    │   └── ApplyDefaultMatchRule (Unmatched objects)
    │
    ├── PHASE 4: Spatial Calculation
    │   ├── Calculate scene bounds
    │   ├── Generate QuadTree grid
    │   ├── Assign objects to cells
    │   ├── Generate ObjectSectionDetails
    │   └── Build QuadSubSceneData
    │
    └── PHASE 5: Finalization
        ├── Run validation groups
        ├── Update progress state
        └── Mark PositionCalculated = true
    ↓
Complete - Ready for SubScene Creation
```

## Rule Matching System (Phase 3)

This is the **most important phase** - it determines which objects go into which streaming layers/sections.

### Rule Processing Order

Rules are processed in this order:

1. **Manual Matches (MatchByComponent)**
   - Objects with explicit section assignment
   - Component: `MatchByComponent`
   - Highest priority - overrides other rules

2. **Custom Matches**
   - User-defined custom C# rules
   - Category: `RuleProcessor.Custom`
   - Evaluated before query-based rules

3. **Search Query Matches (Primary)**
   - Unity Search Query system
   - Category: `MatchBySearchQuery`
   - **Most commonly used**
   - Examples: `t:MeshRenderer`, `ref:MyPrefab`

4. **GameObject Query Language (GoQL)**
   - Advanced query syntax
   - Category: `MatchByGOQLRule`
   - More complex queries

5. **Default Match Rule (Fallback)**
   - Applied to any remaining unmatched objects
   - Ensures no objects are missed
   - Configurable default section

### Match Result

When an object matches a rule:
- `MatchTracker.IsMatched` = true
- `MatchTracker.SectionId` = assigned section (e.g., "LargeObjects")
- Object is added to that section's object list
- Processing stops for that object (first match wins)

## Spatial Calculation (Phase 4)

### QuadTree Generation

ProStream divides the prepared scene data into QuadTree cells:

**Process:**
1. Calculate scene bounds (min/max positions of all objects)
2. Determine grid size based on object density
3. Create QuadTree cells based on data/scene scale
4. Assign each object to its cell based on position

**Example Grid:**
```
Scene divided into 4x4 grid (16 cells):

[0,3] [1,3] [2,3] [3,3]
[0,2] [1,2] [2,2] [3,2]
[0,1] [1,1] [2,1] [3,1]
[0,0] [1,0] [2,0] [3,0]

Each cell becomes source data for SubScene creation
```

### ObjectSectionDetails

For each matched object, ProStream creates an `ObjectSectionDetails` record:

**Properties:**
- GameObject reference
- World position
- Section ID (layer)
- QuadTree cell coordinates
- Prefab reference
- Match rule that matched it

### QuadSubSceneData

For each QuadTree cell, ProStream creates `QuadSubSceneData`:

**Properties:**
- Cell coordinates (x, y)
- Center position
- List of objects in this cell
- Section breakdown (how many in each layer)
- Bounds information

## Console Output

During execution, you'll see progress in the Console:

```
[ProStream] Starting Prepare Scene (Calculate Positions)
[ProStream] Phase 1: Workflow Object Checking - Complete
[ProStream] Phase 2: Validation - Skipped (disabled)
[ProStream] Phase 3: Rule Matching
  - Manual Matches: 0 objects
  - Custom Matches: 0 objects
  - Search Query Matches: 245 objects
  - GoQL Matches: 0 objects
  - Default Matches: 12 objects
  - Total Matched: 257 objects
[ProStream] Phase 4: Spatial Calculation
  - Scene Bounds: (-500, -500) to (500, 500)
  - QuadTree Size: 8x8 (64 cells)
  - Objects Assigned: 257
[ProStream] Phase 5: Finalization - Complete
[ProStream] Prepare Scene complete in 2.34s
```

## Common Issues

**No objects matched**
- Check that rules are enabled
- Verify search queries are correct
- Ensure objects are under search filters
- Test queries in Unity Search window

**Objects matched to wrong section**
- Check rule priority order
- Verify rule configuration
- Ensure first matching rule is correct

**QuadTree too large/small**
- Adjust scene bounds manually if needed
- Check object positions are reasonable
- Verify no objects at extreme coordinates

**Process fails with errors**
- Check Console for specific error messages
- Verify all prerequisites are met
- Try running validation first
- See [Troubleshooting](/troubleshooting/troubleshooting)

## Performance Considerations

**Rule Complexity**
- Simple rules are faster
- Complex search queries take longer
- Limit number of active rules

**Object Count**
- More objects = longer processing
- Consider splitting very large scenes
- Use search filters to limit scope

**Validation**
- Disable validation for faster processing
- Enable only when needed
- Advanced validation is slower

## After Completion

Once Prepare Scene completes successfully:

1. Objects are categorized into sections
2. Spatial data is calculated
3. Scene is ready for SubScene creation
4. You can proceed to "Create SubScenes"

::: tip
You can re-run this step anytime to:
- Apply new rules
- Adjust layer assignments
- Recalculate spatial data
- Test different configurations
:::

## See Also

- [Rule Engine](/editor-guide/engines/rule-engine) - Configure matching rules
- [Streaming Layers](/core-concepts/streaming-layers) - Configure layer distances
- [SubScene Creation](/processes/process-subscenes) - Next step in workflow
- [Standard Workflow](/getting-started/standard-workflow) - Complete guide

<a id="doc-14-subscene-creation"></a>

### 14. SubScene Creation

SubScene Creation is the final major step in the ProStream workflow. After **Prepare Scene** (triggered by Calculate Positions), this process creates physical `.unity` scene files for spatial cells, organizes cloned objects into sections, and prepares runtime streaming data.

## Overview

This is an **automated process** that handles asset creation, object cloning, hierarchy organization, and scene management.

## When to Use

**Prerequisites:**
- Scene setup is complete
- Search filters are configured
- Match rules are enabled
- **Prepare Scene (Calculate Positions) has completed successfully**

**Trigger:** Click the **"Create SubScenes"** button in the ProStream Editor after positions are calculated.

## What It Does

### 1. SubScene Asset Creation
- Creates a `.unity` scene file for each QuadTree cell
- Organizes assets in `Assets/SubScene_Assets/{SceneName}/Entity/`
- Registers files with Unity's AssetDatabase
- Links SubScene components to scene assets

### 2. Section Hierarchy Creation
- Creates section GameObjects within each SubScene (e.g., "Section_Ground", "Section_LargeObjects")
- Adds `SubSceneSection` component (ProStream)
- Adds `SceneSectionAuthoring` component (Unity Entities)
- Configures section indices for distance-based streaming

### 3. Object Cloning & Organization
- Clones matched GameObjects from main scene
- Parents clones to appropriate section hierarchies
- Preserves hierarchy relationships
- Removes "(Clone)" suffix from names

### 4. Modification Execution
- Runs enabled modifications at various stages
- Examples: mesh combining, LOD setup, material optimization
- Configurable execution timing (before copy, per section, after move, etc.)

### 5. Scene Reload & Cleanup
- Finalizes scene/subscene data and marks scene progress
- Ensures StreamingManager runtime references are configured
- Prepares scene for play mode testing

## Process Flow

```
User Clicks "Create SubScenes" Button
    ↓
PreCheck Validation
    ↓
Create SubScene Assets (Batch)
    ├── For Each QuadTree Cell:
    │   ├── Generate SubScene Name
    │   ├── Create SubScene GameObject
    │   ├── Create Directory Structure
    │   ├── Create Scene File (.unity)
    │   └── Register with AssetDatabase
    ↓
Open All SubScenes (Additive)
    ↓
Process Each SubScene
    ├── Create Section Hierarchies
    │   ├── Section_Ground (index 0)
    │   ├── Section_LargeObjects (index 1)
    │   └── Section_SmallObjects (index 2)
    │
    ├── Clone Objects to Sections
    │   ├── Get objects for this QuadTree cell
    │   ├── Check MatchTracker.SectionId
    │   ├── Clone to correct section parent
    │   └── Store cloned references
    │
    ├── Run Modifications
    │   ├── BeforeObjectCopy
    │   ├── PerSection
    │   ├── BeforeMoveToSubScene
    │   └── AfterMoveToSubScene
    │
    └── Move Section Hierarchies to SubScene
        └── SceneManager.MoveGameObjectToScene()
    ↓
Close All SubScenes
Save Main Scene / asset state
    ↓
Finalize streaming state
    ↓
Complete - Ready for Play Mode
```

## SubScene Hierarchy Structure

**Main Scene After Creation:**
```
MyScene.unity
├── SceneConnector
├── SubSceneRoot
│   ├── MyScene_Quad_0_0 (SubScene GameObject)
│   ├── MyScene_Quad_0_1 (SubScene GameObject)
│   ├── MyScene_Quad_1_0 (SubScene GameObject)
│   └── ... (more SubScenes)
└── [Original GameObjects remain unless your workflow/modifications move/remove them]
```

**Individual SubScene File (MyScene_Quad_0_0.unity):**
```
MyScene_Quad_0_0.unity
├── Section_Ground (SectionIndex = 0)
│   ├── Rock_001 (cloned from main scene)
│   ├── Rock_002 (cloned from main scene)
│   ├── Terrain_Chunk (cloned from main scene)
│   └── ... (more ground objects)
│
├── Section_LargeObjects (SectionIndex = 1)
│   ├── Building_001 (cloned from main scene)
│   ├── Tree_Large_001 (cloned from main scene)
│   └── ... (more large objects)
│
└── Section_SmallObjects (SectionIndex = 2)
    ├── Prop_001 (cloned from main scene)
    ├── Grass_Patch_001 (cloned from main scene)
    └── ... (more small objects)
```

## Key Components

### SubScene GameObject
**Components:**
- `SubScene` (Unity Entities) - Links to scene asset
- `SubSceneDataComponent` (ProStream) - Metadata and references

**Properties:**
- Position: World position of QuadTree cell center
- SceneAsset: Reference to .unity file
- AutoLoadScene: Whether to load automatically

### Section GameObject
**Components:**
- `SubSceneSection` (ProStream) - Section metadata
- `SceneSectionAuthoring` (Unity Entities) - ECS conversion data

**Properties:**
- SectionIndex: Unique identifier (0, 1, 2, etc.)
- SectionName: Layer name (Ground, LargeObjects, etc.)
- LoadingRange: Layer-driven start/end range used by streaming systems

## Asset Organization

SubScene files are organized in a structured directory:

```
Assets/
└── SubScene_Assets/
    └── MyScene/
        └── Entity/
            ├── MyScene_Quad_0_0.unity
            ├── MyScene_Quad_0_1.unity
            ├── MyScene_Quad_1_0.unity
            └── ... (more SubScene files)
```

## Modification Execution Points

Modifications can run at various stages during SubScene creation:

1. **BeforeSubSceneCreation** - Before any assets are created
2. **BeforeMoveToSubScene** - Before moving section content to SubScene scenes
3. **AfterMoveToSubScene** - After objects are moved into SubScene scenes
4. **BeforeCloseSubScenes** - Before additive SubScene close/save stage
5. **AfterCloseSubScenes** - After close/finalize stage

See [Modification Engine](/editor-guide/engines/modification-engine) for details.

## Console Output

During execution, you'll see progress in the Console:

```
[ProStream] Starting SubScene Creation
[ProStream] Creating 16 SubScene assets...
[ProStream] SubScene assets created
[ProStream] Opening SubScenes additively...
[ProStream] Processing SubScene: MyScene_Quad_0_0
  - Creating section hierarchies...
  - Cloning 23 objects...
  - Running modifications...
  - Moving to SubScene file...
[ProStream] Processing SubScene: MyScene_Quad_0_1
  ...
[ProStream] Closing SubScenes...
[ProStream] Finalizing streaming state...
[ProStream] SubScene Creation Complete in 12.5s
```

## Common Issues

**SubScene files not created**
- Check Console for errors
- Verify Prepare Scene completed
- Ensure write permissions in Assets folder
- Check disk space

**Objects not appearing in SubScenes**
- Verify objects were matched during Prepare Scene
- Check MatchTracker.IsMatched is true
- Ensure objects are prefabs
- Open SubScene files manually to inspect

**Finalization fails**
- Save scene before running process
- Close other scenes first
- Check for compilation errors
- Try restarting Unity

**StreamingManager not created**
- Check if already exists in scene
- Verify SubScene creation completed
- Look for errors in Console

## Performance Considerations

**Processing Time**
- More objects = longer processing
- Complex modifications increase time
- Large scenes may take several minutes

**Memory Usage**
- All SubScenes are opened during processing
- Large scenes may require significant memory
- Close other applications if needed

**Disk Space**
- Each SubScene is a separate file
- Large scenes create many files
- Ensure adequate disk space

## After Completion

Once SubScene Creation completes successfully:

1. SubScene files are created
2. Objects are organized into sections
3. Streaming state is marked ready for runtime systems
4. Scene is ready for Play Mode testing

## Testing in Play Mode

1. Enter Play Mode
2. Move camera/player around scene
3. Watch SubScenes load/unload in Hierarchy
4. Monitor performance in Profiler

## Rebuilding SubScenes

To rebuild SubScenes after changes:

1. Delete existing SubScene files (optional)
2. Adjust configuration (rules, layers, etc.)
3. Re-run Prepare Scene (Calculate Positions)
4. Re-run Create SubScenes

::: warning
Creating SubScenes will overwrite existing SubScene files. Make backups if you've made manual changes to SubScene files.
:::

## See Also

- [Prepare Scene](/processes/prepare-scene) - Previous step in workflow
- [Runtime Streaming](/runtime-systems/runtime-streaming) - How streaming works at runtime
- [Modification Engine](/editor-guide/engines/modification-engine) - Customize SubScene creation
- [Standard Workflow](/getting-started/standard-workflow) - Complete guide

## Runtime Systems

<a id="doc-15-runtime-streaming"></a>

### 15. Runtime Streaming

ProStream runtime streaming uses DOTS systems plus managed helpers to load and unload scene content based on distance from a loading trigger.

## Overview

At runtime, ProStream supports two streaming paths:
- **Entity SubScene streaming** (ECS section load/unload using `RequestSceneLoaded`)
- **GameObject SubScene streaming** (managed `GameObjectSceneStreamingManager` + ECS systems)

Streaming only works after editor preparation is complete:
1. Scene setup
2. Search filters and enabled rules
3. Calculate Positions
4. Create SubScenes

If SubScenes were not created, there is nothing to stream.

## Key Runtime Components

- **StreamingManager**: scene bridge holding trigger/layer references and runtime toggles.
- **StreamingSystemsInitializer**: writes per-frame `StreamingSystemsConfig` (trigger position and flags).
- **SubSceneStreamingSetupSystem**: validates readiness and prepares ECS data (`LayerLoadingRanges`, bounds, setup singleton).
- **SubSceneLoadingSystem**: schedules `SubSceneLoadingJob` to add `RequestSceneLoaded`.
- **SubSceneUnloadingSystem**: schedules `SubSceneUnloadingJob` to remove `RequestSceneLoaded`.
- **GameObjectSceneLoadingSystem / GameObjectSceneUnloadingSystem**: load/unload GO SubScenes.

## System Gating (Important)

Entity streaming systems require setup singletons/components to exist before they run:
- `UseStreamingSystems`
- `StreamingSystemsConfig`
- `StreamingSetupComplete`
- `LayerLoadingRanges`

If these are missing, loading/unloading systems will not update.

## Distance Model

For Entity SubScenes, ProStream uses section bounds (`AABB`) and computes distance from trigger position to the closest point on the bounds.

### Loading check

`SubSceneLoadingJob` loads when distance is inside the configured range:
- `distance >= loadingStartDistance`
- `distance < loadingEndDistance`

Sections marked `persistent` are always loaded.

### Unloading check

`SubSceneUnloadingJob` unloads when outside the end range with a multiplier buffer:
- `adjustedEndDistance = loadingEndDistance * UnloadBufferMultiplier`

Current initializer value is `1.05f`.

## StreamingManager (User-facing)

`StreamingManager` is created/used during SubScene creation workflow and provides:
- Loading trigger reference
- Section collection (`LayerData`)
- Runtime toggles for entity and GO streaming

Exposed toggles include:
- `enableEntitySubScenes`, `enableLoading`, `enableUnloading`
- `enableGOSubScenes`, `enableGOLoading`, `enableGOUnloading`

Inspector fields include:
- **Loading Trigger**
- **Section Collection** (`LayerData`)
- Streaming status labels

## Runtime Lifecycle

High-level play mode flow:
1. Setup/initializer systems verify scene readiness (`StreamingReady`, trigger, layer data, SubScene data).
2. Streaming config is updated each frame with trigger position and load/unload flags.
3. Loading/unloading systems evaluate ranges and queue component changes.
4. Unity processes scene load state asynchronously.

## Troubleshooting Quick Checks

If sections do not stream:
1. Verify SubScenes were created successfully.
2. Verify `StreamingManager` exists and has Trigger + LayerData.
3. Verify scene progress reached `StreamingReady`.
4. Verify layer loading ranges are set for your scene scale.
5. Check Console for streaming setup/system warnings.

If loading/unloading feels unstable near boundaries:
1. Increase layer end distance.
2. Account for unload buffer multiplier behavior.

If GO SubScenes work in editor but not build:
1. Check that GO SubScene scenes are included in Build Settings.

## See Also

- [Streaming Layers](/core-concepts/streaming-layers) - Configure distance ranges
- [SubScene Creation](/processes/process-subscenes) - Build SubScenes used at runtime
- [Standard Workflow](/getting-started/standard-workflow) - End-to-end setup flow
- [Troubleshooting](/troubleshooting/troubleshooting) - Common runtime issues

## Troubleshooting

<a id="doc-16-common-issues"></a>

### 16. Common Issues

Common issues and solutions for ProStream.

## Setup Issues

### Scene must be saved before setup

**Issue:** Setup button shows "Scene must be saved" message

**Solution:** ProStream requires scenes to be saved to disk before setup. Save your scene via **File | Save Scene** first.

### SceneConnector not created after setup

**Issue:** SceneConnector GameObject doesn't appear after clicking Setup

**Check:**
- Setup completed without errors in Console
- Check the Console for any errors during setup
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

**Solution:** Add Scene Search Filters. Use **Add Search Filters** in ProStream Editor and select root GameObjects that contain your prefab hierarchies.

Typical message:
`No SearchFilter Objects have been added.`

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

**Solution:** Ensure there is at least one valid enabled rule in your scene rule list. Open **Scene Match Rules > Rule Editor** and enable/configure rules.

Typical message:
`No Rules found in the scene.`

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

## Prepare Scene Issues

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
- Prepare Scene completed successfully
- SubScene creation completed successfully
- Open SubScene `.unity` files manually to verify objects are inside
- Check Console for errors during creation
- Verify objects were matched during Prepare Scene

### SubScene files not created

**Issue:** No `.unity` files in SubScene_Assets folder

**Check:**
- Prepare Scene was run first
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
- Run diagnostics separately using Diagnostics Window

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

You may also see:
`No SearchFilter Objects have been added.`

### "No enabled rules found"

**Solution:** Enable at least one valid rule in Rule Editor

You may also see:
`No Rules found in the scene.`

### "Prepare Scene not complete"

**Solution:** Run Calculate Positions before Create SubScenes

### "Failed to create SubScene asset"

**Solution:** Check write permissions and disk space

### "Loading trigger not assigned"

**Solution:** Assign player/camera to StreamingManager's Loading Trigger field

## Getting Help

If you're still experiencing issues:

1. **Check Console** - Most errors have detailed messages
2. **Run Diagnostics Window** - Use targeted diagnostics for missing meshes/materials/scripts/shaders
3. **Review Documentation** - Check relevant sections
4. **Verify Requirements** - Ensure all requirements are met
5. **Test with Simple Scene** - Reproduce issue in minimal setup

## See Also

- [Requirements](/getting-started/requirements) - Setup requirements
- [Standard Workflow](/getting-started/standard-workflow) - Complete guide
- [Validation & Diagnostics](/editor-guide/tools/validation-diagnostics) - Validation tools
- [Runtime Streaming](/runtime-systems/runtime-streaming) - Runtime behavior

<a id="doc-17-build-and-runtime"></a>

### 17. Build and Runtime

Common issues related to the build process and runtime behavior.

## No Objects In Game

**Issue:** After performing a build, no objects appear in the game

**Cause:** The SRP (Scriptable Render Pipeline) asset is not assigned in build settings

### Solution

Ensure that an SRP asset is assigned in the following locations:

#### 1. Project Settings - Graphics

**Path:** **Edit > Project Settings > Graphics**

**Setting:** Scriptable Render Pipeline Settings

Assign your URP or HDRP asset here.

#### 2. Project Settings - URP Global Settings

**Path:** **Edit > Project Settings > Graphics > URP Global Settings**

![URP Global Settings](/images/ts_settings_srp_global_asset.png)

Ensure the URP Global Settings asset is assigned.

#### 3. Project Settings - Quality

**Path:** **Edit > Project Settings > Quality**

**Setting:** Rendering (for each quality level)

![Quality Settings](/images/ts_settings_srp_quality_asset.png)

Assign the appropriate SRP asset for each quality level you're using.

### Verification Steps

1. Open **Edit > Project Settings > Graphics**
2. Check that "Scriptable Render Pipeline Settings" has an asset assigned
3. Open **Edit > Project Settings > Quality**
4. For each quality level, verify "Rendering" has an asset assigned
5. Rebuild your project
6. Test the build

## Runtime Streaming Issues

### Objects Not Loading

**Issue:** SubScenes don't load during gameplay

**Check:**
- StreamingManager exists in scene
- Loading Trigger is assigned
- Streaming is enabled in StreamingManager
- Layer distances are configured
- SubScene files exist in build

### Objects Loading Incorrectly

**Issue:** Wrong objects load or objects appear in wrong places

**Check:**
- SubScene creation completed successfully
- No errors during build process
- SubScene files are included in build
- Entity conversion completed properly

### Performance Issues in Build

**Issue:** Build runs slower than expected

**Check:**
- Burst compilation is enabled
- IL2CPP is used (not Mono)
- Incremental GC is enabled
- Profiler shows no unexpected bottlenecks

## Build Process Issues

### Build Fails

**Issue:** Unity build process fails with errors

**Common Causes:**
- Missing SRP assets
- Entities package not properly installed
- SubScene files corrupted
- Insufficient disk space

**Solutions:**
1. Check Console for specific errors
2. Verify all packages are installed correctly
3. Clean build folder and rebuild
4. Verify SubScene files are valid

### Build Size Too Large

**Issue:** Build is larger than expected

**Possible Causes:**
- All SubScenes included even if not used
- Debug symbols included
- Uncompressed assets

**Solutions:**
- Enable compression in build settings
- Remove unused SubScenes
- Use IL2CPP with code stripping
- Optimize asset compression

## Entity Conversion Issues

### Conversion Errors

**Issue:** Errors during entity conversion in build

**Check:**
- All prefabs are DOTS-compatible
- Shaders are compatible with SRP Batcher
- No unsupported components
- Validation was run before building

### Missing Components in Build

**Issue:** Components present in Editor but missing in build

**Cause:** Components not compatible with entity conversion

**Solution:**
- Run validation before building
- Check component compatibility
- Use DOTS-compatible alternatives
- See [Validation & Diagnostics](/editor-guide/tools/validation-diagnostics)

## Platform-Specific Issues

### Mobile Builds

**Issues:**
- Memory constraints
- Loading performance
- Graphics compatibility

**Solutions:**
- Reduce SubScene sizes
- Lower quality settings
- Use mobile-optimized shaders
- Test on target devices early

### Console Builds

**Issues:**
- Platform-specific rendering
- Memory management
- Input handling

**Solutions:**
- Follow platform-specific Unity guidelines
- Test on actual hardware
- Optimize for platform constraints

## Debugging Builds

### Enable Development Build

1. Open **File > Build Settings**
2. Enable "Development Build"
3. Enable "Script Debugging" (optional)
4. Build and run

### Check Logs

**Windows:** `%USERPROFILE%\AppData\LocalLow\CompanyName\GameName\Player.log`

**Mac:** `~/Library/Logs/CompanyName/GameName/Player.log`

**Linux:** `~/.config/unity3d/CompanyName/GameName/Player.log`

### Common Log Errors

**"Failed to load SubScene"**
- SubScene file missing from build
- File path incorrect
- Asset bundle issue

**"Entity conversion failed"**
- Incompatible components
- Missing dependencies
- DOTS compatibility issue

## Best Practices for Builds

### Before Building

1. Run Calculate Positions
2. Create SubScenes successfully
3. Test in Editor Play Mode
4. Run validation
5. Verify SRP settings
6. Check build settings

### Build Settings

**Recommended:**
- Scripting Backend: IL2CPP
- API Compatibility: .NET Standard 2.1
- Compression: LZ4 or LZ4HC
- Code Stripping: Enabled (with proper link.xml)

### Testing

1. Test Development Build first
2. Verify streaming works correctly
3. Check performance with Profiler
4. Test on target platform/device
5. Create Release Build only after validation

## See Also

- [Requirements](/getting-started/requirements) - Required settings
- [Troubleshooting](/troubleshooting/troubleshooting) - General issues
- [Runtime Streaming](/runtime-systems/runtime-streaming) - Runtime behavior
- [Validation & Diagnostics](/editor-guide/tools/validation-diagnostics) - Pre-build validation

## Reference

<a id="doc-18-settings-reference"></a>

### 18. Settings Reference

This page documents the settings currently exposed by ProStream in the active Settings Panel UI.

::: tip Opening the Settings Panel
Open via **Tools > instance.id > ProStream > Settings > Panel**, or from the settings icon in ProStream editor UI.
:::

## Settings Panel Tabs

The panel currently provides these primary tabs:

| Tab | Panel | Description |
|-----|-------|-------------|
| **Search/Match** | ObjectMatchingPanel | Validation and search query behavior |
| **Scene/Setup** | SceneSetupPanel | Scene setup and SubScene creation options |

## Search/Match Tab (ObjectMatchingPanel)

These settings affect rule matching and validation during **Calculate Positions**.

### Matching Settings

| Setting | Default | Description |
|---------|---------|-------------|
| Check for basic issues | On | Runs common validation checks during matching (for example missing materials, collider mesh issues, invalid bounds/scale). |
| Check for advanced issues | On | Runs additional shader compatibility checks (SRP-dependent). More expensive but useful for conversion/runtime safety. |

::: tip
See [Validation & Diagnostics](/editor-guide/tools/validation-diagnostics) for detailed information on what each validation level checks.
:::

### Search Keyword Settings

These settings affect how `MatchBySearchQuery` rules match object names.

| Setting | Default | Description |
|---------|---------|-------------|
| Use keyword separation | Off | Adds separator characters around search terms to reduce false positives from fuzzy matching. |
| Keyword separator | `_` | The character used to separate keywords when keyword separation is enabled. |

**Example:**

Without keyword separation:
- Search for `Tree` matches: `Environment_Tree_01` and `City_Street_01` (false positive)

With keyword separation (separator = `_`):
- Search for `Tree` becomes `_Tree_`
- Matches: `Environment_Tree_01` but NOT `City_Street_01`

## Scene/Setup Tab (SceneSetupPanel)

Settings related to SubScene creation and scene preparation.

### SubScene Settings

| Setting | Default | Description |
|---------|---------|-------------|
| Filter GameObjects With Incompatible Shaders | Off | Filters objects with incompatible shaders during SubScene creation. Enabling this requires advanced validation. |
| Include Disabled Objects | Off | Includes disabled objects in creation flow. Disabled objects are not converted to entities. |
| Auto-Load SubScenes In Editor | Project/scene dependent | Automatically loads SubScene entity visual representations in editor. |

### Workflow-Specific Settings

The **Scene/Setup** tab can also show additional foldouts contributed by active workflow components.
Those settings are workflow-dependent and vary by installed modules.

## Layer Configuration

Layer-specific settings are configured in the Layer Editor, not the Settings Panel.

**Access:** SceneConnector Inspector → **Layer Editor** button

**Per-Layer Settings:**
- Load distance (meters)
- Persistent (always loaded)
- Enabled/disabled
- Section index

See [Streaming Layers](/core-concepts/streaming-layers) for details.

## Rule Configuration

Rule-specific settings are configured in the Rule Editor.

**Access:** ProStream Editor → **Scene Match Rules** → **Rule Editor**

**Per-Rule Settings:**
- Enabled/disabled
- Priority (execution order)
- Target layer
- Rule-specific parameters

See [Rule Engine](/editor-guide/engines/rule-engine) for details.

## Modification Configuration

Modification-specific settings are configured on individual modification assets.

**Access:** Select modification asset in Project window

**Per-Modification Settings:**
- Enabled/disabled
- Execution placement
- Execution order
- Modification-specific parameters

See [Modification Engine](/editor-guide/engines/modification-engine) for details.

## Settings Storage

ProStream settings are stored in:
- **Global package settings:** `Packages/id.instance.prostream/AssetFiles/Settings/ProStreamSettings.asset`
- **Scene settings:** `SceneName/SceneData/SceneName_Settings.asset`

In practice, most user workflow settings you edit per scene are stored in the scene settings asset.

## See Also

- [Standard Workflow](/getting-started/standard-workflow) - Using settings in workflow
- [Validation & Diagnostics](/editor-guide/tools/validation-diagnostics) - Validation settings
- [Streaming Layers](/core-concepts/streaming-layers) - Layer configuration
- [Rule Engine](/editor-guide/engines/rule-engine) - Rule configuration

<a id="doc-19-change-log"></a>

### 19. Change Log

Release history and changes for ProStream.

## Version History

::: info
This page will be updated with version-specific changes as new releases are published.
:::

## Latest Changes

### Recent Improvements

- Enhanced scene setup process (no longer requires scene reload)
- Improved rule matching performance
- Better error messages and validation
- Updated documentation

### Bug Fixes

- Fixed UserRuleCollection null reference issues
- Fixed RuleCollectionContainer property getters/setters
- Improved LayerData initialization
- Enhanced asset serialization handling

## Reporting Issues

If you encounter issues or have suggestions:

1. Check the [Troubleshooting](/troubleshooting/troubleshooting) guide
2. Review existing documentation
3. Contact support with detailed information

## See Also

- [Setup](/getting-started/setup) - Getting started
- [Troubleshooting](/troubleshooting/troubleshooting) - Common issues
- [Requirements](/getting-started/requirements) - Requirements

<a id="doc-20-install-and-update"></a>

### 20. Install and Update

Common issues related to installing or updating ProStream.

This page focuses on behavior in the current package line.

## Installation Issues

### Lost References / Missing Scripts

**Issue:** Components show as "Missing Script" after installation

**Cause:** Installing ProStream while a scene with ProStream components is open

**Solution:**
1. Close all scenes before installing
2. Install ProStream
3. Reopen scenes after installation completes
4. If references are still lost, you may need to re-run scene setup

**Prevention:**
- Close scenes before installing packages
- Save all work before installation
- Restart Unity after installation if issues persist

### Package Installation Fails

**Issue:** Unity Package Manager fails to install ProStream

**Common Causes:**
- Network connectivity issues
- Package cache corruption
- Unity version incompatibility
- Insufficient permissions

**Solutions:**
1. Check Unity version meets requirements (package manifest currently targets Unity `2022.3.0f0+`)
2. Clear Package Manager cache
3. Restart Unity
4. Check internet connection
5. Try manual package installation

### Dependencies Not Installed

**Issue:** Required packages (Entities, etc.) not installed automatically

**Solution:**
1. Open Package Manager
2. Ensure required DOTS/SRP dependencies are present for your project configuration
3. Confirm `com.unity.entities.graphics` dependency resolves successfully
4. Restart Unity
5. Re-run ProStream Setup

## Update Issues

### ObjectDisposedException Errors

**Issue:** Constant "UNKNOWN_OBJECT_TYPE has been deallocated" errors after update

**Cause:** Updating ProStream (specifically the Entities package) while a scene with SubScene components is open

**Solution:**
1. Close all scenes
2. Update packages
3. Restart Unity
4. Reopen scenes
5. If errors persist, reimport ProStream

**Prevention:**
- Close scenes before updating
- Backup project before updates

### Settings Lost After Update

**Issue:** ProStream settings reset after update
**Cause:** Settings format changed between versions

**Solution:**
1. Reconfigure settings in Settings Panel
2. Re-run scene setup if needed
3. Check scene-specific settings in SceneSettings asset

### Compilation Errors After Update

**Issue:** C# compilation errors after updating

**Common Causes:**
- ProStream files deleted or moved in new version
- API changes between versions
- Incompatible package versions

**Solutions:**
1. Close Unity
2. Delete the ProStream package folder from `Packages/id.instance.prostream`
3. Open Unity and reimport ProStream

## Version Compatibility

### Unity Version Requirements

| ProStream Version | Minimum Unity Version | Recommended Unity Version |
|-------------------|----------------------|---------------------------|
| Current package line | 2022.3.0f0 | Latest LTS or project-validated version |

### Package Dependencies

Declared package dependency (manifest):
- `com.unity.entities.graphics`

In practice, ProStream workflows also expect compatible DOTS + SRP project setup.

## Best Practices

### Before Installing/Updating

1. Backup your project
2. Close all scenes
3. Save all work
4. Check Unity version compatibility
5. Read release notes

### After Installing/Updating

1. Check Console for errors
2. Verify package installation
3. Test in a simple scene first
4. Reconfigure settings if needed
5. Re-run scene setup if required

### Safe Update Process

1. **Backup Project**
   - Use version control (Git)
   - Or create a complete copy

2. **Close Everything**
   - Close all scenes

3. **Update**
   - Update ProStream package

4. **Verify**
   - Check for errors
   - Test basic functionality
   - Verify existing scenes work

5. **Reconfigure**
   - Check settings
   - Re-run setup if needed

## Troubleshooting Installation

### Setup Window Not Appearing

**Issue:** ProStream setup window doesn't open after import

**Solution:**
1. Open manually from one of these menu items:
   - **Tools > instance.id > ProStream > Setup ProStream**
   - **Tools > instance.id > ProStream > Update ProStream**
2. Check Console for errors
3. Verify package imported correctly
4. Restart Unity

### Setup Hangs

**Issue:** Setup appears to hang during installation

**Solution:**
1. Wait (installation can take several minutes)
2. Check Unity's progress bar
3. Check Console for errors
4. If truly hung, restart Unity and try again

### SRP Not Detected

**Issue:** Setup says SRP not found

**Solution:**
1. Install URP or HDRP via Package Manager
2. Create and assign SRP asset in Project Settings
3. Restart setup
4. See [Requirements](/getting-started/requirements) for details

## Getting Help

If installation/update issues persist:

1. Check [Troubleshooting](/troubleshooting/troubleshooting) guide
2. Verify [Requirements](/getting-started/requirements)
3. Check Unity Console for specific errors
4. Try clean installation:
   - Remove ProStream package
   - Clear Library folder
   - Restart Unity
   - Reinstall ProStream

## See Also

- [Setup](/getting-started/setup) - Setup guide
- [Requirements](/getting-started/requirements) - Requirements
- [Troubleshooting](/troubleshooting/troubleshooting) - General issues

## Script and Systems Reference

The following sections serve as script and systems reference for implementation and configuration details:

- Editor Guide sections
- Runtime Systems section
- Settings Reference section

