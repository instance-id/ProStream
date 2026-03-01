# Settings Reference

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
