# ProStream Editor

The ProStream Editor is the main interface for configuring and managing ProStream in your Unity project.

![ProStream Editor Window](/images/main_ps_editor.png)

## Access ProStream Editor

To access the ProStream Editor, you can use the following methods:

1. Press `Shift+Alt+P` shortcut to open the ProStream Editor

2. Press the "ProStream Editor" button in the installer

   ![Open ProStream Editor](/images/usage_basic_quick_openeditor.png)

3. Go to the following Menu path **Tools → instance.id → ProStream**

   ![Open Menu](/images/u_b_q_openmenu.png)

## Setup Scene

::: warning Important
Save your scene before setup. ProStream requires scenes to be saved to disk.
:::

Click the **Setup Current Scene For ProStream** button in the ProStream Editor. The scene will automatically save and reload.

![Setup Scene Button](/images/usage_basic_quick_newscene.png)

**What happens automatically:**
- Applies "StreamingScene" label to your scene
- Creates asset directory structure in `SceneName/SceneData/`
- Creates ProStream assets (SceneLock, LayerData, SceneSettings, RuleCollection, etc.)
- Creates [SceneConnector](/editor-guide/components/scene-connector) GameObject with child components:

![SceneConnector Object](/images/scene_connector_object.png)

```
SceneConnector (automatically created)
  SceneConnectorData
  WorkflowContainer
  SceneSearchFilterManager
  SelectionGroupContainer
```

The "StreamingScene" label enables ProStream's asset processor:

![Streaming Scene Label](/images/streaming_scene_label.png)

::: tip
Do not manually create SceneConnector - it is automatically created by the setup process.
:::

## Editor Tabs

The ProStream Editor contains multiple tabs for different workflows:

### Scene Tools Tab

- **Setup Current Scene** - Initialize ProStream for the active scene
- **Add Search Filters** - Define which objects to process
- **Setup Match Rules** - Configure rule matching
- **Layer Editor** - Configure streaming distances

### Setup Tab

- **Calculate Positions** - Run rule matching and spatial organization
- **Create SubScenes** - Generate SubScene assets
- **Process Controls** - Start, stop, and monitor processes

### Diagnostics Tab

- **Validation Tools** - Check scene for issues
- **Performance Metrics** - View processing statistics
- **Debug Options** - Enable detailed logging

## Common Workflows

### Initial Setup
1. Open ProStream Editor
2. Click "Setup Current Scene"
3. Wait for scene reload
4. Proceed to configuration

### Configuration
1. Add Search Filters
2. Configure Match Rules
3. Adjust Layer Distances
4. Calculate Positions

### SubScene Generation
1. Review calculated positions
2. Click "Create SubScenes"
3. Wait for processing
4. Test in Play Mode

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Shift+Alt+P` | Open ProStream Editor |
| `Shift+Alt+H` | Open Diagnostics Hub |
| `Ctrl+K` | Unity Search (for testing queries) |

## See Also

- [Standard Workflow](/getting-started/standard-workflow) - Complete setup guide
- [Scene Connector](/editor-guide/components/scene-connector) - Main component reference
- [Rule Engine](/editor-guide/engines/rule-engine) - Configure matching rules
