# Settings Reference

This page documents the settings currently exposed by ProStream in the active Settings Panel UI.

::: tip Opening the Settings Panel
Open via **Tools > instance.id > ProStream > Settings > Panel**, or from the settings icon in ProStream editor UI.
:::

## Settings Panel Tabs

The panel currently provides these primary tabs:

| Tab | Panel | Description |
|-----|-------|-------------|
| **General** | GeneralPanel | General editor style and global object exclusion settings |
| **Scene/Setup** | SceneSetupPanel | Scene setup and SubScene creation options |
| **Search/Match** | ObjectMatchingPanel | Validation and search query behavior |
| **Streaming** | StreamingPanel | (If DataObjects is enabled) Streaming job system configuration |
| **Workflows** | WorkflowsPanel | Enable/disable system-wide workflow assets |
| **Build** | BuildPanel | Build automation and cleanup settings |
| **Debugging** | DebuggingPanel | Scene View debugging and visualization settings |

## General Tab

Settings related to the overall ProStream editor and global tracking.

| Setting | Description |
|---------|-------------|
| User Excluded Type Names | Comma-separated list of component type names. GameObjects with these components will be excluded from ProStream tracking, search operations, and quadtree processing. |
| Editor Theme | Select the theme for the ProStream Editor. |

## Scene/Setup Tab

These settings dictate how SubScenes are generated.

### SubScene Setup

| Setting | Default | Description |
|---------|---------|-------------|
| Filter Incompatible Shaders | Off | When creating SubScenes, whether to include GameObjects which have incompatible shaders. Objects with incompatible shaders are forced to the Shader Error color. Requires *Check for advanced issues* to be true. |
| Include Disabled Objects | Off | Include disabled objects in the SubScene creation process. Disabled Objects are not converted to Entities, but simply exist in the SubScene. |
| Auto-Load SubScenes In Editor | Off | Should SubScene Entity visual representations automatically load in the editor after creation? |

*(Note: Additional settings from active Workflow Components may also inject themselves dynamically at the bottom of this tab).*

## Search/Match Tab

These settings affect rule matching and validation during **Calculate Positions**.

### Matching Settings

| Setting | Default | Description |
|---------|---------|-------------|
| Check for basic issues | On | Runs common validation checks during matching (for example missing materials, collider mesh issues, invalid bounds/scale). |
| Check for advanced issues | On | Runs additional shader compatibility checks (SRP-dependent). More expensive but useful for conversion/runtime safety. |

### Search Keyword

| Setting | Default | Description |
|---------|---------|-------------|
| Use keyword separation | Off | Adds separator characters around search terms to reduce false positives from fuzzy matching. |
| Keyword separator | None | The character used to separate keywords when keyword separation is enabled. |

**Example:**

Without keyword separation:
- Search for `Tree` matches: `Environment_Tree_01` and `City_Street_01` (false positive)

With keyword separation (separator = `_`):
- Search for `Tree` becomes `_Tree_`
- Matches: `Environment_Tree_01` but NOT `City_Street_01`

## Streaming Tab

*This tab is only active if DataObjects are being used in the project.*

| Setting | Description |
|---------|-------------|
| Section Batch Limiter | Use section batch limiter to limit the number of sections processed per frame when loading SubScenes. |
| Job Batch Count | The inner loop value for prefab instantiation. |
| Section Iterations | How many sections should be processed per frame when loading SubScenes. |

## Workflows Tab

This tab lists all discovered `WorkflowAsset`s in the project (e.g., `InstanceObjectsWorkflow`, `ColliderObjectsWorkflow`).
You can toggle whether a workflow is **Active** across the project. 

*Note: Deactivating a workflow fully disables all associated functionality.*

## Build Tab

Settings relating to the final Unity Build process.

| Setting | Description |
|---------|-------------|
| Auto Add GameObject Scenes To Build | Automatically add any GameObject SubScenes to the build settings when creating SubScenes. |
| Auto Remove GameObject Scenes From Build | Automatically remove generated GameObject SubScenes from the build settings when resetting the scene. |
| Remove Original Objects In Build | Remove the original source GameObjects which were converted to Entities from the final scene when building. |

## Debugging Tab

Settings to draw useful visual debug bounds in the Unity Scene View.

| Setting | Description |
|---------|-------------|
| Loading Distance | Enable SubScene loading distance debugging. |
| Layer Number | Layer in which to show debug info. |
| Debug Label Height | Height of debug labels. |
| SubScene Labels | Should SubScene Labels be displayed. |
| Position Labels | Should Position Labels be displayed. |
| SubScene Bounds | Should SubScene Bounds be displayed. |
| Layer/Section Bounds | Should Layer/Section Bounds be displayed. |
| SubScene Distances | Should SubScene distance lines be displayed. |
| SubScene Load Threshold | Should SubScene load threshold be displayed. |

::: tip
See [Validation & Diagnostics](/editor-guide/tools/validation-diagnostics) for detailed information on what each validation level checks.
:::

## Layer Configuration

Layer-specific settings are configured in the Layer Editor, not the Settings Panel.

**Access:** SceneConnector Inspector → **Layer Editor** button

**Per-Layer Settings:**
- Load distance (meters)
- Persistent (always loaded)
- Enabled/disabled
- Section index

See [Streaming Layers](/core-concepts/layers/streaming-layers) for details.

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
- **Scene settings:** `SceneName/PSSceneData/SceneName_Settings.asset`

In practice, most user workflow settings you edit per scene are stored in the scene settings asset.

## See Also

- [Standard Workflow](/getting-started/standard-workflow) - Using settings in workflow
- [Validation & Diagnostics](/editor-guide/tools/validation-diagnostics) - Validation settings
- [Streaming Layers](/core-concepts/layers/streaming-layers) - Layer configuration
- [Rule Engine](/editor-guide/engines/rule-engine) - Rule configuration
