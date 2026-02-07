# Position Calculation Process

Position Calculation is the **most critical process** in the ProStream workflow. This process applies your configured match rules to categorize GameObjects into streaming layers/sections, calculates spatial positions using QuadTree structures, and validates all data before SubScene creation.

## Overview

This is a **complex, multi-phase process** that forms the foundation for all streaming behavior.

## When to Use

**Prerequisites:**
- Scene setup is complete (SceneConnector added)
- At least one SceneSearchFilter is configured
- At least one match rule is enabled
- Layer/section configuration is complete

**Trigger:** Click the **"Calculate Positions"** button in the ProStream Editor Setup tab.

## What It Does

### Phase 1: Workflow Object Checking
- Validates workflow-specific requirements
- Prepares internal data structures
- Checks for configuration issues

### Phase 2: Validation (Optional)
- Runs ValidationEngine when enabled in Settings
- Scans for DOTS compatibility issues
- Reports errors and warnings to console
- See [Validation & Diagnostics](/editor-guide/tools/validation-diagnostics) for details

### Phase 3: Rule Matching (CORE)
- Applies all enabled match rules in priority order
- Categorizes GameObjects into sections
- Marks objects as matched/unmatched
- Assigns section IDs (Ground, LargeObjects, etc.)

### Phase 4: Spatial Calculation
- Creates QuadTree grid based on scene bounds
- Assigns objects to spatial cells
- Calculates positions for each SubScene
- Generates ObjectSectionDetails
- Builds QuadSubSceneData structures

### Phase 5: Finalization
- Validates all calculated data
- Runs validation groups
- Saves scenes (if AutoSave enabled)
- Updates progress state
- Marks process as complete

## Process Flow

```
User Clicks "Calculate Positions"
    ↓
Display Progress UI
    ↓
PreCheck Validation
    ├── Check for SceneSearchFilters
    ├── Check for enabled rules
    └── Check for layer data
    ↓
Clear Previous Data
    ├── Remove Selection Groups
    └── Clear Setup Data
    ↓
Schedule ProcessType.CalculateLocations Event
    ↓
ProcessRunner Handles Event
    ↓
Set HierarchyUpdateInProgress Flag
    ↓
Run BeforePositionCalculation Modifications (Optional)
    ↓
GenerateLocationDataOp.Operate()
    │
    ├── PHASE 1: Workflow Object Checking
    │   └── Validate workflow-specific objects
    │
    ├── PHASE 2: Validation (if enabled)
    │   ├── Run ValidationEngine
    │   └── Report errors/warnings
    │
    ├── PHASE 3: Rule Matching ⭐ CRITICAL
    │   ├── CheckManualMatches (MatchByComponent)
    │   ├── CheckCustomMatches (Custom rules)
    │   ├── CheckSearchQueryMatches (Primary matching)
    │   ├── CheckGoQLMatches (GameObject Query Language)
    │   └── ApplyDefaultMatchRule (Unmatched objects)
    │
    ├── PHASE 4: Spatial Calculation
    │   ├── Calculate scene bounds
    │   ├── Generate QuadTree grid
    │   ├── Assign objects to cells
    │   ├── Generate ObjectSectionDetails
    │   └── Build QuadSubSceneData
    │
    └── PHASE 5: Finalization
        ├── Save scenes (if AutoSave)
        ├── Run validation groups
        ├── Update progress state
        └── Mark PositionCalculated = true
    ↓
Complete - Ready for SubScene Creation
```

## Rule Matching System (Phase 3)

This is the **most important phase** - it determines which objects go into which streaming layers/sections.

### Rule Processing Order

Rules are processed in this order:

1. **Manual Matches (MatchByComponent)**
   - Objects with explicit section assignment
   - Component: `MatchByComponent`
   - Highest priority - overrides other rules

2. **Custom Matches**
   - User-defined custom C# rules
   - Category: `RuleProcessor.Custom`
   - Evaluated before query-based rules

3. **Search Query Matches (Primary)**
   - Unity Search Query system
   - Category: `MatchBySearchQuery`
   - **Most commonly used**
   - Examples: `t:MeshRenderer`, `ref:MyPrefab`

4. **GameObject Query Language (GoQL)**
   - Advanced query syntax
   - Category: `MatchByGOQLRule`
   - More complex queries

5. **Default Match Rule (Fallback)**
   - Applied to any remaining unmatched objects
   - Ensures no objects are missed
   - Configurable default section

### Match Result

When an object matches a rule:
- `MatchTracker.IsMatched` = true
- `MatchTracker.SectionId` = assigned section (e.g., "LargeObjects")
- Object is added to that section's object list
- Processing stops for that object (first match wins)

## Spatial Calculation (Phase 4)

### QuadTree Generation

ProStream divides your scene into a grid using a QuadTree structure:

**Process:**
1. Calculate scene bounds (min/max positions of all objects)
2. Determine grid size based on object density
3. Create QuadTree cells (typically 4x4, 8x8, or 16x16)
4. Assign each object to its cell based on position

**Example Grid:**
```
Scene divided into 4x4 grid (16 cells):

[0,3] [1,3] [2,3] [3,3]
[0,2] [1,2] [2,2] [3,2]
[0,1] [1,1] [2,1] [3,1]
[0,0] [1,0] [2,0] [3,0]

Each cell becomes a SubScene
```

### ObjectSectionDetails

For each matched object, ProStream creates an `ObjectSectionDetails` record:

**Properties:**
- GameObject reference
- World position
- Section ID (layer)
- QuadTree cell coordinates
- Prefab reference
- Match rule that matched it

### QuadSubSceneData

For each QuadTree cell, ProStream creates `QuadSubSceneData`:

**Properties:**
- Cell coordinates (x, y)
- Center position
- List of objects in this cell
- Section breakdown (how many in each layer)
- Bounds information

## Console Output

During execution, you'll see progress in the Console:

```
[ProStream] Starting Position Calculation
[ProStream] Phase 1: Workflow Object Checking - Complete
[ProStream] Phase 2: Validation - Skipped (disabled)
[ProStream] Phase 3: Rule Matching
  - Manual Matches: 0 objects
  - Custom Matches: 0 objects
  - Search Query Matches: 245 objects
  - GoQL Matches: 0 objects
  - Default Matches: 12 objects
  - Total Matched: 257 objects
[ProStream] Phase 4: Spatial Calculation
  - Scene Bounds: (-500, -500) to (500, 500)
  - QuadTree Size: 8x8 (64 cells)
  - Objects Assigned: 257
[ProStream] Phase 5: Finalization - Complete
[ProStream] Position Calculation Complete in 2.34s
```

## Common Issues

**No objects matched**
- Check that rules are enabled
- Verify search queries are correct
- Ensure objects are under search filters
- Test queries in Unity Search window

**Objects matched to wrong section**
- Check rule priority order
- Verify rule configuration
- Ensure first matching rule is correct

**QuadTree too large/small**
- Adjust scene bounds manually if needed
- Check object positions are reasonable
- Verify no objects at extreme coordinates

**Process fails with errors**
- Check Console for specific error messages
- Verify all prerequisites are met
- Try running validation first
- See [Troubleshooting](/troubleshooting/troubleshooting)

## Performance Considerations

**Rule Complexity**
- Simple rules are faster
- Complex search queries take longer
- Limit number of active rules

**Object Count**
- More objects = longer processing
- Consider splitting very large scenes
- Use search filters to limit scope

**Validation**
- Disable validation for faster processing
- Enable only when needed
- Advanced validation is slower

## After Completion

Once Position Calculation completes successfully:

1. Objects are categorized into sections
2. Spatial data is calculated
3. Scene is ready for SubScene creation
4. You can proceed to "Create SubScenes"

::: tip
You can re-run Position Calculation anytime to:
- Apply new rules
- Adjust layer assignments
- Recalculate spatial data
- Test different configurations
:::

## See Also

- [Rule Engine](/editor-guide/engines/rule-engine) - Configure matching rules
- [Streaming Layers](/core-concepts/streaming-layers) - Configure layer distances
- [SubScene Creation](/processes/process-subscenes) - Next step in workflow
- [Standard Workflow](/getting-started/standard-workflow) - Complete guide
