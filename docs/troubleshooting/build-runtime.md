# Build & Runtime Issues

Common issues related to the build process and runtime behavior.

## No Objects In Game

**Issue:** After performing a build, no objects appear in the game

**Cause:** The SRP (Scriptable Render Pipeline) asset is not assigned in build settings

### Solution

Ensure that an SRP asset is assigned in the following locations:

#### 1. Project Settings - Graphics

**Path:** **Edit > Project Settings > Graphics**

**Setting:** Scriptable Render Pipeline Settings

Assign your URP or HDRP asset here.

#### 2. Project Settings - URP Global Settings

**Path:** **Edit > Project Settings > Graphics > URP Global Settings**

![URP Global Settings](/images/ts_settings_srp_global_asset.png)

Ensure the URP Global Settings asset is assigned.

#### 3. Project Settings - Quality

**Path:** **Edit > Project Settings > Quality**

**Setting:** Rendering (for each quality level)

![Quality Settings](/images/ts_settings_srp_quality_asset.png)

Assign the appropriate SRP asset for each quality level you're using.

### Verification Steps

1. Open **Edit > Project Settings > Graphics**
2. Check that "Scriptable Render Pipeline Settings" has an asset assigned
3. Open **Edit > Project Settings > Quality**
4. For each quality level, verify "Rendering" has an asset assigned
5. Rebuild your project
6. Test the build

## Runtime Streaming Issues

### Objects Not Loading

**Issue:** SubScenes don't load during gameplay

**Check:**
- StreamingManager exists in scene
- Loading Trigger is assigned
- Streaming is enabled in StreamingManager
- Layer distances are configured
- SubScene files exist in build

### Objects Loading Incorrectly

**Issue:** Wrong objects load or objects appear in wrong places

**Check:**
- SubScene creation completed successfully
- No errors during build process
- SubScene files are included in build
- Entity conversion completed properly

### Performance Issues in Build

**Issue:** Build runs slower than expected

**Check:**
- Burst compilation is enabled
- IL2CPP is used (not Mono)
- Incremental GC is enabled
- Profiler shows no unexpected bottlenecks

## Build Process Issues

### Build Fails

**Issue:** Unity build process fails with errors

**Common Causes:**
- Missing SRP assets
- Entities package not properly installed
- SubScene files corrupted
- Insufficient disk space

**Solutions:**
1. Check Console for specific errors
2. Verify all packages are installed correctly
3. Clean build folder and rebuild
4. Verify SubScene files are valid

### Build Size Too Large

**Issue:** Build is larger than expected

**Possible Causes:**
- All SubScenes included even if not used
- Debug symbols included
- Uncompressed assets

**Solutions:**
- Enable compression in build settings
- Remove unused SubScenes
- Use IL2CPP with code stripping
- Optimize asset compression

## Entity Conversion Issues

### Conversion Errors

**Issue:** Errors during entity conversion in build

**Check:**
- All prefabs are DOTS-compatible
- Shaders are compatible with SRP Batcher
- No unsupported components
- Validation was run before building

### Missing Components in Build

**Issue:** Components present in Editor but missing in build

**Cause:** Components not compatible with entity conversion

**Solution:**
- Run validation before building
- Check component compatibility
- Use DOTS-compatible alternatives
- See [Validation & Diagnostics](/editor-guide/tools/validation-diagnostics)

## Platform-Specific Issues

### Mobile Builds

**Issues:**
- Memory constraints
- Loading performance
- Graphics compatibility

**Solutions:**
- Reduce SubScene sizes
- Lower quality settings
- Use mobile-optimized shaders
- Test on target devices early

### Console Builds

**Issues:**
- Platform-specific rendering
- Memory management
- Input handling

**Solutions:**
- Follow platform-specific Unity guidelines
- Test on actual hardware
- Optimize for platform constraints

## Debugging Builds

### Enable Development Build

1. Open **File > Build Settings**
2. Enable "Development Build"
3. Enable "Script Debugging" (optional)
4. Build and run

### Check Logs

**Windows:** `%USERPROFILE%\AppData\LocalLow\CompanyName\GameName\Player.log`

**Mac:** `~/Library/Logs/CompanyName/GameName/Player.log`

**Linux:** `~/.config/unity3d/CompanyName/GameName/Player.log`

### Common Log Errors

**"Failed to load SubScene"**
- SubScene file missing from build
- File path incorrect
- Asset bundle issue

**"Entity conversion failed"**
- Incompatible components
- Missing dependencies
- DOTS compatibility issue

## Best Practices for Builds

### Before Building

1. Run Calculate Positions
2. Create SubScenes successfully
3. Test in Editor Play Mode
4. Run validation
5. Verify SRP settings
6. Check build settings

### Build Settings

**Recommended:**
- Scripting Backend: IL2CPP
- API Compatibility: .NET Standard 2.1
- Compression: LZ4 or LZ4HC
- Code Stripping: Enabled (with proper link.xml)

### Testing

1. Test Development Build first
2. Verify streaming works correctly
3. Check performance with Profiler
4. Test on target platform/device
5. Create Release Build only after validation

## See Also

- [Prerequisites](/getting-started/prerequisites) - Required settings
- [Troubleshooting](/troubleshooting/troubleshooting) - General issues
- [Runtime Streaming](/runtime-systems/runtime-streaming) - Runtime behavior
- [Validation & Diagnostics](/editor-guide/tools/validation-diagnostics) - Pre-build validation
