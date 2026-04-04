---
title: Visibility and Frustum Culling
description: View-aware streamed section activation using frustum extraction and section visibility jobs.
---

# Visibility And Frustum Culling

<div class="planned-feature-detail-meta">
  <Badge type="info" text="Beta-level subsystem" />
  <Badge type="info" text="Code-verified 2026-04-03" />
</div>

<p class="planned-feature-detail-intro">
  Visibility and frustum culling are the clearest path for moving ProStream beyond pure distance thresholds. Instead of activating content only by range, these systems make streamed sections react to what the camera can actually see.
</p>

## Overview

The visibility and frustum culling feature area is intended to make streamed content react not only to distance, but also to what the camera can actually see. It combines frustum extraction with section-level visibility assignment so terrain chunks and scene sections can be hidden or marked visible based on view intersection.

Primary code anchors:
- `_bak/runtime/scripts/features/streaming/systems/CameraFrustumSystem/CameraFrustumSystem.cs`
- `_bak/runtime/scripts/features/streaming/systems/Visibility/SectionVisibilitySystem.cs`
- `_bak/runtime/scripts/features/streaming/sceneoperations/TerrainSystem/Components/FrustumPlaneComponent.cs`
- `_bak/runtime/scripts/features/streaming/sceneoperations/TerrainSystem/Components/EntityVisible.cs`

## Major Features

- Camera frustum plane extraction into ECS-readable singleton data.
- Trigger-position tracking for camera-relative systems.
- Section-level frustum intersection tests with Burst-compatible jobs.
- Visibility state assignment using ECS components.
- Debug drawing hooks for bounds inspection and validation.

## Key Systems And Processes

### Camera frustum extraction

`CameraFrustumSystem` creates singleton entities for trigger position and frustum plane data, updates those values from the active camera every frame, and stores plane arrays in native containers that other jobs can consume. It also includes optional debug drawing for entity bounds, which is useful when validating culling behavior.

### Section visibility assignment

`SectionVisibilitySystem` requires frustum data and section bounding volumes, schedules a culling job against all scene-section entities, and then uses command-buffer updates to toggle visibility state. The implementation is focused on section-level results, which makes it a strong fit for streamed subscene content.

### Terrain and streaming relationship

This feature is closely related to the terrain pipeline because the terrain system defines `FrustumPlaneComponent`, `BoundsProxy`, and `EntityVisible` data that visibility systems can act on. It is also adjacent to terrain detail loading, where view-aware logic can reduce needless work for off-screen content.

## Why Use Visibility and Frustum Culling?

Strict radial streaming is great, but loading thousands of objects behind the player wastes memory and draw calls. Visibility and frustum culling makes streamed sections react specifically to what the active camera can actually see. By combining frustum extraction with section-level visibility jobs, ProStream intelligently unloads or deprioritizes dense terrain chunks and subscenes when they move off-screen, potentially providing a significant increase in runtime efficiency for detailed open worlds.

## Current Status

We have built strong Burst-compiled job structures and frustum-plane extraction systems as beta-level tech, which already succeed at section-level intersection testing. We are currently working on hardening these systems and integrating them smoothly into the modern streaming pipeline alongside terrain and detail instancing features.