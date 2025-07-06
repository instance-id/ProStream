
---
Category: Setup
Title: SceneConnector
Order: 1
---
# SceneConnector

The SceneConnector is a component that is used as the main connecting point for the ProStream systems.

## Loading Trigger

---
The Loading Trigger position value is used to determine when a SubScene (and layers) loads and unloads from the world.
While it is not necessary for the **Loading Trigger** to be a Player Character (it can be a Camera, NPC Object, etc) it is necessary for the loading system to operate properly.

>**If this field is left empty, when the system starts, it will attempt to locate and use Camera.main as the Loading Trigger.**

## Search Filter

----

<hr/>

When the Search Filter field is populated, and the RuleEngine Match system runs, matches are restricted to child GameObjects of the Search Filter GameObject.

>**If no GameObjects are assigned to the **Search Filter** list, the system will attempt to match against all GameObjects in the hierarchy.**   
>
> This is typically undesired as this could include Cameras, Lighting, Light Probes, etc, and any number of things that you might wish to keep in the main parent scene.

![Image](5_sceneConnectorFields_image_psDoc.png)
