# Step 6: Calculate Positions

<snippet id="step_6_calculate_positions">

<procedure title="Calculate Positions" id="step-6-calculate-positions">

This is where ProStream analyzes your scene and assigns objects to layers.

<step>

In the ProStream Editor window (if closed, reopen via <ui-path>Tools | instance.id | ProStream | ProStream Editor</ui-path>)

</step>

<step>

Go to the <control>Setup</control> tab

</step>

<step>

Click <control>Calculate Positions</control> button

</step>

<step>

Wait for processing to complete (progress bar will show)

</step>

<code-block lang="text">
Run Process: CalculateLocations
Running Phase 3: Rule Matching
  Search Query Matches: 28 objects
Running Phase 4: Spatial Calculation
  QuadTree cells created: 4
  Objects assigned: 28
Position Calculation Complete
</code-block>

<warning>

**If you get errors:**

- Check Console for specific messages
- Ensure at least one rule is enabled
- Verify SceneSearchFilter exists and has a query
- See <a href="troubleshooting.md"> Troubleshooting</a>

</warning>

See <a href="position-calculation.md"> Position Calculation Process</a> for complete details.

</procedure>

</snippet>
