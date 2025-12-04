# Position Calculation Process

## Overview

Position Calculation is the **most critical process** in the ProStream workflow. This process applies your configured match rules to categorize GameObjects into streaming layers/sections, calculates spatial positions using QuadTree structures, and validates all data before SubScene creation.

This is a **complex, multi-phase process** that forms the foundation for all streaming behavior.

---

## When to Use

**Prerequisites:**
- Scene setup is complete (SceneConnector added)
- At least one SceneSearchFilter is configured
- At least one match rule is enabled
- Layer/section configuration is complete

**Trigger:** Click the **"Calculate Positions"** button in the ProStream Editor Setup tab.

---

## What It Does

### Phase 1: Workflow Object Checking
- Validates workflow-specific requirements
- Prepares internal data structures
- Checks for configuration issues

### Phase 2: Validation (Optional)
- Runs ValidationEngine when enabled in Settings
- Scans for DOTS compatibility issues
- Reports errors and warnings to console
- See [Validation & Diagnostics](validation-diagnostics.md) for details

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

---

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

---

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

Each GameObject gets:
- **MatchTracker.isMatched** = `true` or `false`
- **MatchTracker.SectionId** = Integer (0, 1, 2, etc.)
- **MatchTracker.MatchedRule** = Reference to matching rule

**SectionId corresponds to layers:**
- `0` = First layer (e.g., "Ground")
- `1` = Second layer (e.g., "LargeObjects")
- `2` = Third layer (e.g., "SmallObjects")
- etc.

---

## Spatial Calculation (Phase 4)

### QuadTree Grid Creation

**Purpose:** Divide the scene into manageable spatial regions for streaming.

**Process:**
1. Calculate overall scene bounds from all matched objects
2. Divide bounds into grid cells (QuadTree)
3. Assign each matched object to appropriate cell(s)
4. Create SubScene data structure for each cell

**Configuration:**
- Cell size determined by scene bounds and target cell count
- Typically results in 4-16 cells per scene (adjustable)
- Each cell becomes one SubScene at runtime

### ObjectSectionDetails

**Data structure per object:**
```
ObjectSectionDetails {
    GameObject reference
    Transform position
    SectionId (which layer)
    QuadTreeCellId (which spatial cell)
    Bounds
    MatchedRule reference
}
```

### QuadSubSceneData

**Data structure per QuadTree cell:**
```
QuadSubSceneData {
    QuadTreePosition (X, Y coordinates)
    List<ObjectSectionDetails> objects in this cell
    List<int> section indices used in this cell
    World position (center of cell)
    Bounds
    Path for SubScene asset (to be created)
}
```

**Example:**
If cell (5, 7) contains 50 objects:
- 20 in section 0 (Ground)
- 15 in section 1 (LargeObjects)
- 15 in section 2 (SmallObjects)

The QuadSubSceneData will reference all 50 objects and know it needs 3 sections.

---

## Validation System (Phase 5)

### Validation Groups

ProStream runs multiple validation checks:

1. **Rule Validation**
   - All enabled rules have valid configuration
   - Search queries are syntactically correct
   - Custom rules don't have errors

2. **Match Validation**
   - All processed objects have MatchTracker
   - Match results are consistent
   - No objects in invalid states

3. **Spatial Validation**
   - QuadTree cells are valid
   - Object assignments are correct
   - No objects outside bounds

4. **Section Validation**
   - All sections have valid indices
   - Section data references are correct
   - No orphaned sections

### Progress State

**SceneSettings.PositionCalculated**
- `false` at start
- `true` when successfully completed
- Gates "Create SubScenes" button

---

## Data Structures Created

After successful position calculation, the following data exists:

### In Scene
- **MatchTracker components** on all processed GameObjects
  - `isMatched` flag
  - `SectionId` assignment
  - `MatchedRule` reference

- **SceneConnector.Data** populated with:
  - `List<ObjectSectionDetails>` - All matched objects
  - `List<QuadSubSceneData>` - All QuadTree cells
  - Workflow-specific data

### In Memory
- **QuadTree grid structure** - Spatial indexing
- **Section lookup tables** - Fast queries
- **Validation results** - Issue reports

---

## Troubleshooting

### Issue: "No SearchFilter Objects found"

**Cause:** Missing SceneSearchFilter components

**Solution:**
1. Add at least one GameObject with SceneSearchFilter component
2. Configure its search query
3. See [Scene Search Filter](scene-search-filter.md) for details

### Issue: "No rules have been added"

**Cause:** No enabled match rules

**Solution:**
1. Open Rule Editor (Scene Match Rules → Rule Editor)
2. Enable at least one rule
3. See [Rule Engine](rule-engine.md) for details

### Issue: No Objects Matched

**Symptoms:**
- Process completes but "0 objects matched" in logs
- All objects show `isMatched = false`

**Solutions:**
1. Verify search filter queries match objects
2. Check rule configuration is correct
3. Test queries in Unity Search window (`Ctrl+K`)
4. Verify objects have components being searched for
5. Check rule priority order

### Issue: Objects Matched to Wrong Section

**Symptoms:**
- Objects in incorrect layer/section
- Unexpected section assignments

**Solutions:**
1. Check rule priority order (first match wins)
2. Verify rule queries are specific enough
3. Use MatchByComponent to force specific assignments
4. Review matched objects in inspector (MatchTracker component)

### Issue: Process Takes Too Long

**Symptoms:**
- Calculation hangs or takes excessive time
- Unity appears frozen

**Solutions:**
1. Reduce scene complexity temporarily
2. Disable complex custom rules for testing
3. Check for infinite loops in custom rules
4. Monitor Console for errors
5. Consider optimizing search queries

### Issue: "PositionCalculated" Not Set

**Symptoms:**
- Process appears complete but can't create SubScenes
- "Calculate Positions" button doesn't disable

**Solutions:**
1. Check Console for errors during process
2. Verify no validation failures
3. Check `SceneConnector.Settings.PositionCalculated` in inspector
4. Re-run process if needed

---

## Best Practices

### Rule Configuration
- ✅ Start with broad rules, refine as needed
- ✅ Test rules on small scene sections first
- ✅ Use MatchByComponent for critical objects
- ✅ Set up default rule for fallback
- ✅ Monitor matched object counts

### Performance
- ✅ Optimize search queries (specific is faster)
- ✅ Limit custom rule complexity
- ✅ Process reasonable scene sizes
- ✅ Clear data between runs

### Debugging
- ✅ Enable verbose logging if needed
- ✅ Inspect MatchTracker components
- ✅ Verify section assignments visually
- ✅ Test rules iteratively
- ✅ Save often before processing

### Workflow
- ✅ Configure all rules before calculating
- ✅ Don't modify scene during calculation
- ✅ Review results before creating SubScenes
- ✅ Iterate on rule configuration if needed
- ✅ Document your rule setup

---

## Understanding the Output

### After Successful Calculation

**Console Output:**
```
Run Process: CalculateLocations
Running Phase 1: Workflow Checking
Running Phase 2: Issue Detection
Running Phase 3: Rule Matching
  - Manual Matches: 5 objects
  - Search Query Matches: 432 objects
  - Default Rule: 15 objects
Running Phase 4: Spatial Calculation
  - QuadTree cells created: 12
  - Objects assigned: 452
Running Phase 5: Finalization
Position Calculation Complete: 452 objects matched
```

**Scene State:**
- All matched GameObjects have MatchTracker component
- MatchTracker.isMatched = true
- MatchTracker.SectionId assigned (0-N)
- SceneConnector.Data populated
- Ready for SubScene creation

**Next Steps:**
1. Review matched objects (inspect MatchTracker)
2. Verify section assignments are correct
3. Adjust rules if needed and re-run
4. When satisfied, proceed to [Create SubScenes](process-subscenes.md)

---

## Related Topics

<seealso>
    <category ref="prerequisites">
        <a href="scene-search-filter.md">Scene Search Filter Configuration</a>
        <a href="rule-engine.md">Rule Engine System</a>
        <a href="streaming-layers.md">Streaming Layers Setup</a>
    </category>
    <category ref="processes">
        <a href="process-subscenes.md">SubScene Creation Process (Next Step)</a>
        <a href="standard-workflow.topic">Complete Workflow Overview</a>
    </category>
    <category ref="components">
        <a href="validation-diagnostics.md">Validation & Diagnostics</a>
        <a href="settings-reference.md">Settings Reference</a>
        <a href="scene-connector.md">SceneConnector Component</a>
    </category>
</seealso>
