# Prerequisites

Before you start, make sure that you have the following:

## Requirements and Notes

- Unity 2022.3.0f1 or later (Unity 6.1 is recommended)
- Scriptable Render Pipeline (SRP) installed and configured (URP or HDRP)
- Scene GameObjects which are not [Prefabs](/core-concepts/importance-of-prefabs) are ignored
- (Recommended) Scene Prefabs are children of an Empty Root-Level Parent GameObject

## Recommended Project Settings

To take full advantage of ProStream and the Data Oriented Technology Stack, it is recommended to use the following settings:

| Setting | Value |
|---------|-------|
| Scripting Backend | [IL2CPP](https://docs.unity3d.com/Manual/IL2CPP.html) |
| API Compatibility Level | [.Net Standard 2.1](https://docs.unity3d.com/Manual/dotnetProfileSupport.html) |
| Graphics APIs | [Vulkan, Metal, and DX11/12](https://docs.unity3d.com/Packages/com.unity.entities.graphics@1.2/manual/requirements-and-compatibility.html) |
| [Incremental GC (Garbage Collection)](https://docs.unity3d.com/Manual/performance-incremental-garbage-collection.html) | Enabled |

![Recommended Settings](/images/ps_recommended_settings.png)
