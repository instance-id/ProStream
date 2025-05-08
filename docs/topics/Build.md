# Build/Runtime issues

Common and possible issues related to the Build process, or Runtime issues.

## No Objects In Game

If you perform a build and there are no objects in the game, it is possible that the SRP asset is not assigned .
Ensure that a SRP asset is assigned in the following places:

<table>
  <tr>
    <th>Location</th>
    <th>Image</th>
  </tr>
  <tr>
    <td><ui-path>Project Settings \ Graphics -> Scriptable Render Pipeline Settings</ui-path></td>
    <td><img src="ts_settings_srp_asset.png" alt="ts_settings_srp_asset.png" thumbnail="true"/></td>
  </tr>
  <tr>
    <td><ui-path>Project Settings \ Graphics \ -> URP Global Settings</ui-path></td>
    <td><img src="ts_settings_srp_global_asset.png" alt="ts_settings_srp_global_asset.png" thumbnail="true"/></td>
  </tr>
  <tr>
    <td><ui-path>Project Settings \ Quality -> Scriptable Render Pipeline Settings</ui-path></td>
    <td><img src="ts_settings_srp_quality_asset.png" alt="ts_settings_srp_quality_asset.png" thumbnail="true"/></td>
  </tr>
</table>

<seealso>
<!--Give some related links to how-to articles-->
</seealso>
