# Rule Engine

The RuleEngine is a system that allows for the creation and use of custom rules to match GameObjects with Streaming Layers.

## Overview

The RuleEngine system is designed to be extensible through the use of Rule Providers.

**Current Providers:**

- Unity Search Query system (MatchBySearchQuery)
- GameObject Query Language (MatchByGoQL)
- Unity Identification Systems (Layer, Tag, Label)
- Custom Matching via C# code

## Rule Editor

![Rule Editor Window](/images/rule_editor_window.png)

## Configure Matching Rules

### Open Match Rules Menu

1. Press the "Scene Match Rules" button
2. Select the "Rule Editor" option from dropdown menu

![Open Match Files](/images/open_match_files.png)

### Enable Example Rules

1. Locate the example items under the MatchBySearchQuery rules category
2. Double click rule to enable

![Enable Match Rules](/images/pst_2_enable_match_image_psTutorial.png)

You can also verify the currently enabled rules by viewing them directly in the SceneConnector's inspector under the MatchRules `List<RuleEngine>` Object.

### Edit and Preview Queries

You can edit and preview the results of the query by clicking icon on the right side of the query input box.

![Edit Preview Query](/images/pst_2_edit_preview_query_image_psTutorial.png)

## Rule Providers

### MatchBySearchQuery

Uses Unity's Search Query system to match objects. This is the most powerful and flexible provider.

**Example Queries:**
- `t:prefab` - Match all prefabs
- `t:prefab name:Tree` - Match prefabs with "Tree" in name
- `t:prefab size>10` - Match prefabs larger than 10 units
- `t:prefab tag:Environment` - Match prefabs with Environment tag

**Benefits:**
- Leverages Unity's built-in search
- Very flexible and powerful
- Can combine multiple criteria
- Preview results in Unity Search window

### MatchByName

Matches objects based on their GameObject name.

**Match Types:**
- Contains - Name contains string
- DoesNotContain - Name doesn't contain string
- StartsWith - Name starts with string
- EndsWith - Name ends with string
- Equals - Name exactly matches

**Example:**
- Match all objects with "Building" in name
- Match all objects starting with "Prop_"

### MatchByGoQL

Uses GameObject Query Language for advanced matching.

**Example Queries:**
- `[name=Tree]` - Match by name
- `[tag=Environment]` - Match by tag
- `[layer=Default]` - Match by layer
- `[component=MeshRenderer]` - Match by component

### MatchByTag

Matches objects based on Unity tags.

**Configuration:**
- Select tag from dropdown
- Choose match/don't match

### MatchByLayer

Matches objects based on Unity layers.

**Configuration:**
- Select layer from dropdown
- Choose match/don't match

### MatchByDefault

Fallback rule that matches any unmatched objects.

**Behavior:**
- Always runs last
- Catches objects not matched by other rules
- Typically assigns to a default layer

## Creating Custom Rules

You can create custom rule providers by extending the `RuleEngine` class:

```csharp
using instance.id.ProStream;
using UnityEngine;

public class MatchByName : RuleEngine
{
    // Base Class Overrides
    public override string Title => "Match By Name";
    public override string RuleName => FriendlyName(name, typeof(MatchByName));

    // Rule Members
    private enum MatchType { Contains, DoesNotContain }

    [SerializeField] private MatchType matchType;
    [SerializeField] private string nameMatchString;

    public override int CheckRule(Transform obj)
    {
        return matchType switch
        {
            MatchType.Contains when obj.name.Contains(nameMatchString) => Matched,
            MatchType.DoesNotContain when !obj.name.Contains(nameMatchString) => Matched,
            _ => Unmatched
        };
    }
}
```

## Rule Execution

### Execution Order

Rules are processed in the order they appear in the list:

1. First rule checks object
2. If matched, assign to layer and stop
3. If not matched, try next rule
4. Continue until match found or list exhausted
5. MatchByDefault catches any remaining objects

### Rule Priority

You can reorder rules by dragging them in the Rule Editor:

- Higher priority rules should be first
- More specific rules before general rules
- MatchByDefault should always be last

**Example Priority:**
1. MatchBySearchQuery (specific buildings)
2. MatchByName (building prefixes)
3. MatchByTag (environment tag)
4. MatchByDefault (everything else)

## Rule Configuration

### Assigning to Layers

Each rule is assigned to a specific streaming layer:

- Ground
- LargeObjects
- MediumObjects
- SmallObjects
- Foliage
- Custom layers

### Rule Settings

**Common Settings:**
- **Enabled** - Whether rule is active
- **Priority** - Execution order
- **Target Layer** - Which layer matched objects go to
- **Description** - Notes about the rule

## Testing Rules

### Preview in Unity Search

1. Open Unity Search (`Ctrl+K`)
2. Enter your search query
3. Verify correct objects are found
4. Refine query as needed

### Test During Calculate Positions

1. Enable console logging
2. Run Calculate Positions
3. Check console for match statistics
4. Verify objects assigned to correct layers

### Inspect MatchTracker

1. Select a prefab instance in scene
2. Check MatchTracker component
3. Verify `IsMatched` is true
4. Check `SectionId` shows correct layer

## Best Practices

### Start with Examples

- Enable example rules first
- Modify them for your needs
- Learn by observing what works

### Be Specific

- More specific rules = better control
- Use multiple criteria in queries
- Test queries before enabling

### Use Descriptive Names

- Name rules clearly: "Buildings - Residential"
- Add descriptions explaining purpose
- Document complex queries

### Organize by Type

Group rules logically:
- Buildings rules together
- Vegetation rules together
- Props rules together

### Test Incrementally

1. Enable one rule at a time
2. Run Calculate Positions
3. Verify results
4. Enable next rule

## Common Issues

**No objects matched**
- Check search query syntax
- Verify objects are prefabs
- Ensure objects are under search filters
- Test query in Unity Search window

**Wrong objects matched**
- Query too broad - add more criteria
- Check rule priority order
- Verify layer assignments

**Objects matched by wrong rule**
- Reorder rules (priority)
- Make earlier rules more specific
- Check for overlapping criteria

**Rule not executing**
- Verify rule is enabled
- Check that rule is in SceneConnector list
- Ensure no errors in rule code

## Performance Considerations

**Query Complexity**

- Simple queries are faster
- Complex queries may slow calculation
- Balance specificity vs performance

**Rule Count**

- More rules = longer processing
- Combine similar rules when possible
- Remove unused rules

**Match Early**

- Put common matches first
- Reduces checks for most objects
- Improves overall performance

## See Also

- [Streaming Layers](/core-concepts/streaming-layers) - Configure layer distances
- [Position Calculation](/processes/position-calculation) - How rules are applied
- [Scene Search Filter](/editor-guide/components/scene-search-filter) - Define processing scope
- [Standard Workflow](/getting-started/standard-workflow) - Complete setup guide
