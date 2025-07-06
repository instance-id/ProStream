# Streaming Layers

<snippet id="streaming_layer_id">

## Access Streaming Layers

![pst_3_menuLayerEditor_image_psTutorial.png](pst_3_menuLayerEditor_image_psTutorial.png)

## Streaming Distance Editing

In the <b>Layer Editor</b> menu, you can adjust the distance in which each SubScene layer will load into the scene.

![pst_3_layerDistanceLoad_image_psTutorial.png](pst_3_layerDistanceLoad_image_psTutorial.png)

In the image above, you can see the <b>LargeObject</b> layer has a loading range of <b>0-256.</b>  
This means that if the <b>Loading Trigger</b> (Player, Camera, etc) is 256 units of distance away or less, this SubScene Layer will be loaded.

> The higher the number, the farther away the Loading Trigger can be for the SubScene layer to load.  
> The lower the number, the closer the Loading Trigger must be for the SubScene Layer to load.
>
> {style="note"}

The numeric value in the right-side input box is the current maximum value, and the right-side slider is the current value. Hovering over the slider handle shows what the current distance setting is, and can be dragged left/right to be adjusted.

To raise the value above the current maximum, just input a new value into the right-side input box.

## Persistent Layers

![pst_3_layerEditorPersistent_image_psTutorial.png](pst_3_layerEditorPersistent_image_psTutorial.png)

Layers marked as <b>Persistent</b> are always loaded, and thus, do not need to have a range set.

</snippet>
