# ProStream Documentation

High-performance scene streaming for Unity using DOTS/ECS.

## Documentation Site

This repository contains the documentation for ProStream, built with VitePress.

## Local Development

### Prerequisites

- Node.js 18+ 
- npm

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run docs:dev
```

The documentation site will be available at `http://localhost:5173`

### Build

```bash
# Build for production
npm run docs:build

# Preview production build
npm run docs:preview
```

## Deployment

The documentation is automatically deployed to GitHub Pages when changes are pushed to the main branch.

## Documentation Structure

```
docs/
├── .vitepress/          # VitePress configuration
│   ├── config.mts       # Site configuration
│   └── theme/           # Custom theme
├── public/              # Static assets (images, etc.)
├── getting-started/     # Getting Started guides
├── core-concepts/       # Core concepts documentation
├── editor-guide/        # Editor tools and features
├── processes/           # Workflow processes
├── runtime-systems/     # Runtime behavior
├── troubleshooting/     # Common issues and solutions
└── reference/           # Reference documentation
```

## Contributing

When adding new documentation:

1. Create markdown files in the appropriate section
2. Update `.vitepress/config.mts` to add navigation links
3. Use proper markdown formatting and VitePress features
4. Test locally before committing

## About ProStream

ProStream is an advanced Unity developer tool that automates the conversion of traditional GameObject scenes to DOTS entity subscenes, featuring intelligent scene analysis and optimized streaming layers.

### Key Features

- **Scene Automation & Processing**: Intelligent scene analysis and automatic layer generation
- **Performance Optimization**: Automated frustum culling with Burst compilation
- **Developer Experience**: Intuitive Unity editor integration
- **Diagnostics & Troubleshooting**: Comprehensive diagnostic tools

## License

Copyright © 2024 instance.id
