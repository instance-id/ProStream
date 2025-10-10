# Step 6: Calculate Positions

<snippet id="step_6_calculate_positions">

<procedure title="Calculate Positions" id="step-6-calculate-positions">
<p>This is where ProStream analyzes your scene and assigns objects to layers.</p>

<step>
    <p>In the ProStream Editor window (if closed, reopen via <ui-path>Tools | instance.id | ProStream | ProStream Editor</ui-path> )
    </p>
</step>
<step>
    <p>Go to the
        <control>Setup</control>
        tab
    </p>
</step>
<step>
    <p>Click
        <control>Calculate Positions</control>
        button
    </p>
</step>
<step>
    <p>Wait for processing to complete (progress bar will show)</p>
</step>

<code-block lang="markdown">
Run Process: CalculateLocations
Running Phase 3: Rule Matching

- Search Query Matches: 28 objects
  Running Phase 4: Spatial Calculation
- QuadTree cells created: 4
- Objects assigned: 28
  Position Calculation Complete

</code-block>

  <warning>
      <p>
          <b>If you get errors:</b>
      </p>
      <list>
          <li>Check Console for specific messages</li>
          <li>Ensure at least one rule is enabled</li>
          <li>Verify SceneSearchFilter exists and has a query</li>
          <li>See <a href="troubleshooting.md"> Troubleshooting</a></li>
      </list>
  </warning>

  <p>See <a href="position-calculation.md"> Position Calculation Process</a> for complete details.</p>

</procedure>

</snippet>
