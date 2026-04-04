---
title: DataObjects Workflow
description: Compact prefab-and-instance streaming for repeated content in dense ProStream environments.
---

# DataObjects Workflow

<div class="planned-feature-detail-meta" style="margin-top: 1rem;">
  <Badge type="tip" text="Advanced prototype" />
  <!-- <Badge type="info" text="Code-verified 2026-04-03" /> -->
</div>

<!-- <p class="planned-feature-detail-intro">
  The DataObjects workflow is an optimized repeated-prefab path that stores compact instance data and reconstructs streamed entity instances at runtime.
</p> -->

## Overview

The DataObjects workflow is an optimized prefab-instance workflow that stores a compact representation of repeated objects and then reconstructs runtime entity instances from that data after the relevant subscene sections stream in. The intended result is lower scene duplication, lower build size, and lower runtime memory pressure than the standard InstanceObjects path when the same prefab appears many times across the world.

## Major Features

- Authoring-time capture of per-instance transform data.
- Compact subscene authoring using one prefab-authoring entry per unique prefab and buffered transform data per section.
- Runtime prefab loading and entity spawning from stored transform buffers.
- Section-based cleanup of spawned DataObject entities when a section unloads.
- Dedicated editor management through `DataObjectManager`, selectors, validation, and workflow menus.

## Comparison With InstanceObjects

ProStream offers two distinct workflows for handling SubScene content: `InstanceObjects` and `DataObjects`.

### InstanceObjects Workflow

The standard `InstanceObjects` path is a scene-copy/conversion workflow.

- It groups scene objects into sections.
- ProStream resolves each original scene GameObject and clones the full GameObject hierarchy into the matching subscene section.
- Those cloned GameObjects are then moved into the generated subscene and later converted/baked into ECS entities.

### DataObjects Workflow

The `DataObjects` workflow is materially different.

- It builds a payload around per-instance transform and identity data such as position, rotation, scale, and object IDs.
- During subscene creation, the workflow creates compact authoring objects that represent prefab definitions and section transform buffers instead of cloning every placed scene instance into the subscene.
- At runtime, the systems load the referenced prefab once for the streamed scene/section and then instantiate entity instances purely from the stored transform buffer.

## Benefits Compared To InstanceObjects

### Lower subscene duplication

InstanceObjects duplicates full GameObject hierarchies into the generated subscenes. DataObjects instead stores one prefab definition path plus per-instance transform data. When many repeated objects use the same prefab, that is substantially more compact.

### Lower build size potential

Because repeated scene instances are represented as buffered transform data rather than as repeated cloned GameObject hierarchies, the amount of authored scene content that must be serialized into subscenes should be lower for heavily repeated content.

### Lower runtime memory pressure

The DataObject path is designed so the runtime only needs the prefab reference plus spawned entity instances for the currently streamed sections. That avoids carrying around as much duplicated authoring-time object structure.

### Better fit for repeated world content

The workflow is especially well suited for content categories like repeated props, vegetation-style placements, clutter sets, and modular reusable objects where many placements share the same source prefab.

### Cleaner separation between definition and placement

DataObjects splits the concept of:

- the reusable object definition, and
- the many placements of that object across the world.

That separation is useful for both performance and content management.

## When To Choose DataObjects vs InstanceObjects

### Choose DataObjects when

- The same prefab appears many times across the scene or world.
- You want to reduce duplicated subscene content.
- You care strongly about build size and runtime memory efficiency.
- The object can be represented cleanly as a prefab definition plus transform-driven instances.
- You want a more data-oriented streaming model for repeated content.

### Choose InstanceObjects when

- You want the most direct and currently proven workflow for general scene-object conversion.
- Each object is relatively unique, so the duplication savings of DataObjects would be small.
- The source object hierarchy, authoring state, or per-instance uniqueness makes straight copying simpler.
- You need the default workflow path that mirrors the original scene structure more directly.

## Why Use DataObjects?

When working with highly dense and populated environments, simple scene copying can create exceedingly heavy subscenes and bloated build outputs. The DataObjects workflow introduces a true reusable-content streaming pipeline, giving you a powerful tool for optimizing complex scenes filled with repeated props, foliage, or modular authored objects. Instead of duplicating thousands of complex GameObject hierarchies, it actively minimizes memory overhead and build sizes by keeping your repeating assets strictly as references.

Put simply:

- **InstanceObjects** is the straightforward, full-hierarchy conversion workflow best for unique objects.
- **DataObjects** is the optimized, repeated-prefab workflow best for instanced density.

Having both workflows lets you choose the exact streaming pipeline that perfectly matches the needs of your scene architecture.

## Current Status

This feature is deep in internal development:

- The core workflow registration and quad-tree location generation path is active.
- Compact subscene authoring is implemented.
- Prefab loading and spawn systems are functioning efficiently.
- Unloaded section memory cleanup is operational.

We are currently refining the user interface, improving edge-case validation, and writing the final documentation before making this workflow fully available in a future update.
