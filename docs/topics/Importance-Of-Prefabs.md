# Importance Of Prefabs

The Prefab Asset acts as a template from which you can create new Prefab instances in the Scene.  

ProStream uses Prefab system to differentiate one GameObject Hierarchy from another.

> All GameObjects must be Prefabs to be compatible with ProStream systems.  
> Non-Prefab GameObjects are skipped by the matching systems.
> {style="note"}

As illustrated below, without Prefabs the only distinction between an `Organizational_Object` and a `Complex_GameObject` is the GameObjects name.
While this might be sufficient to visually distinguish between the two, programmatically, they are the same.

![base_hierarchy.png](base_hierarchy.png){max-width="200" style="inline"} ![complexvsorganizational.png](complexvsorganizational.png){max-width="200" style="inline"}

Creating a Prefab removes the ambiguity and outlines a concrete blueprint of what a particular GameObject is and what it should contain.

With this distinction, the ProStream systems can accurately identify and match GameObjects in the scene.

![clear_distinction.png](clear_distinction.png){max-width="300" thumbnail="true"}

<seealso>
    <category ref="addInfo">
        <a href="https://docs.unity3d.com/Manual/Prefabs.html">Unity Prefabs</a>
    </category>
</seealso>
