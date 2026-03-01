# Validation & Diagnostics

ProStream includes validation and diagnostics tools to catch scene issues before conversion and runtime.

## ValidationEngine (Pipeline Validation)

`ValidationEngine` runs during **Calculate Positions** when validation checks are enabled in settings.
It validates tracked objects and reports errors/warnings before you proceed.

### Enabling Validation

Validation settings are found in the **Settings Panel** under the **Search/Match** tab:

**Settings:**
- **Check for basic issues** - Fast scan for common problems
- **Check for advanced issues** - Deeper analysis (slower)

::: tip
Current package defaults initialize both options as enabled. Teams may still override per-scene settings.
:::

### Basic Issues Checked

When **Check for basic issues** is enabled, current validators include:

| Issue | Description |
|-------|-------------|
| Missing Materials | Renderer with null/missing material references |
| Invalid MeshCollider Setup | MeshCollider missing shared mesh |
| Invalid Bounds | Invalid or zero bounds on non-particle objects |
| Invalid Scale | Negative, zero, tiny, NaN, or Infinity scale values |

### Advanced Issues Checked

When **Check for advanced issues** is enabled, shader compatibility checks are added (SRP-dependent):

| Issue | Description |
|-------|-------------|
| Shader Compatibility | Detects shaders/materials incompatible with DOTS/SRP conversion/runtime |

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

If issues are found, ProStream can prompt you to continue or cancel the process.

## ProStreamDiagnostics (Ad-hoc Diagnostics)

The diagnostics window provides on-demand checks outside the normal workflow.

### Opening Diagnostics

**Keyboard Shortcut:** Press **Alt+Shift+D** to open the diagnostics window.

**Menu:** **Tools → instance.id → ProStream → Diagnostics Window**

### Diagnostic Tools

#### Scene Analysis
- Missing mesh references
- Missing material references
- Missing mesh collider meshes
- Missing scripts
- Non-DOTS shader checks
- Extra LOD-in-prefab checks

### Running Diagnostics

1. Open Diagnostics Window
2. Select diagnostic tool from list
3. Configure options (if any)
4. Click **Run Diagnostic**
5. Review results in output panel

### Diagnostic Results

Results are displayed with:
- **Pass** - No issues found
- **Warning** - Potential issues
- **Error** - Critical issues

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
- [Requirements](/getting-started/requirements) - Setup requirements
