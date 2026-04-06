export interface QuickInfoPreset {
  title?: string;
  definition: string;
}

export const quickInfoPresets: Record<string, QuickInfoPreset> = {
  'planned-feature-stage.substantial-prototype': {
    title: 'Substantial prototype',
    definition: 'Core architectural work and major pipeline pieces already exist, but the system is still being consolidated into the main ProStream workflow and is not yet fully production-ready.'
  },
  'planned-feature-stage.advanced-prototype': {
    title: 'Advanced prototype',
    definition: 'A meaningful portion of the workflow already exists and has been proven in focused use cases, but broader tooling, integration, and production hardening are still in progress.'
  },
  'planned-feature-stage.beta-subsystem': {
    title: 'Beta subsystem',
    definition: 'The subsystem is relatively mature and usable for guided testing, but it still requires validation, refinement, and edge-case coverage before being treated as fully stable.'
  },
  'planned-feature-stage.wip-module': {
    title: 'WIP module',
    definition: 'The module is actively under construction. Core behavior, APIs, and workflow details may still change as implementation continues.'
  },
  'terms.spatial-mapping': {
    title: 'Spatial mapping',
    definition: 'The process of identifying terrain or scene content boundaries and aligning that content to ProStream grid locations so it can be streamed and processed in discrete sections.'
  },
  'terms.detail-streaming': {
    title: 'Detail streaming',
    definition: 'A streaming approach for trees, rocks, foliage, and other scatter content where detail instances are loaded only when they are relevant to the active camera area.'
  },
  'terms.hlod': {
    title: 'HLOD',
    definition: 'Hierarchical level of detail, a strategy that replaces many distant objects with simpler grouped representations to reduce rendering and memory cost.'
  },
  'terms.dataobjects': {
    title: 'DataObjects',
    definition: 'A ProStream workflow for repeated prefab content that stores reusable prefab references and compact per-section transform data, then spawns instances at runtime instead of cloning full hierarchies into every subscene.'
  },
  'terms.instanceobjects': {
    title: 'InstanceObjects',
    definition: "ProStream's default scene-object workflow. It performs the main spatial organization pass, generates section boundaries, and creates subscene content by copying matched scene hierarchies into the appropriate sections for later ECS conversion."
  },
  'terms.dataobject-manager': {
    title: 'DataObjectManager',
    definition: 'An editor-side ProStream management window for the DataObjects workflow. It is used to inspect and manage DataObject-related settings, validation, and workflow tooling during authoring.'
  },
  'terms.scene-connector': {
    title: 'SceneConnector',
    definition: 'The main ProStream scene bridge component. It stores scene-level references, workflow state, matching data, and conversion progress so editor tools and runtime systems can operate on the current scene.'
  },
  'terms.workflow-asset': {
    title: 'WorkflowAsset',
    definition: 'The base asset type for ProStream workflows. A WorkflowAsset controls whether a workflow is available, active, and configured for scene processing.'
  },
  'terms.workflow-component': {
    title: 'WorkflowComponent',
    definition: "The scene-side runtime/editor component created from an active workflow asset. It performs that workflow's actual processing stages inside the current scene."
  },
  'terms.workflow-container': {
    title: 'WorkflowContainer',
    definition: 'A scene container that owns and manages the active workflow components created for the current SceneConnector.'
  },
  'terms.workflow-asset-container': {
    title: 'WorkflowAssetContainer',
    definition: 'A project-level registry that discovers and tracks available ProStream workflow assets so the active scene can enable and instantiate them.'
  },
  'terms.rule-engine': {
    title: 'RuleEngine',
    definition: 'The base ScriptableObject system for ProStream match rules. RuleEngine assets evaluate scene objects and assign them to streaming layers or sections.'
  },
  'terms.modification-engine': {
    title: 'ModificationEngine',
    definition: 'The base ScriptableObject system for ProStream modifications. ModificationEngine assets transform or clean up matched objects at specific points in the processing pipeline.'
  },
  'terms.scene-search-filter': {
    title: 'SceneSearchFilter',
    definition: 'A component that defines which hierarchy roots ProStream should search and track. It scopes matching to selected parts of the scene and manages the tracked prefab set beneath them.'
  },
  'terms.match-tracker': {
    title: 'MatchTracker',
    definition: 'A tracking component ProStream adds to searchable prefab instances. It stores match status, rule results, and assigned section information during processing.'
  },
  'terms.validation-engine': {
    title: 'ValidationEngine',
    definition: 'The validation coordinator used during Prepare Scene. It runs registered checks against tracked objects, caches the results, and reports issues before conversion continues.'
  },
  'terms.diagnostic-engine': {
    title: 'DiagnosticEngine',
    definition: 'An editor-side diagnostic asset that performs targeted checks and optional fixes outside the normal conversion pipeline, such as missing materials or incompatible shaders.'
  },
  'terms.subscene-data-component': {
    title: 'SubSceneDataComponent',
    definition: 'A ProStream component attached to generated SubScene GameObjects. It stores metadata and references needed to manage that subscene in the scene hierarchy and streaming pipeline.'
  },
  'terms.subscene-section': {
    title: 'SubSceneSection',
    definition: 'A ProStream component attached to generated section GameObjects inside a subscene. It represents one layer/section grouping and carries section-level metadata for baking and streaming.'
  },
  'terms.loading-distance-system': {
    title: 'LoadingDistanceSystem',
    definition: 'A runtime ECS system that updates per-layer loading ranges. It lets code adjust streaming distances while the game is running without rebuilding subscenes.'
  },
  'terms.instanceobjects-workflow': {
    title: 'InstanceObjectsWorkflow',
    definition: 'The default ProStream workflow for standard placed scene objects. It generates the main spatial partitioning data and creates streaming-ready subscene content from matched hierarchies.'
  },
  'terms.colliderobjects-workflow': {
    title: 'ColliderObjectsWorkflow',
    definition: 'An optional ProStream workflow focused on collider content. It creates dedicated collider-oriented subscene data so physics can remain available without keeping full visual hierarchies active.'
  },
  'terms.subscene-root': {
    title: 'SubSceneRoot',
    definition: 'The generated parent object that manages created ProStream subscenes in the scene hierarchy. It keeps track of subscene references and supports loading, unloading, and related subscene management actions.'
  },
  'terms.streaming-manager': {
    title: 'StreamingManager',
    definition: 'The main scene-side runtime streaming bridge. It stores the loading trigger, layer data, and enable toggles that control ProStream entity and GameObject streaming behavior.'
  },
  'terms.layer-loading-ranges': {
    title: 'LayerLoadingRanges',
    definition: 'The ECS data container that stores the current per-layer loading distance ranges used by ProStream streaming systems. Updating it changes when sections can load or unload.'
  },
  'terms.streaming-systems-config': {
    title: 'StreamingSystemsConfig',
    definition: 'The ECS singleton that carries runtime streaming state such as trigger position, ready state, and load or unload toggles from managed scene data into the streaming systems.'
  },
  'terms.subscene-loading-system': {
    title: 'SubSceneLoadingSystem',
    definition: 'The runtime ECS system that evaluates entity subscenes against the current loading ranges and requests loads when the trigger is within the valid distance window.'
  },
  'terms.subscene-unloading-system': {
    title: 'SubSceneUnloadingSystem',
    definition: 'The runtime ECS system that unloads entity subscenes after they move beyond the configured unload threshold, helping ProStream release memory as the trigger moves away.'
  },
  'terms.remote-scene-workflow-component': {
    title: 'RemoteSceneWorkflowComponent',
    definition: 'The scene-side workflow component for the RemoteScenes pipeline. It tracks remote scene entries, processing queues, scene-lock requirements, and related authoring behavior for multi-scene preparation.'
  },
  'terms.create-remote-scene-subscenes-op': {
    title: 'CreateRemoteSceneSubScenesOp',
    definition: 'The operation that drives remote-scene subscene generation. It validates setup, loads queued remote scenes, and processes them into generated ProStream subscenes as part of the build pipeline.'
  },
  'terms.process-runner': {
    title: 'ProcessRunner',
    definition: 'The central ProStream process orchestrator. It locates the current SceneConnector and runs the major scene-processing operations that drive setup, preparation, subscene creation, and reset workflows.'
  },
  'terms.match-by-search-query': {
    title: 'MatchBySearchQuery',
    definition: 'A RuleEngine provider that uses Unity Search queries to match scene objects and assign them to ProStream layers or sections.'
  },
  'terms.match-by-goql-rule': {
    title: 'MatchByGOQLRule',
    definition: "A RuleEngine provider that uses ProStream's GameObject Query Language for more advanced object-matching rules than standard Unity Search queries."
  },
  'terms.match-by-component': {
    title: 'MatchByComponent',
    definition: 'A manual-match rule type that uses the ManualAssignment component to assign objects to a target section before query-based rules run.'
  },
  'terms.match-by-default': {
    title: 'MatchByDefault',
    definition: 'The catch-all ProStream rule that matches anything left over after higher-priority rules have run, ensuring unmatched objects can still be assigned to a section.'
  },
  'terms.instance-object-quadtree-grid': {
    title: 'InstanceObjectQuadTreeGrid',
    definition: 'The quad-tree grid builder used by the InstanceObjects workflow to partition matched scene content into spatial cells for future subscene generation.'
  },
  'terms.object-section-details': {
    title: 'ObjectSectionDetails',
    definition: "The per-object data record ProStream generates during Prepare Scene to store an object's section assignment, position, prefab reference, and related spatial metadata."
  },
  'terms.quad-subscene-data': {
    title: 'QuadSubSceneData',
    definition: 'The generated data structure that represents one quad-tree cell and its assigned object and section breakdown, later used to build physical subscene assets.'
  },
  'terms.streaming-systems-initializer': {
    title: 'StreamingSystemsInitializer',
    definition: 'The managed runtime bridge that initializes streaming prerequisites and pushes scene-side state, such as trigger position and streaming toggles, into the ECS configuration used by loading and unloading systems.'
  },
  'terms.remote-scene': {
    title: 'RemoteScene',
    definition: 'A remote-scene entry used by the RemoteScenes workflow. It stores the referenced scene, load state, derived content bounds, and any generated subscenes associated with that source scene.'
  },
  'terms.camera-frustum-system': {
    title: 'CameraFrustumSystem',
    definition: 'A runtime system that extracts the active camera frustum and trigger-position data into ECS-readable form so other systems can make view-aware culling decisions.'
  },
  'terms.section-visibility-system': {
    title: 'SectionVisibilitySystem',
    definition: 'A Burst-compatible ECS system that tests section bounds against frustum data and updates per-section visibility state so off-screen streamed content can be deprioritized or hidden.'
  },
  'terms.impostor-settings': {
    title: 'ImpostorSettings',
    definition: 'The configuration object for impostor generation. It controls authoring values such as frame count, texture resolution, and impostor capture type.'
  },
  'terms.create-gameobject-subscenes-op': {
    title: 'CreateGameObjectSubScenesOp',
    definition: 'The operation used by the standard GameObject subscene pipeline. It creates subscene assets, organizes section hierarchies, and moves cloned scene content into the generated subscenes.'
  },
  'terms.create-dataobject-subscenes-op': {
    title: 'CreateDataObjectSubScenesOp',
    definition: 'The DataObjects-specific subscene creation operation. It builds the generated subscene structure for compact DataObject content and integrates that workflow into the main process runner.'
  },
  'terms.section-index': {
    title: 'SectionIndex',
    definition: 'The numeric identifier for a ProStream section or streaming layer. It is used to associate objects, subscene sections, and loading ranges with the correct layer during processing and runtime streaming.'
  }
};

export function getQuickInfoPreset(preset?: string): QuickInfoPreset | undefined {
  if (!preset) {
    return undefined;
  }

  return quickInfoPresets[preset];
}
