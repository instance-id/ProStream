---
layout: home

hero:
  name: "ProStream"
  text: "DOTS/ECS Scene Streaming"
  tagline: "GameObject to Entity SubScene Conversion and Multi-Layer Streaming"
#   actions:
    # - theme: brand
    #   text: Get Started
    #   link: /getting-started/setup
    # - theme: alt
    #   text: View on GitHub
    #   link: https://github.com/instance-id

features:
  - title: Setup and Requirements
    details: Prerequisites and recommended settings for optimal performance
    link: /getting-started/requirements
  - title: Quick Start Guide
    details: Get started quickly and see ProStream in action with our Sample scene
    link: /getting-started/sample-quickstart
  - title: Standard Workflow
    details: Complete workflow overview from setup to runtime streaming
    link: /getting-started/standard-workflow
---

<!--
  - title: Streaming Layers
    details: Configure distance-based loading for optimal performance
    link: /core-concepts/layers/streaming-layers
  - title: Rule Engine
    details: Categorize objects into layers with powerful matching rules
    link: /editor-guide/engines/rule-engine
  - title: Runtime Systems
    details: Understanding ProStream's distance-based streaming systems
    link: /runtime-systems/runtime-streaming
  - title: Prepare Scene
    details: Understanding the 5-phase rule matching process
    link: /processes/prepare-scene
  - title: SubScene Creation
    details: SubScene asset creation and hierarchy management
    link: /processes/process-subscenes
  - title: Modification System
    details: Extend ProStream with custom processing capabilities
    link: /editor-guide/engines/modification-engine
  - title: Troubleshooting
    details: Common issues and solutions to keep you productive
    link: /troubleshooting/troubleshooting

 -->

![ProStream Workflow](/images/prostream_scene.png)

## What is ProStream?

**ProStream** is a DOTS/ECS world streaming toolkit designed to address the performance overhead of traditional Unity GameObject scene streaming. By providing comprehensive tooling that automates the conversion of large, heavy scenes into fast-loading, memory-efficient Entity SubScenes, ProStream empowers you to build high-performance, seamlessly streaming worlds with exceptional performance.

### Key Features

::: tip ⚡ High-Performance Runtime

**High-Performance Runtime Streaming:** Implements SubScene streaming utilizing Unity ECS and multi-threaded Burst-compiled jobs for maximum CPU efficiency.

**Proximity-Driven Loading:** Dynamically evaluates distance thresholds in parallel to seamlessly load and unload scene content as the player navigates the world.

**Responsive Streaming Control:** Adjust loading ranges and streaming parameters at runtime for precise, dynamic control over your world's memory footprint.

:::

::: info 🎯 Scene Analysis & Generation

**Intelligent Scene Analysis:** The core preprocessing engine evaluates scene object bounds and density, utilizing an adaptive Quadtree algorithm to dynamically partition your world into balanced, memory-efficient streaming chunks.

**GameObject-to-Entity Conversion:** Turn massive, complex Unity scenes into streamable, DOTS-ready SubScenes in a fraction of the time.

**Advanced Rule-Based Matching:** Leverage powerful, customizable rules and queries to automatically categorize GameObjects into distinct streaming layers which enables independent loading ranges and streaming behaviors.

:::

::: warning 🐛 Debugging & Diagnostics

**Built-in Diagnostics & Validation:** A comprehensive diagnostic framework instantly identifies and helps resolve potential Entity conversion issues (e.g., incompatible shaders, missing colliders, invalid bounds) before they become runtime problems.

**Visual Debugging Tools:** Built-in editor visualizations allow you to inspect distance thresholds and streaming behavior in real-time.

:::

Thanks for choosing ProStream!
