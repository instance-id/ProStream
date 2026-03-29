# Installation & Update Issues

Common issues related to installing or updating ProStream.

This page focuses on behavior in the current package line.

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
- Close scenes before installing packages
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
1. Check Unity version meets requirements (package manifest currently targets Unity `2022.3.0f0+`)
2. Clear Package Manager cache
3. Restart Unity
4. Check internet connection
5. Try manual package installation

### Dependencies Not Installed

**Issue:** Required packages (Entities, etc.) not installed automatically

**Solution:**
1. Open Package Manager
2. Ensure required DOTS/SRP dependencies are present for your project configuration
3. Confirm `com.unity.entities.graphics` dependency resolves successfully
4. Restart Unity
5. Re-run ProStream Setup

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
- Close scenes before updating
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
- ProStream files deleted or moved in new version
- API changes between versions
- Incompatible package versions

**Solutions:**
1. Close Unity
2. Delete the ProStream package folder from `Packages/id.instance.prostream`
3. Open Unity and reimport ProStream

## Version Compatibility

### Unity Version Requirements

| ProStream Version | Minimum Unity Version | Recommended Unity Version |
|-------------------|----------------------|---------------------------|
| Current package line | 2022.3.0f0 | Latest LTS or project-validated version |

### Package Dependencies

Declared package dependency (manifest):
- `com.unity.entities.graphics`

In practice, ProStream workflows also expect compatible DOTS + SRP project setup.

## Best Practices

### Before Installing/Updating

1. Backup your project
2. Close all scenes
3. Save all work
4. Check Unity version compatibility
5. Read release notes

### After Installing/Updating

1. Check Console for errors
2. Verify package installation
3. Test in a simple scene first
4. Reconfigure settings if needed
5. Re-run scene setup if required

### Safe Update Process

1. **Backup Project**
   - Use version control (Git)
   - Or create a complete copy

2. **Close Everything**
   - Close all scenes

3. **Update**
   - Update ProStream package

4. **Verify**
   - Check for errors
   - Test basic functionality
   - Verify existing scenes work

5. **Reconfigure**
   - Check settings
   - Re-run setup if needed

## Troubleshooting Installation

### Setup Window Not Appearing

**Issue:** ProStream setup window doesn't open after import

**Solution:**
1. Open manually from one of these menu items:
   - **Tools > instance.id > ProStream > Setup ProStream**
   - **Tools > instance.id > ProStream > Update ProStream**
2. Check Console for errors
3. Verify package imported correctly
4. Restart Unity

### Setup Hangs

**Issue:** Setup appears to hang during installation

**Solution:**
1. Wait (installation can take several minutes)
2. Check Unity's progress bar
3. Check Console for errors
4. If truly hung, restart Unity and try again

### SRP Not Detected

**Issue:** Setup says SRP not found

**Solution:**
1. Install URP or HDRP via Package Manager
2. Create and assign SRP asset in Project Settings
3. Restart setup
4. See [Requirements](/getting-started/requirements) for details

## Getting Help

If installation/update issues persist:

1. Check [Troubleshooting](/troubleshooting/troubleshooting) guide
2. Verify [Requirements](/getting-started/requirements)
3. Check Unity Console for specific errors
4. Try clean installation:
   - Remove ProStream package
   - Clear Library folder
   - Restart Unity
   - Reinstall ProStream

## See Also

- [Setup](/getting-started/setup) - Setup guide
- [Requirements](/getting-started/requirements) - Requirements
- [Troubleshooting](/troubleshooting/troubleshooting) - General issues
