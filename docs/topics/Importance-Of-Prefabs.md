# Importance Of Prefabs

> All GameObjects must be Prefabs to be compatible with ProStream systems.  
> The Prefab system is used to differentiate one GameObject Hierarchy from another.  
> Non-Prefab GameObjects are skipped by the matching systems.
> {style="note"}

As illustrated below, without Prefabs the only distinction between an `Organizational_Object` and a `Complex_GameObject` is the GameObjects name.
While this might be sufficient to visually distinguish between the two, programmatically, they are the same.

![base_hierarchy.png](base_hierarchy.png){max-width="200" style="inline"} ![complexvsorganizational.png](complexvsorganizational.png){max-width="200" style="inline"}

Creating a Prefab removes the ambiguity and outlines a concrete and reliable blueprint of what a particular GameObject is and what it should contain.

With this distinction, the ProStream systems can accurately identify and match GameObjects in the scene.

![clear_distinction.png](clear_distinction.png){max-width="300" thumbnail="true"}
