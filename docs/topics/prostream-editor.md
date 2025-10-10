# ProStream Editor

## Access ProStream Editor

## Main Editor Window

<snippet id="prostream_editor_main_window">

![main_ps_editor.png](main_ps_editor.png)

</snippet>


<snippet id="access_prostream_editor_id">

------

To access the ProStream Editor, you can use the following methods:

1. Press `Shift+Alt+P` shortcut to open the ProStream Editor

2. Press the "ProStream Editor" button in the installer

   ![usage_basic_quick_openeditor.png](usage_basic_quick_openeditor.png){width="400" thumbnail="true"}

3. Go to the following Menu path `Tools` → `instance.id` → `ProStream`

   ![u_b_q_openmenu.png](u_b_q_openmenu.png){width="500" thumbnail="true"}

</snippet>

## Setup Scene

<snippet id="prostream_editor_setup_id">

> **Important:** Save your scene before setup. ProStream requires scenes to be saved to disk.
>
> {style="warning"}

Click the <control>Setup Current Scene For ProStream</control> button in the ProStream Editor. The scene will automatically save and reload.

![usage_basic_quick_newscene.png](usage_basic_quick_newscene.png){width="500" thumbnail="true"}

**What happens automatically:**
- Applies "StreamingScene" label to your scene
- Creates asset directory structure in `SceneName/SceneData/`
- Creates ProStream assets (SceneLock, LayerData, SceneSettings, RuleCollection, etc.)
- Creates [SceneConnector](scene-connector.md) GameObject with child components:

![scene_connector_object.png](scene_connector_object.png)

    SceneConnector (automatically created)
      SceneConnectorData
      WorkflowContainer
      SceneSearchFilterManager
      SelectionGroupContainer

The "StreamingScene" label enables ProStream's asset processor:

![streaming_scene_label.png](streaming_scene_label.png)

> **Do not** manually create SceneConnector - it is automatically created by the setup process.
>
> {style="note"}

</snippet>
