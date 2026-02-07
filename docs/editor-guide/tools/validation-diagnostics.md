# Validation & Diagnostics

ProStream includes validation systems to help identify issues before they cause problems at runtime.

## ValidationEngine (Pipeline Validation)

The ValidationEngine runs automatically during the **Calculate Positions** process when enabled. It scans all tracked GameObjects for common DOTS compatibility issues.

### Enabling Validation

Validation settings are found in the **Settings Panel** under the **Search/Match** tab:

**Settings:**
- **Check for basic issues** - Fast scan for common problems
- **Check for advanced issues** - Deeper analysis (slower)

::: tip
Both options are disabled by default for performance. Enable them when first setting up a scene or if you encounter runtime issues.
:::

### Basic Issues Checked

When **Check for basic issues** is enabled:

| Issue | Description |
|-------|-------------|
| Missing Mesh | MeshFilter or MeshRenderer with no mesh assigned |
| Null Materials | Renderer with null or missing material references |
| Empty Renderers | Renderer components with no valid render data |
| Invalid Colliders | Collider configurations that may fail at runtime |

### Advanced Issues Checked

When **Check for advanced issues** is enabled (includes basic checks):

| Issue | Description |
|-------|-------------|
| Shader Compatibility | Shaders that may not work with DOTS/Entities |
| LOD Configuration | LODGroup settings that could cause streaming issues |
| Nested Prefab Problems | Complex prefab hierarchies that may fail conversion |
| Component Combinations | Invalid component combinations for ECS conversion |

### Validation Results

After validation completes, results are displayed in the Console:

```
Validation completed: All 452 objects passed validation
```

Or if issues are found:

```
Validation found 3 critical errors and 12 warnings
```

::: danger
**Critical errors** indicate objects that will likely fail during SubScene conversion or at runtime. Address these before proceeding.

**Warnings** indicate potential issues that may or may not cause problems depending on your setup.
:::

## ProStreamDiagnostics (Ad-hoc Diagnostics)

The ProStreamDiagnostics window provides on-demand diagnostic capabilities outside the normal workflow.

### Opening Diagnostics

**Keyboard Shortcut:** Press **Alt+Shift+D** to open the diagnostics window.

**Menu:** **Tools → instance.id → ProStream → Diagnostics Hub**

### Diagnostic Tools

#### Scene Analysis
- Object count statistics
- Prefab usage analysis
- Component distribution
- Memory estimates

#### Prefab Validation
- Check for broken prefab connections
- Verify prefab instances
- Detect missing prefab assets

#### Mesh Validation
- Check for missing meshes
- Validate mesh read/write settings
- Detect invalid mesh data

#### Material Validation
- Find null material references
- Check shader compatibility
- Identify missing textures

#### DOTS Compatibility
- Check for incompatible components
- Validate conversion settings
- Identify potential runtime issues

### Running Diagnostics

1. Open Diagnostics Hub
2. Select diagnostic tool from list
3. Configure options (if any)
4. Click **Run Diagnostic**
5. Review results in output panel

### Diagnostic Results

Results are displayed with:
- **Pass** - No issues found
- **Warning** - Potential issues
- **Error** - Critical issues

Click on any result to:
- Select the problematic object in hierarchy
- View detailed information
- Get suggested fixes

## Common Issues and Fixes

### Missing Mesh References

**Issue:** MeshFilter has no mesh assigned

**Fix:**
1. Select the object in hierarchy
2. Assign a mesh in MeshFilter component
3. Or remove the MeshFilter if not needed

### Null Materials

**Issue:** Renderer has null material slots

**Fix:**
1. Select the object
2. Assign materials to all slots in Renderer
3. Or remove unused material slots

### Incompatible Shaders

**Issue:** Shader not compatible with DOTS/Entities

**Fix:**
1. Replace with DOTS-compatible shader
2. Use URP/HDRP Lit shader
3. Or create custom DOTS shader

### Broken Prefab Connections

**Issue:** Prefab instance disconnected from asset

**Fix:**
1. Select the object
2. Use **GameObject → Prefab → Revert** to reconnect
3. Or delete and re-instantiate prefab

## Best Practices

### Run Validation Early

- Enable validation during initial setup
- Fix issues before Calculate Positions
- Prevents problems during SubScene creation

### Regular Checks

- Run diagnostics after major scene changes
- Validate before creating SubScenes
- Check after importing new assets

### Document Issues

- Note recurring issues
- Create custom validation rules if needed
- Share findings with team

### Automated Validation

Consider enabling validation in your workflow:
- Pre-commit hooks
- CI/CD pipeline checks
- Automated testing

## See Also

- [Troubleshooting](/troubleshooting/troubleshooting) - Common issues and solutions
- [Standard Workflow](/getting-started/standard-workflow) - Complete setup guide
- [Prerequisites](/getting-started/prerequisites) - Setup requirements
