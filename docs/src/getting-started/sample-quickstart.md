# Sample Project Quickstart

::: info
The focus of this guide is to get you up and running **quickly** with a new Unity project using the ProStream sample package.
:::

:::details Requirements {open}

<!-- Begin Requirements -->
<!--@include: ./requirements.md#requirements-->
<!-- End Requirements -->

:::

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

This process takes the QuadTree structure and <QuickInfo preset="terms.streaming-manager"><code>StreamingManager</code></QuickInfo> from the Prepare Scene phase and creates SubScene asset files, populating them with cloned GameObjects organized by streaming sections. This enables streaming based on player position and distance settings per layer.

## 8) Process Complete

### What Was Created

During the "Create SubScenes" process, the following assets/components were generated:

- **SubScene Asset Files**: Unity SubScene Assets stored in `Assets/SubScene_Assets/Sample/Entity/`
- **SubScene GameObjects**: SubScene GameObjects are located in the hierarchy under the <QuickInfo preset="terms.subscene-root"><code>SubSceneRoot</code></QuickInfo> GameObject
- **StreamingManager**: <QuickInfo preset="terms.streaming-manager"><code>StreamingManager</code></QuickInfo> orchestrates editor and runtime streaming systems

![SubScenes and Components](/images/quick_start/subscenes_and_components.png)

### Next Steps

::: tip Ready to Validate
At this point, the scene is fully configured and ready to use.

You can now play the scene and test the streaming functionality.
:::
