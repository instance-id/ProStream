# Step 2: Setup Scene for ProStream

<snippet id="step_2_setup_scene">

<procedure title="Setup Scene for ProStream" id="step-2-setup-scene">

<step>

Open the ProStream Editor window: <ui-path>Tools | instance.id | ProStream | ProStream Editor</ui-path>

</step>

<step>

Click the <control>Setup Current Scene</control> button

<img src="usage_basic_quick_newscene.png" alt="Setup Current Scene Button" width="300" thumbnail="true"/> 

- ProStream will apply a "StreamingScene" label to your scene
- The scene will automatically save and reload
- Wait for the process to complete

</step>

**What just happened:**

- ProStream created a [SceneConnector](scene-connector.md) GameObject:

<img src="scene_connector_object.png" alt="SceneConnector GameObject" width="300"/>

<code-block lang="text">
SceneConnector (automatically created)
  SceneConnectorData
  WorkflowContainer
  SceneSearchFilterManager
  SelectionGroupContainer
</code-block>

- Created asset directory structure in <path>SceneName/SceneData/</path>
- Created SceneLock, LayerData, SceneSettings, and RuleCollection assets
- Initialized default layers (Ground, LargeObjects, MediumObjects, SmallObjects, Foliage)
- Applied "StreamingScene" label to enable ProStream's asset processor:

<img src="streaming_scene_label.png" alt="Streaming Scene Label" width="300"/>

- Copied example rules to your scene
- Scene is now ready for configuration

<note>

The scene reload is necessary for ProStream to complete the setup process. This is automatic and takes only a few seconds.

</note>
</procedure>
</snippet>
