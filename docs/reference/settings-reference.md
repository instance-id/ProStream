# Settings Reference

This page documents all configurable settings in ProStream, organized by their location in the Settings Panel.

::: tip Opening the Settings Panel
Click the settings icon in the ProStream Editor toolbar, or access via individual panel headers.
:::

## Settings Panel Tabs

The Settings Panel contains multiple tabs for organizing settings:

| Tab | Panel | Description |
|-----|-------|-------------|
| **Search/Match** | ObjectMatchingPanel | Validation and search query settings |
| **Scene/Setup** | SceneSetupPanel | Scene configuration and SubScene settings |

## Search/Match Tab (ObjectMatchingPanel)

Settings related to the matching process and search queries.

### Matching Settings

| Setting | Default | Description |
|---------|---------|-------------|
| Check for basic issues | Off | Check GameObjects for common DOTS compatibility issues during the matching process (e.g., empty MeshRenderers, missing Materials). Runs during Calculate Positions. |
| Check for advanced issues | Off | Check GameObjects for advanced DOTS compatibility issues (e.g., incompatible Shaders, LOD issues). More intensive but helps prevent conversion/runtime errors. |

::: tip
See [Validation & Diagnostics](/editor-guide/tools/validation-diagnostics) for detailed information on what each validation level checks.
:::

### Search Keyword Settings

These settings affect how `MatchBySearchQuery` rules match object names.

| Setting | Default | Description |
|---------|---------|-------------|
| Use keyword separation | Off | When enabled, adds separator characters around search terms to reduce false matches from fuzzy matching. |
| Keyword separator | `_` | The character used to separate keywords when keyword separation is enabled. |

**Example:**

Without keyword separation:
- Search for `Tree` matches: `Environment_Tree_01` and `City_Street_01` (false positive)

With keyword separation (separator = `_`):
- Search for `Tree` becomes `_Tree_`
- Matches: `Environment_Tree_01` but NOT `City_Street_01`

## Scene/Setup Tab (SceneSetupPanel)

Settings related to scene configuration, SubScene creation, and streaming behavior.

### SubScene Settings

| Setting | Default | Description |
|---------|---------|-------------|
| Auto-save scenes | On | Automatically save scenes after major operations (Calculate Positions, Create SubScenes) |
| SubScene directory | `SubScene_Assets` | Root directory for SubScene files |
| Entity subdirectory | `Entity` | Subdirectory within SubScene folder for entity scenes |

### Streaming Settings

| Setting | Default | Description |
|---------|---------|-------------|
| Hysteresis buffer | `10.0` | Distance buffer (in meters) added to unload threshold to prevent rapid load/unload cycles |
| Update frequency | `Every Frame` | How often streaming system checks distances |
| Enable debug visualization | Off | Show gizmos for streaming boundaries in Scene view |

### Performance Settings

| Setting | Default | Description |
|---------|---------|-------------|
| Max concurrent loads | `4` | Maximum number of SubScenes that can load simultaneously |
| Load priority | `Distance` | How to prioritize loading (Distance, Manual, etc.) |
| Async loading | On | Load SubScenes asynchronously to avoid frame drops |

### QuadTree Settings

| Setting | Default | Description |
|---------|---------|-------------|
| Grid size | `Auto` | Size of QuadTree grid (Auto, 4x4, 8x8, 16x16, 32x32) |
| Cell size | `Auto` | Size of individual cells in meters (Auto or manual) |
| Bounds padding | `10.0` | Extra padding around scene bounds for QuadTree calculation |

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

## Advanced Settings

### Debug Settings

| Setting | Default | Description |
|---------|---------|-------------|
| Verbose logging | Off | Enable detailed console logging for debugging |
| Log timing | Off | Log execution time for major operations |
| Log rule matches | Off | Log each object matched by rules |

### Experimental Settings

::: warning
Experimental settings may change or be removed in future versions. Use with caution.
:::

| Setting | Default | Description |
|---------|---------|-------------|
| Parallel processing | Off | Use parallel processing for rule matching (experimental) |
| GPU culling | Off | Use GPU-based frustum culling (experimental) |

## Resetting Settings

To reset all settings to defaults:

1. Open Settings Panel
2. Click **Reset to Defaults** button at bottom
3. Confirm the action

::: danger
This will reset ALL ProStream settings. This action cannot be undone.
:::

## Settings Storage

ProStream settings are stored in:
- **Project Settings:** `ProjectSettings/ProStreamSettings.asset`
- **Scene Settings:** `SceneName/SceneData/SceneName_Settings.asset`

## See Also

- [Standard Workflow](/getting-started/standard-workflow) - Using settings in workflow
- [Validation & Diagnostics](/editor-guide/tools/validation-diagnostics) - Validation settings
- [Streaming Layers](/core-concepts/streaming-layers) - Layer configuration
- [Rule Engine](/editor-guide/engines/rule-engine) - Rule configuration
