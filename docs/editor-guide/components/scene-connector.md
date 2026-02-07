# SceneConnector

The SceneConnector is a component that is used as the main connecting point for the ProStream systems.

::: tip
SceneConnector is **automatically created** when you click "Setup Current Scene For ProStream" in the ProStream Editor. Do not manually create this component.
:::

See [ProStream Editor](/editor-guide/windows/prostream-editor) for setup instructions.

## Loading Trigger

The Loading Trigger position value is used to determine when a SubScene (and layers) loads and unloads from the world. While it is not necessary for the **Loading Trigger** to be a Player Character (it can be a Camera, NPC Object, etc) it is necessary for the loading system to operate properly.

::: info
If this field is left empty, when the system starts, it will attempt to locate and use Camera.main as the Loading Trigger.
:::

## Search Filter

When the Search Filter field is populated, and the RuleEngine Match system runs, matches are restricted to child GameObjects of the Search Filter GameObject.

::: warning
If no GameObjects are assigned to the Search Filter list, the system will attempt to match against all GameObjects in the hierarchy.

This is typically undesired as this could include Cameras, Lighting, Light Probes, etc, and any number of things that you might wish to keep in the main parent scene.
:::

## Component Structure

The SceneConnector GameObject contains several child components:

### SceneConnectorData
Stores runtime data and references for the streaming system.

### WorkflowContainer
Manages the workflow state and process execution.

### SceneSearchFilterManager
Coordinates all Scene Search Filters in the scene.

### SelectionGroupContainer
Manages object selection groups for organization.

## Inspector Fields

### Scene References
- **Scene Lock** - Reference to the PSSceneLock asset
- **Settings** - Reference to SceneSettings asset
- **Scene Layer Data** - Reference to LayerData asset

### Runtime Configuration
- **Loading Trigger** - Transform used for distance calculations
- **Search Filters** - List of root GameObjects to process

### Match Rules
- **Rule Collection** - List of enabled RuleEngine instances
- **Rule Priority** - Order of rule execution

## Automatic Setup

When you run scene setup, ProStream automatically:

1. Creates the SceneConnector GameObject
2. Adds all required child components
3. Links all asset references
4. Configures default settings
5. Initializes the scene for streaming

## Runtime Behavior

At runtime, the SceneConnector:

- Initializes the streaming system
- Configures the Loading Trigger
- Activates rule matching
- Coordinates SubScene loading/unloading
- Manages section state

## See Also

- [ProStream Editor](/editor-guide/windows/prostream-editor) - How to set up scenes
- [Scene Search Filter](/editor-guide/components/scene-search-filter) - Define processing scope
- [Runtime Streaming](/runtime-systems/runtime-streaming) - How streaming works at runtime
