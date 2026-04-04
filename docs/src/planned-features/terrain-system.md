---
title: Terrain System
description: A comprehensive, streaming-first pipeline for seamlessly integrating, chunking, and rendering large-scale Unity Terrain environments.
---

# Terrain System

<div class="planned-feature-detail-meta">
  <Badge type="tip" text="Substantial prototype" />
</div>

<p class="planned-feature-detail-intro">
  At this time, native Unity Terrain is still incompatible with current ECS workflows. The ProStream Terrain System is meant to bridge this gap by transforming standard Unity Terrains into a chunked, LOD-aware, and highly serialized mesh format that speaks ProStream's native streaming language.
</p>

## Overview

The Terrain System is an overarching pipeline designed to help expansive landscapes load modularly and seamlessly alongside optimized subscene props, without causing CPU or memory spikes. It is architected into three main procedural stages:

1. **Location Generation:** Automatically scanning and mapping terrain content into the ProStream streaming grid.
2. **Mesh Pipeline:** Converting standard terrains into chunked, serialized ECS-ready meshes.
3. **Detail Streaming:** Dynamically rendering trees, rocks, and scatter instances strictly within player proximity.

---

## 1. Terrain Location Generation (Spatial Mapping)

Handling endless, seamless terrain efficiently requires an automated understanding of where every slice of terrain data actually lives. The location generation layer removes the manual burden of classifying terrain chunks.

### Key Capabilities
- **Automated Scanning:** Identifies and extracts terrain-objects from prepared scene content, calculating precise bounds for localized processing.
- **Grid Placement:** Maps the terrain onto the ProStream spatial grid, computing placement data through match-job integration.
- **Pipeline Groundwork:** Feeds terrain-aware location results directly into scene data, selection groups, and validation passes, laying a rock-solid foundation for advanced splitting and mesh conversion.

---

## 2. Terrain Mesh Pipeline (Chunking & Conversion)

Once terrain is spatially mapped, the mesh pipeline converts it into streaming-friendly ECS content. Instead of keeping a monolithic Unity Terrain object active, this stage translates the terrain into distinct, manageable data chunks.

### Key Capabilities
- **LOD-Driven Generation:** Chunks terrain cells and computes multiple LOD levels for each section.
- **Data Serialization:** Exports textures, detail materials, and highly compressed serialized terrain assets for standalone loading.
- **ECS Integration:** Creates ECS archetypes for heightmaps and terrain entities. In-depth processing turns heightmaps into array-driven render meshes directly available for Burst-compiled systems.
- **Performance Control:** Significantly lowers runtime overhead and allows granular control over loading priorities and memory allocation.

---

## 3. Terrain Detail Streaming (Vegetation & Scatter)

Dense vegetation, rocks, and surface details easily become the heaviest drag on a rendering pipeline in large outdoor scenes. The detail streaming subsystem replaces static, always-on scatter meshes with a highly efficient proximity-based streaming solution.

### Key Capabilities
- **Radius-Based Streaming:** Uses ECS jobified instantiation and destruction to load and unload numerous detail instances strictly within the active loading camera radius.
- **Proximity Control:** Configurable terrain render settings ensure trees and rocks behave dynamically rather than strictly conforming to distance boundaries alone.
- **Data Extensibility:** Utilizes internal prototype-placement containers and HLOD-style data structures, preparing environments for even more advanced optimization patterns.

---

## Current Status

This robust, end-to-end procedural pipeline is undergoing substantial active development. The underlying logic for automated spatial mapping, grid-placement, mesh chunking, and detail loading have solid architectural foundations.

We are currently working to merge these historically siloed components together and seamlessly integrate them into the primary ProStream workflow architecture, modern ECS pipelines, and tooling standards for full production readiness.
