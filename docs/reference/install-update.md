# Installation & Update Issues

Common issues related to installing or updating ProStream.

## Installation Issues

### Lost References / Missing Scripts

**Issue:** Components show as "Missing Script" after installation

**Cause:** Installing ProStream while a scene with ProStream components is open

**Solution:**
1. Close all scenes before installing
2. Install ProStream
3. Reopen scenes after installation completes
4. If references are still lost, you may need to re-run scene setup

**Prevention:**
- Always close scenes before installing packages
- Save all work before installation
- Restart Unity after installation if issues persist

### Package Installation Fails

**Issue:** Unity Package Manager fails to install ProStream

**Common Causes:**
- Network connectivity issues
- Package cache corruption
- Unity version incompatibility
- Insufficient permissions

**Solutions:**
1. Check Unity version meets requirements (2022.3.0f1+)
2. Clear Package Manager cache
3. Restart Unity
4. Check internet connection
5. Try manual package installation

### Dependencies Not Installed

**Issue:** Required packages (Entities, etc.) not installed automatically

**Solution:**
1. Open Package Manager
2. Manually install required packages:
   - Unity Entities
   - Unity Burst
   - Unity Collections
   - Unity Mathematics
3. Restart Unity
4. Re-run ProStream installer

## Update Issues

### ObjectDisposedException Errors

**Issue:** Constant "UNKNOWN_OBJECT_TYPE has been deallocated" errors after update

**Cause:** Updating ProStream (specifically the Entities package) while a scene with SubScene components is open

**Solution:**
1. Close all scenes
2. Update packages
3. Restart Unity
4. Reopen scenes
5. If errors persist, reimport ProStream

**Prevention:**
- Always close scenes before updating
- Close Unity before major updates
- Backup project before updates

### Settings Lost After Update

**Issue:** ProStream settings reset after update

**Cause:** Settings format changed between versions

**Solution:**
1. Reconfigure settings in Settings Panel
2. Re-run scene setup if needed
3. Check scene-specific settings in SceneSettings asset

### Compilation Errors After Update

**Issue:** C# compilation errors after updating

**Common Causes:**
- API changes between versions
- Incompatible package versions
- Cached assemblies

**Solutions:**
1. Restart Unity
2. Reimport all assets
3. Clear Library folder (Unity will rebuild)
4. Check for package version conflicts
5. Update all related packages

## Version Compatibility

### Unity Version Requirements

| ProStream Version | Minimum Unity Version | Recommended Unity Version |
|-------------------|----------------------|---------------------------|
| Current | 2022.3.0f1 | Unity 6.1 |

### Package Dependencies

Required packages:
- Unity Entities (compatible version)
- Unity Burst
- Unity Collections
- Unity Mathematics
- Scriptable Render Pipeline (URP or HDRP)

## Best Practices

### Before Installing/Updating

1. Backup your project
2. Close all scenes
3. Save all work
4. Check Unity version compatibility
5. Read release notes
6. Close Unity (for major updates)

### After Installing/Updating

1. Restart Unity
2. Check Console for errors
3. Verify package installation
4. Test in a simple scene first
5. Reconfigure settings if needed
6. Re-run scene setup if required

### Safe Update Process

1. **Backup Project**
   - Use version control (Git)
   - Or create a complete copy

2. **Close Everything**
   - Close all scenes
   - Close Unity

3. **Update**
   - Update ProStream package
   - Update dependencies if needed

4. **Restart**
   - Restart Unity
   - Let it recompile

5. **Verify**
   - Check for errors
   - Test basic functionality
   - Verify existing scenes work

6. **Reconfigure**
   - Check settings
   - Re-run setup if needed

## Troubleshooting Installation

### Installer Not Appearing

**Issue:** ProStream installer window doesn't open after import

**Solution:**
1. Open manually: **Tools > instance.id > ProStream > (Install/Update) ProStream**
2. Check Console for errors
3. Verify package imported correctly
4. Restart Unity

### Installation Hangs

**Issue:** Installer appears to hang during installation

**Solution:**
1. Wait (installation can take several minutes)
2. Check Unity's progress bar
3. Check Console for errors
4. If truly hung, restart Unity and try again

### SRP Not Detected

**Issue:** Installer says SRP not found

**Solution:**
1. Install URP or HDRP via Package Manager
2. Create and assign SRP asset in Project Settings
3. Restart installer
4. See [Prerequisites](/getting-started/prerequisites) for details

## Getting Help

If installation/update issues persist:

1. Check [Troubleshooting](/troubleshooting/troubleshooting) guide
2. Verify [Prerequisites](/getting-started/prerequisites)
3. Check Unity Console for specific errors
4. Try clean installation:
   - Remove ProStream package
   - Clear Library folder
   - Restart Unity
   - Reinstall ProStream

## See Also

- [Installation](/getting-started/installation) - Installation guide
- [Prerequisites](/getting-started/prerequisites) - Requirements
- [Troubleshooting](/troubleshooting/troubleshooting) - General issues
