# Change Log

Release history and changes for ProStream.

## [0.4.1] - 2026-05-18

- Added: Add Terrain restriction validation and update MatchTracker restrictions
- Fixed: Add debug logging for workflow and quadtree checks, and clean up unused code
- Fixed: Enabled new icons and styles for improved UI elements in AppUI
- Fixed: Enhance asset filtering by adding checks for generated visible meta files and improve deterministic GUID generation for staged assets
- Fixed: Improve TriggerComponent initialization and add custom editor support
- Fixed: Enhance QuadTree functionality and diagnostics
- Fixed: Update InstanceObjectCollection handling and improve scene lock validation
- Fixed: Schedule delayed highlighting for package import button in TrySelectSamplesTabWithRetry method
- Fixed: Improve validation logging and enhance prefab search warning message
- Fixed: Enhance logging and error handling in CreateQuadTree method
- Fixed: Adjust log level defaults and update current log level initialization
- Fixed: Add check for streaming scene in ProStreamSceneViewHandler constructor
- Fixed: Improve warning message for empty prefab search results in AddSearchFilters method
- Refactor: Refactor object finding methods to use InstanceExtensions for consistency
- Refactor: Replace Debug.Log calls with Logger.DebugLog to respect log level settings

## [0.4.0] - 2026-05-09

- Fix: Rework SRP and sample prefab staging functionality
- Fix: Adjust tab item label styles for consistent text wrapping
- Fix: Update tab item styles for better layout and consistency
- Style: Add AppUI overrides for text wrapping in LayerData styles
- Refactor: Update GetObjectByID methods to use GetObjectFromID for improved clarity and consistency

## [0.3.3] - 2026-05-08

- Fix: Update preprocessor directives for Unity version compatibility in GetObjectByID methods
- Fix: Update getting started URL in PSSetup documentation

## [0.3.2] - 2026-05-06

- Fix: Enhance entity initialization and validate subscene data handling

## [0.3.1] - 2026-05-04

- Fix: Ensure font asset is checked for null before accessing in ModificationEngineEditor
- Refactor: Simplify ObjectFromItem method to directly return GameObject from item data

## [0.3.0] - 2026-04-26

### Changed

- Update Entities Package 1.4.6
- Update Entities Graphics 1.4.19

## [0.2.1] - 2026-03-07

### Added

- Initial asset store release

## Reporting Issues

If you encounter issues or have suggestions:

1. Check the [Troubleshooting](/troubleshooting/troubleshooting) guide
2. Review existing documentation
3. Contact support with detailed information

## See Also

- [Setup](/getting-started/setup) - Getting started
- [Troubleshooting](/troubleshooting/troubleshooting) - Common issues
- [Requirements](/getting-started/requirements) - Requirements
