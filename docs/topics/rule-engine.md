# RuleEngine

## Overview 

The RuleEngine is a system that allows for the creation and use of custom rules to match GameObjects with Streaming Layers.

## Rule Providers

The RuleEngine system is designed to be extensible through the use of Rule Providers.

<table>
    <tr><td> <b>Current Providers</b> </td><td>
    <ul>
        <li>Unity Search Query system (MatchBySearchQuery)</li>
        <li>GameObject Query Language (MatchByGoQL)</li>
        <li>Unity Identification Systems (Layer, Tag, Label)</li>
        <li>Custom Matching via C# code</li>
    </ul>
    </td></tr>
</table>

Example Provider: MatchByName

```c#

public class MatchByName : RuleEngine
{
    // --| Base Class Overrides -------------
    public override string Title => "Match By Name";
    public override string RuleName => FriendlyName(name, typeof(MatchByName));

    // --| Rule Members ---------------------
    private enum MatchType { Contains, DoesNotContain }

    [SerializeField] private MatchType matchType;
    [SerializeField] private string nameMatchString;

    public override int CheckRule(Transform obj)
    {
        return matchType switch
        {
            MatchType.Contains when obj.name.Contains(nameMatchString)        => Matched,
            MatchType.DoesNotContain when !obj.name.Contains(nameMatchString) => Matched,
            _                                                                 => Unmatched
        };
    }
}

```
{collapsible="true"}

## Rule Editor

![rule_editor_window.png](rule_editor_window.png){width="450" thumbnail="true"}

--------------------

## Configure Matching Rules

<snippet id="configure_match_rules_id">

<table>
<tr><td>
   Open Match Rules Menu  

[//]: # (@formatter:off)
 - Press the "Scene Match Rules" button
 - Select the "Rule Editor" option from dropdown menu

[//]: # (@formatter:on)

</td><td>

![open_match_files.png](open_match_files.png){width="250" thumbnail="true" }

</td></tr>
</table>

--------------------

<table id="rule_table">
 <tr> <td>
Enabled Example Rules  

[//]: # (@formatter:off)
 - Locate the example items under the MatchBySearchQuery rules category
 - Double click rule to enable

[//]: # (@formatter:on)

</td> 
<td>

![open_match_files.png](pst_2_enable_match_image_psTutorial.png){width="250" thumbnail="true" }

</td> </tr>

<tr> <td colspan="2">

You can also verify the currently enabled rules by viewing them directly in the SceneConnector's inspector under the MatchRules `List<RuleEngine>` Object

</td> </tr>
</table>

--------------------

<table>
<tr><td>

You can edit and preview the results of the query by clicking icon on the right side of the query input box.

</td><td> 

![pst_2_edit_preview_query_image_psTutorial.png](pst_2_edit_preview_query_image_psTutorial.png){width="250" thumbnail="true" }

</td></tr>
</table>

</snippet>
