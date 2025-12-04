---
Category: Tools
Title: Validation & Diagnostics
Order: 5
---

# Validation & Diagnostics

ProStream includes two validation systems to help identify issues before they cause problems at runtime:

1. **ValidationEngine** - Pipeline-integrated validation during Calculate Positions
2. **ProStreamDiagnostics** - Ad-hoc diagnostic window for investigation

## ValidationEngine (Pipeline Validation)

The ValidationEngine runs automatically during the **Calculate Positions** process when enabled. It scans all tracked GameObjects for common DOTS compatibility issues.

### Enabling Validation

Validation settings are found in the **Settings Panel** under the **Search/Match** tab:

<table>
<tr><td width="300">

**Settings:**

- **Check for basic issues** - Fast scan for common problems
- **Check for advanced issues** - Deeper analysis (slower)

</td><td>

![validation_settings.png](validation_settings.png){width="300" thumbnail="true"}

</td></tr>
</table>

<note>

Both options are disabled by default for performance. Enable them when first setting up a scene or if you encounter runtime issues.

</note>

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

<warning>

**Critical errors** indicate objects that will likely fail during SubScene conversion or at runtime. Address these before proceeding.

**Warnings** indicate potential issues that may or may not cause problems depending on your setup.

</warning>

---

## ProStreamDiagnostics (Ad-hoc Diagnostics)

The ProStreamDiagnostics window provides on-demand diagnostic capabilities outside the normal workflow. Use it to investigate specific issues or analyze your scene in detail.

### Opening Diagnostics

<table>
<tr><td>

**Keyboard Shortcut:**

Press **Alt+Shift+D** to open the diagnostics window.

**Or via Menu:**

`Tools → ProStream → Diagnostics`

</td><td>

![diagnostics_window.png](diagnostics_window.png){width="350" thumbnail="true"}

</td></tr>
</table>

### Diagnostic Features

The diagnostics window provides several analysis tools:

| Feature | Description |
|---------|-------------|
| **Object Analysis** | Detailed inspection of individual GameObjects |
| **Material Scan** | Find all materials and check compatibility |
| **Shader Check** | Verify shader DOTS compatibility |
| **Hierarchy Analysis** | Analyze prefab and object hierarchy |
| **Statistics** | View object counts, section assignments, etc. |

### When to Use Each System

<table>
<tr>
<td><b>Use ValidationEngine When:</b></td>
<td><b>Use ProStreamDiagnostics When:</b></td>
</tr>
<tr>
<td>

- Setting up a new scene
- Running Calculate Positions
- Automated validation during workflow
- Batch checking all objects

</td>
<td>

- Investigating a specific error
- Analyzing individual objects
- Checking specific materials/shaders
- Debugging runtime issues
- Getting detailed statistics

</td>
</tr>
</table>

---

## Best Practices

### Initial Scene Setup

1. ✅ Enable **Check for basic issues** initially
2. ✅ Run Calculate Positions and review results
3. ✅ Fix any critical errors before proceeding
4. ✅ Consider enabling **Check for advanced issues** if you have complex shaders

### Ongoing Development

1. ✅ Re-run validation when adding new prefabs to the scene
2. ✅ Check diagnostics if you see unexpected runtime behavior
3. ✅ Disable validation once scene is stable (for faster iteration)
4. ✅ Re-enable validation before final builds

### Performance Considerations

<note>

**Tip:** Validation adds processing time to Calculate Positions. For large scenes (10,000+ objects), consider:

- Running with validation enabled once during initial setup
- Disabling for iterative development
- Re-enabling before final testing

</note>

---

## Troubleshooting Common Issues

### "Missing Mesh" Errors

**Cause:** MeshFilter component exists but mesh reference is null.

**Solutions:**
1. Assign a mesh to the MeshFilter
2. Remove the MeshFilter if not needed
3. Check if prefab connection is broken

### "Null Material" Warnings

**Cause:** Renderer has material slots with null references.

**Solutions:**
1. Assign materials to all slots
2. Remove unused material slots
3. Check material array size matches submesh count

### "Shader Incompatible" Warnings

**Cause:** Shader uses features not supported by DOTS Hybrid Renderer.

**Solutions:**
1. Use URP/HDRP compatible shaders
2. Check shader for unsupported features
3. Consider using Shader Graph for custom shaders

### "LOD Group Configuration" Issues

**Cause:** LODGroup settings may cause issues during streaming.

**Solutions:**
1. Ensure LOD transitions are properly configured
2. Check that LOD renderers are assigned correctly
3. Verify LOD distances are appropriate

---

## Related Topics

<seealso>
    <category ref="workflow">
        <a href="position-calculation.md">Position Calculation Process</a>
        <a href="standard-workflow.topic">Standard Workflow</a>
    </category>
    <category ref="settings">
        <a href="settings-reference.md">Settings Reference</a>
    </category>
    <category ref="troubleshooting">
        <a href="troubleshooting.md">Troubleshooting Guide</a>
    </category>
</seealso>
