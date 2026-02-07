---
layout: home

hero:
  name: "ProStream"
  text: "High-Performance Scene Streaming"
  tagline: "Advanced Unity developer tool for scene conversion and streaming using DOTS/ECS"
  actions:
    - theme: brand
      text: Get Started
      link: /getting-started/installation
    - theme: alt
      text: View on GitHub
      link: https://github.com/instance-id

features:
  - title: Installation
    details: Get started with ProStream quickly and easily with our guided installer
    link: /getting-started/installation
  - title: Standard Workflow
    details: Complete workflow overview from setup to runtime streaming
    link: /getting-started/standard-workflow
  - title: Setup Requirements
    details: Prerequisites and recommended settings for optimal performance
    link: /getting-started/prerequisites
  - title: Streaming Layers
    details: Configure distance-based loading for optimal performance
    link: /core-concepts/streaming-layers
  - title: Rule Engine
    details: Categorize objects into layers with powerful matching rules
    link: /editor-guide/engines/rule-engine
  - title: Runtime Systems
    details: Understanding ProStream's distance-based streaming systems
    link: /runtime-systems/runtime-streaming
  - title: Position Calculation
    details: Understanding the 5-phase rule matching process
    link: /processes/position-calculation
  - title: SubScene Creation
    details: SubScene asset creation and hierarchy management
    link: /processes/process-subscenes
  - title: Modification System
    details: Extend ProStream with custom processing capabilities
    link: /editor-guide/engines/modification-engine
  - title: Troubleshooting
    details: Common issues and solutions to keep you productive
    link: /troubleshooting/troubleshooting
---

## What is ProStream?

ProStream is a comprehensive Unity developer tool that automates the conversion of traditional GameObject scenes to DOTS entity subscenes. It features a rule-based engine that intelligently analyzes scene structures and automatically creates optimized streaming layers.

### Key Features

- **Scene Automation & Processing**: Intelligent scene analysis system that identifies optimal streaming boundaries
- **Performance Optimization**: Automated frustum culling integration using Unity's job system with Burst compilation
- **Developer Experience**: Intuitive Unity editor integration with wizard-style guidance
- **Diagnostics & Troubleshooting**: Comprehensive diagnostic engine framework for issue identification

### Technical Highlights

**Scene Automation**
- Automatic layer generation based on customizable rule sets
- GameObject-to-Entity conversion pipeline with hierarchy preservation
- Subscene creation system for efficient streaming units

**Performance Tools**
- Configurable terrain LOD generation system
- Performance metrics tracking with Unity's ProfilerRecorder API
- Automated bounds checking and occlusion systems

**Developer Tools**
- Visual feedback systems showing streaming boundaries
- Serialized configuration settings for reusable parameters
- Automated validation systems for production-ready scenes

Thanks for choosing ProStream!
