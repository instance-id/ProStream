---
Category: Reference
Title: Settings Reference
Order: 10
---

# Settings Reference

This page documents all configurable settings in ProStream, organized by their location in the Settings Panel.

<note>

**Opening the Settings Panel:**

Click the **gear icon** (⚙️) in the ProStream Editor toolbar, or access via individual panel headers.

</note>

---

## Settings Panel Tabs

The Settings Panel contains multiple tabs for organizing settings:

| Tab | Panel | Description |
|-----|-------|-------------|
| **Search/Match** | ObjectMatchingPanel | Validation and search query settings |
| **Scene/Setup** | SceneSetupPanel | Scene configuration and SubScene settings |

---

## Search/Match Tab (ObjectMatchingPanel)

Settings related to the matching process and search queries.

### Matching Settings

<table>
<tr>
<td width="200"><b>Setting</b></td>
<td width="100"><b>Default</b></td>
<td><b>Description</b></td>
</tr>
<tr>
<td>Check for basic issues</td>
<td>❌ Off</td>
<td>Check GameObjects for common DOTS compatibility issues during the matching process (e.g., empty MeshRenderers, missing Materials). Runs during Calculate Positions.</td>
</tr>
<tr>
<td>Check for advanced issues</td>
<td>❌ Off</td>
<td>Check GameObjects for advanced DOTS compatibility issues (e.g., incompatible Shaders, LOD issues). More intensive but helps prevent conversion/runtime errors.</td>
</tr>
</table>

<tip>

See [Validation & Diagnostics](validation-diagnostics.md) for detailed information on what each validation level checks.

</tip>

### Search Keyword Settings

These settings affect how `MatchBySearchQuery` rules match object names.

<table>
<tr>
<td width="200"><b>Setting</b></td>
<td width="100"><b>Default</b></td>
<td><b>Description</b></td>
</tr>
<tr>
<td>Use keyword separation</td>
<td>❌ Off</td>
<td>When enabled, adds separator characters around search terms to reduce false matches from fuzzy matching.</td>
</tr>
<tr>
<td>Keyword separator</td>
<td>`_`</td>
<td>The character used to separate keywords when keyword separation is enabled.</td>
</tr>
</table>

**Example:**

Without keyword separation:
- Search for `Tree` matches: `Environment_Tree_01` ✅ and `City_Street_01` ✅ (false positive)

With keyword separation (separator = `_`):
- Search for `Tree` becomes `_Tree_`
- Matches: `Environment_Tree_01` ✅ but NOT `City_Street_01` ❌

---

## Scene/Setup Tab (SceneSetupPanel)

Settings related to scene configuration, SubScene creation, and streaming behavior.

### SubScene Settings

<table>
<tr>
<td width="220"><b>Setting</b></td>
<td width="100"><b>Default</b></td>
<td><b>Description</b></td>
</tr>
<tr>
<td>Auto Save</td>
<td>✅ On</td>
<td>Automatically save the scene after Calculate Positions completes.</td>
</tr>
<tr>
<td>SubScene Folder Path</td>
<td>Auto</td>
<td>Location where generated SubScene assets are stored. Defaults to `SceneName/SubScenes/`.</td>
</tr>
<tr>
<td>Use Quad Naming</td>
<td>✅ On</td>
<td>Include QuadTree coordinates in SubScene names (e.g., `Scene_5_7_Ground`).</td>
</tr>
</table>

### Grid Settings

<table>
<tr>
<td width="220"><b>Setting</b></td>
<td width="100"><b>Default</b></td>
<td><b>Description</b></td>
</tr>
<tr>
<td>Grid Size</td>
<td>Auto</td>
<td>Size of each QuadTree cell. Auto-calculated based on scene bounds and target cell count.</td>
</tr>
<tr>
<td>Target Cell Count</td>
<td>16</td>
<td>Approximate number of grid cells to create. Actual count depends on scene bounds.</td>
</tr>
</table>

### Streaming Settings

<table>
<tr>
<td width="220"><b>Setting</b></td>
<td width="100"><b>Default</b></td>
<td><b>Description</b></td>
</tr>
<tr>
<td>Load Distance</td>
<td>100</td>
<td>Distance from Loading Trigger at which SubScenes begin loading.</td>
</tr>
<tr>
<td>Unload Distance</td>
<td>150</td>
<td>Distance from Loading Trigger at which SubScenes unload.</td>
</tr>
<tr>
<td>Use Layer Distances</td>
<td>❌ Off</td>
<td>When enabled, each streaming layer can have its own load/unload distances.</td>
</tr>
</table>

<note>

**Load/Unload Distance Hysteresis:**

The unload distance should always be greater than the load distance to prevent rapid load/unload cycling when the trigger is near the boundary.

</note>

---

## SceneSettings Asset

Each scene has a `SceneSettings` asset stored in `SceneName/SceneData/SceneName_Settings.asset`. This asset stores:

- All per-scene configuration
- State flags (PositionCalculated, StreamingReady, etc.)
- References to LayerData and SceneLock
- SubScene path configuration

### Key Properties

| Property | Type | Description |
|----------|------|-------------|
| `PositionCalculated` | bool | True after Calculate Positions completes successfully |
| `StreamingReady` | bool | True after SubScenes are created and scene is ready for runtime |
| `SceneIsPrepared` | bool | True when setup is complete and ready for streaming |

---

## ProStreamSettings (Global)

Global settings that apply across all scenes. Located at `Assets/Settings/ProStreamSettings.asset`.

<table>
<tr>
<td width="220"><b>Setting</b></td>
<td width="100"><b>Default</b></td>
<td><b>Description</b></td>
</tr>
<tr>
<td>Enable Logging</td>
<td>✅ On</td>
<td>Enable detailed logging to console during operations.</td>
</tr>
<tr>
<td>Log Level</td>
<td>Info</td>
<td>Minimum log level to display (Verbose, Info, Warning, Error).</td>
</tr>
<tr>
<td>Show Tutorial Mode</td>
<td>❌ Off</td>
<td>Display tutorial-specific rules and guidance in the editor.</td>
</tr>
<tr>
<td>Show Example Rules</td>
<td>✅ On</td>
<td>Display example rules in the Rule Editor.</td>
</tr>
</table>

---

## SceneConnector Component

The SceneConnector component on the scene's SceneConnector GameObject provides runtime access and configuration.

### Inspector Fields

| Field | Description |
|-------|-------------|
| **Loading Trigger** | Transform used to determine streaming distances. If empty, uses Camera.main. |
| **Scene Lock** | Reference to the scene's SceneLock asset (auto-assigned). |
| **Settings** | Reference to the scene's SceneSettings asset (auto-assigned). |
| **Scene Layer Data** | Reference to LayerData asset (auto-assigned). |

### Runtime Lists

| List | Description |
|------|-------------|
| **Rule List** | Enabled match rules for this scene. |
| **Modification List** | Enabled modifications for this scene. |
| **Scene Search Filters** | Search filter components in this scene. |

<warning>

**Do not manually modify** the auto-assigned references (Scene Lock, Settings, Scene Layer Data). These are set during scene setup and should not be changed.

</warning>

---

## LayerData Asset

Each scene has a `LayerData` asset that defines the streaming layers/sections.

### Default Layers

| Layer | Section ID | Description |
|-------|-----------|-------------|
| Ground | 0 | Terrain, floors, ground-level objects |
| LargeObjects | 1 | Large structures, buildings |
| MediumObjects | 2 | Medium-sized props, vehicles |
| SmallObjects | 3 | Small details, decorations |
| Foliage | 4 | Plants, trees, vegetation |

### Layer Configuration

Each layer can be configured with:

- **Name** - Display name for the layer
- **Section Index** - Integer ID used for matching (0-N)
- **Load Priority** - Order in which layers load (lower = first)
- **Custom Distances** - Per-layer load/unload distances (if enabled)

---

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| **Alt+Shift+D** | Open ProStreamDiagnostics window |
| **Ctrl+Shift+P** | Open ProStream Editor |

---

## Related Topics

<seealso>
    <category ref="setup">
        <a href="scene-connector.md">SceneConnector Component</a>
        <a href="streaming-layers.md">Streaming Layers</a>
    </category>
    <category ref="processes">
        <a href="position-calculation.md">Position Calculation</a>
        <a href="standard-workflow.topic">Standard Workflow</a>
    </category>
</seealso>
