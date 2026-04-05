---
title: Known Limitations
description: Current DOTS/ECS constraints that affect ProStream workflows, hybrid integrations, and production planning.
---

# Known Limitations

## DOTS/ECS Limitations and Existing/Planned ProStream Solutions:

1. World & Environment

   **Physics Interaction**: The Unity Physics (DOTS) and standard PhysX (GameObjects) systems are isolated. Entities cannot natively collide with GameObjects unless data is manually synced across systems.
   [ProStream's ColliderObjects Workflow](/core-concepts/workflow-guides/colliderobjects-workflow) provides a streamlined solution for this.

   **Terrain**: Standard Unity Terrains are not currently supported by DOTS/ECS andcannot be directly converted into high-performance ECS entities.
   [ProStream's TerrainWorkflow](/planned-features/terrain-system.html) is in development to address this gap.
   [Native Engine Implementations/Plans](https://unity.com/roadmap/detail#unity-platform-dots)

   **2D Tools**: Most of the URP 2D suite—including Tilemaps, 2D Lights, and 2D Colliders—is not supported in a pure ECS pipeline.

2. Character & Animation

   No Native Animator: There is no ECS-equivalent to the standard Animator Controller or State Machine. Developers must use "Hybrid" workflows (syncing a GameObject Animator to an Entity) or custom vertex/GPU skinning solutions.

   Skinned Mesh Deformations: Standard Skinned Mesh Renderers require a specific baking process to work with Entities Graphics and may still face performance bottlenecks compared to custom GPU-based solutions.

3. Navigation & AI

   NavMesh Agents: The built-in NavMeshAgent component does not exist in ECS. While you can query NavMesh data, the movement and path-following logic must be manually implemented in a System.

4. Visual & Audio Systems

   Particle Systems: The classic Shuriken Particle System is unsupported for entities. Users are encouraged to use the VFX Graph, though previewing them in subscenes can be limited depending on editor settings.

   Audio: Native AudioSource and AudioListener components do not exist in ECS. Audio must be handled on the main thread via GameObjects, typically triggered by Entity "events".

5. Asset & Data Management

   Blittable Data Only: Components must be "blittable" (structs with primitive types). They cannot directly store managed types like Strings, Classes, or Managed Arrays.

   Addressables & SubScenes: Assets within an ECS SubScene cannot be marked as Addressables, as the Entities content management system replaces traditional Addressable Groups for those scenes.

   Entity IDs: Unlike InstanceID, EntityId is not a stable integer and its internal representation is subject to change, making it unreliable for traditional integer-based lookups or sorting.

6. UI & Input

   Main Thread UI: Both UGUI and UI Toolkit run strictly on the main thread. Accessing ECS data for UI display requires manual synchronization, which can lead to performance "spikes" if not handled carefully.

   Input System: There is no auto-generated "InputComponent." Input data must be polled on the main thread and manually written into an Entity component for use in ECS Systems.
