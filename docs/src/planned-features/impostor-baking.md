---
title: Impostor Baking
description: Atlas-based long-range impostor generation for aggressive distant-object rendering savings.
---

# Impostor Baking

<div class="planned-feature-detail-meta">
  <Badge type="danger" text="Archived WIP module" />
  <Badge type="info" text="Code-verified 2026-04-03" />
</div>

<p class="planned-feature-detail-intro">
  Impostor baking adds a long-range rendering optimization story to ProStream by turning complex distant objects into much cheaper atlas-driven billboard representations while preserving multiple view angles.
</p>

## Overview

The impostor module is aimed at baking complex 3D objects into atlas-based billboard representations that preserve multiple view angles. This would let ProStream users replace expensive distant geometry with much cheaper impostor meshes and materials, improving long-range rendering performance for complex assets.

Primary code anchors:
- `Removed_Packages/WIP_Features/id.instance.prostream/SharedFeatures/Impostors/Runtime/Scripts/Impostors/ImpostorGenerator.cs`
- `Removed_Packages/WIP_Features/id.instance.prostream/SharedFeatures/Impostors/Runtime/Scripts/Settings/ImpostorSettings.cs`
- `Removed_Packages/WIP_Features/id.instance.prostream/SharedFeatures/Impostors/Runtime/Scripts/ImpostorManager.cs`
- `Removed_Packages/WIP_Features/id.instance.prostream/SharedFeatures/Impostors/Runtime/Scripts/Drawer/Drawer.cs`

## Major Features

- Impostor atlas baking from a source GameObject hierarchy.
- Octahedron and hemi-octahedron capture modes.
- Configurable atlas resolution and frame count.
- Texture baking for albedo, normals, metallic/smoothness, emissive, and depth.
- Material and mesh generation for the baked impostor result.
- Support for custom impostor meshes and multiple render pipelines.

## Key Systems And Processes

### Impostor generation pipeline

`ImpostorGenerator.Run(...)` validates source renderers, computes camera-facing capture matrices, calculates diameter and depth for the source model, bakes texture atlases, and creates a new impostor GameObject. The module is already structured as a reusable API, which makes it more than a proof-of-concept shader experiment.

### Texture and material baking

The baking path captures multiple render targets and packs them into generated texture assets. The code and shader layout show support for albedo/occlusion, metallic/smoothness, normals, emissive, and depth-style outputs, which is consistent with a serious impostor workflow rather than a single diffuse billboard.

### Render-pipeline support

The module includes legacy/common, URP, ShaderGraph, and conditional HDRP shader paths. That suggests the feature was intended to be broadly usable across rendering setups, which is important for an Asset Store feature.

### Authoring controls

`ImpostorSettings` exposes key user-facing controls such as `framesXY`, `resolution`, and impostor type. Combined with the manager/container classes, that points toward an intended authoring workflow instead of a hidden internal utility.

## Why Use Impostor Baking?

When building large, open streaming worlds, rendering distant complex geometry (like dense forests or detailed city skylines) can quickly bottleneck performance. The Impostor Baking module allows you to aggressively optimize long-range rendering by replacing expensive distant models with minimal atlas-driven billboards that visually preserve multiple viewing angles. This ensures your scene looks dense and rich from afar while drastically lowering draw calls and polygon counts.

## Current Status

The core baking logic, texture generation, and pipeline support for this feature have been established. However, this module is currently archived as a Work In Progress while we prioritize other core streaming enhancements. It will require further refinement before being fully integrated into the standard ProStream toolset.