# ColliderObjects Workflow

The <QuickInfo preset="terms.colliderobjects-workflow"><code>ColliderObjectsWorkflow</code></QuickInfo> is ProStream's collider-focused workflow. Its job is to prepare and create separate collider-oriented scene data so your streamed visuals can move through ECS conversion while GameObject-based physics interactions remain available where you need them.

This workflow is slightly different from <QuickInfo preset="terms.instanceobjects-workflow"><code>InstanceObjectsWorkflow</code></QuickInfo> in one important way: from a user perspective, you normally turn it on by enabling the Collider modification rather than by treating it as a standalone workflow feature.

## Why it exists

If your visual content is being prepared for Entity SubScenes, but you still need standard Unity colliders for interaction, controller movement, or other GameObject-based physics workflows, ColliderObjects gives you a dedicated collider pipeline.

That makes it useful for scenes where you want to keep the rendered side highly optimized while still preserving a practical collision layer for gameplay systems that are not moving to DOTS physics.

## The important relationship: workflow plus modification

ColliderObjects lives in the Workflows system, but the normal activation path starts in the Modification system.

In practice, the flow is:

1. You enable the **Extract To SubScene** collider modification.
2. That modification subscribes to process events.
3. The modification turns on `ColliderObjectsWorkflow`.
4. The scene creates a `COWorkflowComponent` under the workflow container.
5. That component registers the collider Prepare Scene and Create SubScenes stages.

::: info
This is why ColliderObjects is documented alongside workflows, but it still belongs in the same mental model as the [Modification Engine](../../editor-guide/engines/modification-engine.md). The workflow handles spatial preparation and collider-scene creation. The modification is what exposes the feature as part of the authoring pipeline.
:::

## Start-to-finish flow

### 1. Enable the collider modification

The entry point is the collider modification asset represented in the editor as **Extract To SubScene**.

When that modification is enabled, it performs two important actions:

- it subscribes to ProStream process events
- it enables `ColliderObjectsWorkflow`

When it is disabled, it unsubscribes and turns the collider workflow back off.

This is the practical switch that makes the collider pipeline part of your scene processing.

### 2. Scene registration and workflow setup

Once enabled, the scene's <QuickInfo preset="terms.scene-connector"><code>SceneConnector</code></QuickInfo> can instantiate the `COWorkflowComponent`.

That component then registers two internal stages with the operation system:

- `ColliderObjectGenerateLocationWorkflow` for Prepare Scene
- `CreateColliderScenesWorkflow` for Create SubScenes

The collider workflow also creates and registers its own QuadTree grid, separate from the main InstanceObjects grid.

### 3. Prepare Scene: validate the tracked objects

During **Prepare Scene**, the collider workflow validates the same scene object collection used by the main workflow.

That matters because the collider workflow still begins with the tracked prefab instances in your authoring scene. It does not scan arbitrary objects outside the normal ProStream tracking path.

### 4. Prepare Scene: build collider spatial data

After validation, the collider workflow runs its location-generation stage.

At this point it:

1. Reads the current scene's `InstanceObjectCollection`
2. Builds its own `ColliderObjectQuadTreeGrid`
3. Iterates the collider nodes
4. Packs valid tracked objects into collider `QuadSubSceneData`
5. Stores that data in `SceneConnectorData`
6. Marks the collider workflow as ready for SubScene creation

In the current implementation, this workflow runs before the main InstanceObjects location-generation stage, so its collider spatial preparation is available early in the pipeline.

## Create SubScenes behavior

### 5. Collider scene creation only runs when the modification is present

During **Create SubScenes**, the collider workflow checks whether the collider modification is still in the scene's active modification list.

If it is not, the workflow exits without creating collider scenes.

This protects you from ending up with collider-specific scene output when the modification has been removed from the scene configuration.

### 6. Create collider scene roots and containers

When execution continues, ProStream:

1. finds or creates the scene's `SubSceneRoot`
2. loads the collider workflow's prepared `QuadSubSceneData`
3. creates a `GameObjectSubScene` object for each collider region
4. adds a `ColliderContainer` under each of those scene roots

These collider scenes are separate from the Entity SubScenes created by the InstanceObjects workflow.

### 7. Build grouped collider proxies

For each collider scene, the workflow gathers the source objects referenced by that region and builds collider proxy data.

The main production path in the current implementation is the **Per Quadtree Node** strategy:

- objects are regrouped into smaller node clusters inside the collider scene
- a `ColliderParent` is created for each populated node
- colliders are collected from the source objects in that node
- ProStream builds grouped collider proxies under that node parent
- the workflow can use the jobified collider proxy builder when enabled

This node-based grouping is the path designed for dense scenes where reducing collider-scene hierarchy overhead matters.

::: warning
Use the quadtree-node strategy for production scenes. In the current package, the non-quadtree per-object path is not the fully implemented creation path.
:::

### 8. Remove empty collider scenes

After proxy generation, ProStream removes any collider scene that ended up with no actual colliders.

That avoids creating empty GameObject SubScenes on disk for regions that do not contribute useful collision data.

### 9. Create assets and move objects into scenes

For the remaining collider scenes, ProStream creates the GameObject SubScene assets, refreshes the AssetDatabase, performs deferred initialization, and moves the generated scene objects into those new scenes.

At that point, the collider-side scene output is ready for use alongside the rest of the ProStream scene data.

## What the modification does during Entity SubScene creation

The Collider modification is not only an activation switch. It also participates in the process events during SubScene creation.

Most importantly, if **Remove Original Colliders** is enabled in the modification settings, the modification removes collider components from the visual Entity copies before those objects are moved into the Entity SubScenes.

That is the setting that gives you the cleanest separation between:

- collider-focused GameObject scenes for physics interaction
- lighter visual Entity SubScenes for streaming and conversion

If **Remove Original Colliders** is left disabled, collider-only scenes can still be created, but the visual copies are not automatically stripped in the same way.

## Settings that matter most

The collider workflow settings live in [Workflows Configuration](../../editor-guide/engines/workflows-configuration.md), while the practical on/off behavior comes from the collider modification.

The most important settings are:

- **Use QuadTree**
- **Max Objects Per Node**
- **Max QuadTree Depth**
- **Auto Adjust Max Depth**
- **Use Jobified Collider Builder**
- **Scene Quadtree Divisor**
- **Collider Processing Configuration**
- **Remove Original Colliders** in the collider modification

Together, these let you control both the spatial grouping of colliders and how aggressively ProStream builds optimized collider proxy hierarchies.

## When to use ColliderObjects

ColliderObjects is most useful when:

- your scene is being prepared for Entity SubScenes
- you still need standard Unity physics interactions in streamed regions
- you want collider data partitioned into smaller streaming-aligned chunks
- you want tighter control over how much collision hierarchy remains loaded in dense scenes

## Related guides

- [Workflows Overview](../workflows.md)
- [InstanceObjects Workflow](./instanceobjects-workflow.md)
- [Workflows Configuration](../../editor-guide/engines/workflows-configuration.md)
- [Modification Engine](../../editor-guide/engines/modification-engine.md)
- [Prepare Scene Process](../../processes/prepare-scene.md)
- [SubScene Creation Process](../../processes/process-subscenes.md)