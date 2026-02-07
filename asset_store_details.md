<!-- Asset Store Publisher Details -->

### Summary
<!-- Summarise what your package is and how it can help somebody's project. -->

Unity Developer Tool for Automated Rule-Based GameObject to Entity Scene Conversion and Entity Scene Streaming

---

### Description
<!-- Describe your package. Is the provided content customizable, suitable for a particular genre?
 -->

<!-- 
Important Items:
GameObject -> Entity Conversion
Multi-layer distance based SubScene streaming system

 -->

ProStream provides comprehensive tooling that automates the conversion of traditional GameObject scenes to DOTS entity subscenes and performance optimized multi-layer entity subscene streaming systems.

---

### Technical details

<!-- List the key features of your package -->

Intelligent scene analysis system that identifies optimal streaming boundaries based on object density and relationships

Automatic layer generation that organizes GameObjects into logical streaming groups based on customizable rule sets

ECS-based streaming: Implements SubScene streaming with Unity ECS and multi-threaded Job systems

Jobs + Burst: Parallel distance/state evaluation with Burst-compatible jobs

Proximity-driven decisions: Evaluates distance thresholds for load/unload operations

Visualization tools: Built-in debug/distance visualizations that allow you to inspect streaming behavior.

Diagnostic framework to help you identify and fix potential Entity conversion and streaming issues