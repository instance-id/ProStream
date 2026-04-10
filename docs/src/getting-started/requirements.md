## Editor Requirements

<!-- #region requirements -->

Before you start, make sure that you have the following:

- The primary requirements of ProStream are that of the Data Oriented Technology Stack [(DOTS/ECS)](https://docs.unity3d.com/Packages/com.unity.entities.graphics@1.4/manual/requirements-and-compatibility.html)
- Unity 2022.3.0f1 or later (Unity 6.4 is recommended)
- Scriptable Render Pipeline (SRP) installed and configured (URP or HDRP)
- Any additional requirements as specified by the DOTS/ECS packages for your Editor version or target platform

### Additional Requirements and Recommendations

- API Compatibility Level set to .Net Standard (required)
- Scene GameObjects which are to be converted to Entities need to be [Prefabs](/core-concepts/importance-of-prefabs)
- (Recommended) Scene Prefabs are children of an Empty Root-Level Parent GameObject

:::info
Newer versions of Unity have both API Compatibility Level and Editor API Compatibility Level settings.
:::

### Recommended Project Settings

To take full advantage of ProStream and the Data Oriented Technology Stack, it is recommended to use the following settings:

| Setting                                                                                                                | Value                                                                                                                                     |
| ---------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------- |
| Scripting Backend                                                                                                      | [IL2CPP](https://docs.unity3d.com/Manual/IL2CPP.html)                                                                                     |
| API Compatibility Level                                                                                                | [.Net Standard 2(.1)](https://docs.unity3d.com/Manual/dotnetProfileSupport.html)                                                          |
| Graphics APIs                                                                                                          | [Vulkan, Metal, or DX11/12](https://docs.unity3d.com/Packages/com.unity.entities.graphics@1.2/manual/requirements-and-compatibility.html) |
| [Incremental GC (Garbage Collection)](https://docs.unity3d.com/Manual/performance-incremental-garbage-collection.html) | Enabled                                                                                                                                   |

<!-- #endregion requirements -->
