# Prerequisites

------
<snippet id="prerequisites_id">

Before you start, make sure that you have the following:

<table>
    <tr>
        <th>Requirements and Notes</th>
    </tr>
    <tr>
        <td>

- Unity 2022.3.0f1 or later (Unity 6.1 is recommended)
- Scriptable Render Pipeline (SRP) installed and configured (URP or HDRP)
- Scene GameObjects which are not <a href="importance-of-prefabs.md" summary="Importance of Prefabs">Prefabs</a> are ignored
- (Recommended) Scene Prefabs are children of an Empty Root-Level Parent GameObject

</td>
    </tr>
</table>

</snippet>

## Recommended Project Settings

<snippet id="recommended_settings_id">

To take full advantage of ProStream and the Data Oriented Technology Stack, it is recommended to use the following settings:

<table>
  <tr>
    <th>Setting</th>
    <th>Value</th>
  </tr>
  <tr>
    <td>Scripting Backend</td>
    <td><a href="https://docs.unity3d.com/Manual/IL2CPP.html">IL2CPP</a></td>
  </tr>
  <tr>
    <td>API Compatibility Level</td>
    <td><a href="https://docs.unity3d.com/Manual/dotnetProfileSupport.html" summary="Unity .NET profile support">.Net Standard 2.1</a></td>
  </tr>
  <tr>
    <td>Graphics APIs</td>
    <td><a href="https://docs.unity3d.com/Packages/com.unity.entities.graphics@1.2/manual/requirements-and-compatibility.html" summary="Entities Graphics Requirements and Compatibility">Vulkan, Metal, and DX11/12</a></td>
  </tr>
  <tr>
    <td><a href="https://docs.unity3d.com/Manual/performance-incremental-garbage-collection.html" summary="Unity Incremental GC Documentation">Incremental GC (Garbage Collection)</a></td>
    <td>Enabled</td>
  </tr>
</table>

![ps_recommended_settings_1.png](ps_recommended_settings.png)

</snippet>
