# Importance Of Prefabs

The Prefab Asset acts as a template from which you can create new Prefab instances in the Scene.

ProStream uses Prefab system to differentiate one GameObject Hierarchy from another.

::: warning Important
All GameObjects must be Prefabs to be compatible with ProStream systems.
Non-Prefab GameObjects are skipped by the matching systems.
:::

As illustrated below, without Prefabs the only distinction between an `Organizational_Object` and a `Complex_GameObject` is the GameObjects name.
While this might be sufficient to visually distinguish between the two, programmatically, they are the same.

![Base Hierarchy](/images/additional/prefabs/base_hierarchy.png)
![Complex vs Organizational](/images/additional/prefabs/complex_vs_organizational.png)

Creating a Prefab removes the ambiguity and outlines a concrete blueprint of what a particular GameObject is and what it should contain.

With this distinction, the ProStream systems can accurately identify and match GameObjects in the scene.
![Clear Distinction](/images/additional/prefabs/clear_distinction.png)

### See Also

- [Unity Prefabs](https://docs.unity3d.com/Manual/Prefabs.html)
