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
    link: /core-concepts/streaming-layers
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

## What is ProStream?

ProStream provides comprehensive tooling that automates the conversion of traditional GameObject scenes to DOTS entity subscenes and performance optimized multi-layer entity subscene streaming systems.

### Key Features

::: info 🎯 Scene Analysis & Generation

**Intelligent scene analysis system** that identifies optimal streaming boundaries based on object density and relationships

**Automatic layer generation** that organizes GameObjects into logical streaming groups based on customizable rule sets

:::

::: tip ⚡ High-Performance Runtime

**ECS-based streaming**: Implements SubScene streaming with Unity ECS and multi-threaded Job systems

**Jobs + Burst**: Parallel distance/state evaluation with Burst-compatible jobs

**Proximity-driven decisions**: Evaluates distance thresholds for load/unload operations

:::

::: warning 🐛 Debugging & Diagnostics

**Visualization tools**: Built-in debug/distance visualizations that allow you to inspect streaming behavior.

**Diagnostic framework** to help you identify and fix potential Entity conversion and streaming issues

:::

Thanks for choosing ProStream!
