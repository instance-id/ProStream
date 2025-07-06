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

Press the "Setup Current Scene" button in the ProStream Editor to add the necessary components to the scene.

![usage_basic_quick_newscene.png](usage_basic_quick_newscene.png){width="500" thumbnail="true"}

This will add [SceneConnector](SceneConnector.md) the following components to the scene:

![scene_connector_object.png](scene_connector_object.png)

    SceneConnector
      SceneConnectorData
      WorkflowContainer
      SceneSearchFilterManager
      SelectionGroupContainer

A new label will be added to the scene to indicate that it is a streaming scene.

![streaming_scene_label.png](streaming_scene_label.png)


</snippet>
