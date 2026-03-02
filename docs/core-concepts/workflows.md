# Core Concepts: Workflows

In ProStream, **Workflows** are modular processing units that handle specialized object types, orchestrate data preparation, and generate spatial data structures. They form the backbone of the "Prepare Scene" and "Create SubScenes" processes.

## What is a Workflow?

Rather than hard-coding a single monolithic pipeline for scene processing, ProStream divides the work into distinct Workflows. A Workflow is responsible for:
1. Identifying a specific subset of objects in your scene (e.g., standard prefabs vs physics colliders).
2. Generating the appropriate spatial data (like a QuadTree grid).
3. Handling the creation and population of SubScenes for those specific objects.

## Key Workflow Components

Understanding workflows involves a few key types:

- **WorkflowAsset:** A `ScriptableObject` that defines the workflow's configuration (e.g., is it active, what are its grid settings).
- **WorkflowComponent:** A `MonoBehaviour` (singleton) in your scene that executes the runtime logic for the workflow.
- **WorkflowContainer:** A central container in your scene that owns and manages all active WorkflowComponents.
- **WorkflowAssetContainer:** A project-wide registry that finds and tracks all WorkflowAssets in your project.

## Built-in Workflows

ProStream currently includes two primary workflows for scene generation:

### 1. InstanceObjectsWorkflow
This is the default, primary workflow for ProStream. 
- It handles standard Unity Prefab instances.
- It is responsible for creating the main spatial **QuadTree**.
- It organizes visual geometry, props, and environment assets into streaming sections (Ground, LargeObjects, etc.).

### 2. ColliderObjectsWorkflow
This workflow is specialized for handling physics colliders.
- It allows you to separate physical collision data from visual geometry.
- It can utilize its own separate QuadTree settings or piggyback on existing data to optimize physics streaming independent of visual streaming.

<!-- Note: DataObjectWorkflow and RemoteSceneWorkflow are currently WIP and will be documented in a future release. -->

## Workflow Lifecycle

Workflows follow a strict lifecycle integrated deeply into the `SceneConnector`.

1. **Discovery:** When the scene is loaded, the `SceneConnector` queries the `WorkflowAssetContainer` to find all active and enabled `WorkflowAsset`s in the project.
2. **Activation:** The `SceneConnector` adds these assets to its internal list.
3. **Instantiation:** For every active workflow, the `WorkflowContainer` creates a child `GameObject` in the scene hierarchy and attaches the corresponding `WorkflowComponent`.
4. **Execution:** During the *Prepare Scene* and *Create SubScenes* operations, the `ProcessRunner` iterates through all active WorkflowComponents and executes their respective stages (`Initialize`, `Execute`, `Cleanup`).

## How Workflows tie into the Main Processes

When you click **Prepare Scene** (Calculate Positions):
- **Phase 1:** Every active workflow is asked to validate its data (`CheckWorkflowObjects()`).
- **Phase 4:** Every active workflow executes its spatial calculations (e.g., generating the QuadTree grid and assigning objects to cells).

When you click **Create SubScenes**:
- The process loops through all active workflows, running them through an `Initialize` -> `Execute` -> `Cleanup` pipeline to physically generate the `.unity` scene files on disk and organize the objects within them.

For information on how to configure these workflows (such as adjusting the QuadTree size), see the [Workflows Configuration Guide](/editor-guide/engines/workflows-configuration).
