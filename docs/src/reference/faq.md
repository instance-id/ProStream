# Frequently Asked Questions

## Asset Compatibility

**Q**: Is/are (asset pack|kit|model(s) by `X` publisher) compatible with ProStream?

**A**: ProStream is compatible with any asset that is compatible with DOTS/ECS. That said, DOTS/ECS is a bit more strict than the traditional Unity GameObject/SubScene workflow.

::: details View Asset Compatibility Details 

Some examples of situations which are fine or even common with normal Unity Scenes/GameObjects but will cause issues either during GameObject -> Entity conversion or at runtime:

Note: Several of these issues are easily fixable, and ProStream includes asset diagnostic tools to help identify and fix many of these issues

This is not an exhaustive list, just the most common issues experienced during development and testing of many different publishers asset packs/kits/models.

| Issue Type                         | Description                                                                                                                              |
| ---------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Incompatible Shaders (most common) | Meshes with materials that are using custom shaders which are not compatible with DOTS/ECS may not render or may cause errors            |
| Mishapen/Bad Meshes                | Meshes with invalid vertex data, FBX import errors, or other issues can cause runtime stuttering and/or hard to trace errors in the logs |
| Missing Materials                  | Renderer with null/missing material references will show the "Shader Error" color and log spam when playing/build                        |
| Missing MeshColliders              | MeshCollider missing shared mesh can cause issues during conversion/saving Entity SubScene                                               |
| Invalid Bounds                     | Invalid or zero bounds on non-particle objects. Ex: Bounds (0, 0, 0)                                                                     |
| Invalid Scale                      | Negative, zero, tiny, NaN, or Infinity scale values. Ex: Scale (-1, 1, 1)                                                                |

Just because an asset is not currently compatible with DOTS/ECS does not mean it cannot be made compatible with some adjustments.

For example, oftentimes custom shaders can be made compatible with just a few code changes/feature additions (or graph adjustments if made with Shader Graph).

:::

Most any asset can be compatible with DOTS/ECS (and therefore ProStream), but it is up to the publisher/creator of the asset to follow DOTS/ECS compatibility requirements and best practices to ensure that it is compatible.


## Known Issues

Please see the following links for known issues and any potential workarounds:

- [Entities Graphics](https://docs.unity3d.com/Packages/com.unity.entities.graphics@6.4/manual/known-issues.html) - (Use the version selector on the page to choose the appropriate version)

## DOTS/ECS Resources

- [Entities Documentation](https://docs.unity3d.com/Packages/com.unity.entities@6.4/manual/index.html)
- [Entities Graphics Documentation](https://docs.unity3d.com/Packages/com.unity.entities.graphics@6.4/manual/index.html)
- [Job System Documentation](https://docs.unity3d.com/Manual/job-system.html)