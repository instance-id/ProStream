# ProStream Editor

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
