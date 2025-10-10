# Step 1: Create a Test Scene

<snippet id="step_1_create_test_scene">

<procedure title="Create a Test Scene" id="step-1-create-test-scene" >
<step>
    <p>Create a new Unity scene:
        <ui-path>File | New Scene</ui-path>
    </p>
</step>
<step>
    <p>Create parent GameObjects to organize your content:</p>
    <list>
        <li>Create an empty GameObject named "Buildings"</li>
        <li>Create another empty GameObject named "Props"</li>
    </list>
</step>
<step>
    <p>Add some prefab instances under these parents:</p>
    <list>
        <li>Create a Cube, make it a prefab, add 10-15 instances under "Buildings"</li>
        <li>Create a Sphere, make it a prefab, add 5-10 instances under "Props"</li>
        <li>Spread them across a reasonable area (e.g., 50x50 units)</li>
    </list>
</step>

<note>
    <p><b>Important:</b> ProStream tracks <b>prefab instances</b>, not regular GameObjects. Objects must be prefabs and organized under parent GameObjects (which will become search filters).</p>
</note>

<tip>
    <p>For a real project, organize your scene with meaningful parent GameObjects like "Terrain", "Vegetation", "Buildings", "Roads", etc. Each will become a search filter boundary.</p>
</tip>
</procedure>


</snippet>
