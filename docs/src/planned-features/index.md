---
title: Planned Features
description: Advanced feature tracks that expand ProStream beyond the core shipping workflow.
---

<div class="planned-features-hero">
  <p class="planned-features-eyebrow">Expected roadmap</p>
  <h1>Planned Features</h1>
  <p class="planned-features-lead">
    These feature tracks represent larger ProStream capabilities that already exist as meaningful prototypes,
    advanced subsystems, or modules waiting for integration. They will expand ProStream into a broader world-building and streaming toolchain.
  </p>
  <div class="planned-features-meta">
    <div class="planned-features-metric">
        <strong>Roadmap Priority</strong>
        <span>Evaluated based on overall technical viability and user feedback.</span>
    </div>
    <div class="planned-features-metric">
      <strong>Feature tracks</strong>
      <span>Workflow, terrain, visibility, and rendering expansion areas.</span>
    </div>
    <!-- <div class="planned-features-metric">
      <strong>Code-verified snapshot</strong>
      <span>Based on the package state reviewed on 2026-04-03.</span>
    </div> -->
    <!-- <div class="planned-features-metric">
      <strong>Buyer-facing signal</strong>
      <span>Shows the depth of existing R&amp;D already surrounding ProStream.</span>
    </div> -->
  </div>
</div>

::: info What this section means
These pages document feature areas that are either already partially implemented, archived while being refactored, or planned to return as product-facing ProStream capabilities. They are useful for evaluating the direction and technical depth of the asset, but they should not be read as promises of immediate shipping scope.

**There is no current timeline or guarantee that these features will be released and included in ProStream unless explicitly stated.**
:::

## Why these features matter

<div class="planned-features-grid">
  <div class="planned-feature-card">
    <h3>Build/Runtime reductions</h3>
    <p>DataObjects reduce memory usage and build size. Resulting in compact, data-only GameObject representations to drastically reduce MonoBehaviour overhead.</p>
  </div>
  <div class="planned-feature-card">
    <h3>Terrain-native streaming</h3>
    <p>Terrain generation, mesh conversion, and detail streaming outline a path for bringing Unity Terrain into the same streaming-first architecture as the rest of the package.</p>
  </div>
  <div class="planned-feature-card">
    <h3>Smarter rendering systems</h3>
    <p>Visibility culling and impostor baking show how ProStream can expand from scene preparation into runtime visibility and long-range rendering optimization.</p>
  </div>
</div>

## Feature Summary

<div class="planned-features-table-wrapper">

| Feature                                                   | Status                                                                                | Description                                                                                                                                                                                   | Why it matters                                                                                                                                      |
| --------------------------------------------------------- | ------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| [DataObjects workflow](./dataobjects-workflow.md)         | <span class="planned-status planned-status--advanced">Advanced prototype</span>       | Stores reusable prefab definitions plus transform data, then spawns streamed entity instances from compact section buffers instead of copying every full GameObject into generated subscenes. | Reduces runtime overhead, minimizes duplication, and actively shrinks build sizes and memory footprint.                                             |
| [RemoteScenes workflow](./remote-scenes-workflow.md)      | <span class="planned-status planned-status--advanced">Advanced prototype</span>       | Splits preparation work across referenced scenes so complex environments can be processed in smaller scene units without leaving the core ProStream workflow pipeline.                               | Eases Editor memory pressure and speeds up iteration when working with dense, heavily populated environments.                                       |
| [Terrain System](./terrain-system.md)                     | <span class="planned-status planned-status--substantial">Substantial prototype</span> | A comprehensive pipeline for chunking and rendering Unity Terrain environments into highly optimized, streaming-friendly ECS content.                                                               | Replaces memory-heavy monolithic Unity Terrain, automating scanning, mesh conversion, and proximity detail streaming to maximize runtime performance. |
| [Visibility and frustum culling](./visibility-culling.md) | <span class="planned-status planned-status--beta">Beta-level subsystem</span>         | Extracts camera frustum planes and applies section-level visibility culling so streamed terrain and scene sections can react to what the camera can actually see.                             | Can provide a significant increase in runtime efficiency by intelligently unloading dense environments when they move off-screen.                   |
| [Impostor baking](./impostor-baking.md)                   | <span class="planned-status planned-status--archived">WIP module</span>               | Bakes complex meshes into multi-frame impostor atlases and materials for aggressive long-range rendering optimization.                                                                        | Vastly improves long-distance optimization for foliage, structures, and complex world geometry without high polygon counts.                         |

</div>

## Roadmap Ahead

These planned features are designed to expand ProStream into a comprehensive, world-building and streaming toolchain:

- **DataObjects:** Native workflows for reusable prefab placement and rapid runtime spawning.
- **RemoteScenes:** Scalable processing for dense environments and multi-scene authoring pipelines.
- **Terrain System:** Turnkey terrain conversion pipeline for automated spatial mapping, chunked mesh generation, and robust proximity-driven detail streaming.
- **Visibility Culling:** Frustum-aware systems for intelligent, view-dependent section activation.
- **Impostors:** Atlas baking for ultra-optimized long-range rendering of complex assets.

::: tip Offline/PDF note
The offline PDF includes this landing page only. Feature links in that export are automatically rewritten to the live documentation site so the packaged manual stays focused while still giving readers a way to inspect the deeper technical pages online.
:::
