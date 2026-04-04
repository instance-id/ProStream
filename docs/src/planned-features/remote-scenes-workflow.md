---
title: RemoteScenes Workflow
description: Multi-scene authoring and processing support for larger ProStream worlds.
---

# RemoteScenes Workflow

<div class="planned-feature-detail-meta">
  <Badge type="tip" text="Advanced prototype" />
  <Badge type="info" text="Code-verified 2026-04-03" />
</div>

<p class="planned-feature-detail-intro">
  The RemoteScenes workflow extends ProStream into multi-scene world building. Instead of forcing all preparation through a single authoring scene, it coordinates referenced scenes as queueable streaming content sources inside the same processing pipeline.
</p>

## Overview

The RemoteScenes workflow is aimed at projects that need to split large environments across multiple authoring scenes while still processing them through ProStream as one streaming-aware content set. It provides scene references, queueing, load/open automation, and per-remote-scene subscene creation so large worlds can be prepared in smaller units without abandoning the core ProStream workflow pipeline.

Primary code anchors:
- `Packages/id.instance.prostream/Shared/Workflows/RemoteScenes/Entrypoint/RemoteSceneWorkflow.cs`
- `Packages/id.instance.prostream/Shared/Workflows/RemoteScenes/Scripts/Runtime/RemoteSceneManager/RemoteSceneWorkflowComponent.cs`
- `Packages/id.instance.prostream/Shared/Workflows/RemoteScenes/Scripts/Runtime/Operation/CreateRemoteSceneSubScenesOp.cs`
- `Packages/id.instance.prostream/Shared/Workflows/RemoteScenes/Scripts/Runtime/RemoteScene/RemoteScene.cs`

## Major Features

- Workflow-driven remote-scene activation and registration.
- Authoring components for referencing and managing external scenes.
- Queue-based processing of multiple remote scenes.
- Optional auto-open and auto-load behavior for editor automation.
- Naming conventions for remote-scene content organization.
- Reset and cleanup logic for generated remote-scene subscenes.
- Scene-by-scene subscene creation integrated with the main process runner.

## Key Systems And Processes

### Remote scene tracking

`RemoteSceneWorkflowComponent` tracks `remoteSceneList`, `remoteSceneProcessQueue`, and a lookup by `ObjectID`. It also enforces scene locking requirements and exposes status checks such as whether remote scenes are loaded. This shows the feature is designed to coordinate multi-scene processing safely in editor workflows.

### Authoring model

`RemoteScene` stores a scene reference, scene identifier, load state, generated subscene list, and derived content bounds. The load helpers can open scenes asynchronously, inspect root objects, and calculate bounds for content selection. That implies a user-facing authoring pattern where remote scenes behave as streaming content sources rather than unrelated additive scenes.

### Subscene creation pipeline

`CreateRemoteSceneSubScenesOp` is the core build operation. It validates setup, ensures modification listeners are active, creates or finds the subscene root, iterates queued remote scenes, loads the targeted remote scene, and processes each scene into generated subscenes. The implementation is tied into progress tracking and process orchestration, which makes it a substantial planned production feature rather than a one-off scene utility.

### Reset and cleanup behavior

The workflow already includes reset tasks that clear generated assets, reset per-scene flags, optionally auto-load scenes again, and clear instance-object collection data. That matters for iterative world building, where users need to rerun generation repeatedly without hand-cleaning previous outputs.

## Why Use the RemoteScenes Workflow?

When building large, collaborative projects, forcing all world data into a single authoring scene quickly creates bottlenecks for version control, memory usage, and team organization. The RemoteScenes Workflow allows you to split your environment across multiple authoring scenes while ProStream processes them into a unified streaming output. This means your level designers, artists, and technical scripters can work concurrently in separate, manageable scenes without breaking the streaming pipeline.

## Current Status

This feature is already tightly integrated with ProStream's core architecture. The backend orchestration, scene tracking, and subscene generation loops are highly developed. Our final steps are focused on polishing the front-end authoring experience, solidifying validation rules, and writing the final documentation before release.