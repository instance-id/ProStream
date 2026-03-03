import { defineConfig } from 'vitepress';

const base = '/';

export default defineConfig({
  title: 'ProStream',
  description: 'High-performance scene streaming for Unity using DOTS/ECS',
  base,

  themeConfig: {
    logo: '/logo_image_prostream.png',

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Setup', link: '/getting-started/setup' },
      { text: 'Quick Start', link: '/getting-started/sample-quickstart' },
      { text: 'Reference', link: '/reference/settings-reference' },
    ],

    sidebar: [
      // --| Getting Started ----------
      // --|---------------------------
      {
        text: 'Getting Started',
        collapsed: false,
        items: [
          { text: 'Setup', link: '/getting-started/setup' },
          { text: 'Quick Start', link: '/getting-started/sample-quickstart' },
          { text: 'Standard Workflow', link: '/getting-started/standard-workflow' },
        ],
      },

      // --| Core Concepts ------------
      // --|---------------------------
      {
        text: 'Core Concepts',
        collapsed: false,
        items: [
          { text: 'Importance of Prefabs', link: '/core-concepts/importance-of-prefabs' },
          { text: 'Streaming Layers', link: '/core-concepts/layers/streaming-layers' },
          { text: 'Workflows', link: '/core-concepts/workflows' },
        ],
      },

      // --| Editor Guide -------------
      // --|---------------------------
      {
        text: 'Editor Guide',
        collapsed: false,
        items: [
          // --| Editor Windows -------
          {
            text: 'Editor Windows',
            collapsed: true,
            items: [{ text: 'ProStream Editor', link: '/editor-guide/windows/prostream-editor' }],
          },

          // --| Components -----------
          {
            text: 'Components',
            collapsed: true,
            items: [
              { text: 'Scene Connector', link: '/editor-guide/components/scene-connector' },
              { text: 'Scene Search Filter', link: '/editor-guide/components/scene-search-filter' },
            ],
          },

          // --| Engines --------------
          {
            text: 'Engines',
            collapsed: true,
            items: [
              { text: 'Rule Engine', link: '/editor-guide/engines/rule-engine' },
              { text: 'Modification Engine', link: '/editor-guide/engines/modification-engine' },
              { text: 'Operation Engine', link: '/editor-guide/engines/operation-engine' },
              { text: 'Workflows Configuration', link: '/editor-guide/engines/workflows-configuration' },
            ],
          },

          // --| Tools ----------------
          {
            text: 'Tools',
            collapsed: true,
            items: [
              { text: 'Diagnostics', link: '/editor-guide/tools/validation-diagnostics' },
              { text: 'Pipeline Validation', link: '/editor-guide/tools/validation-pipeline' },
            ],
          },
        ],
      },

      // --| Processes ----------------
      // --|---------------------------
      {
        text: 'Processes',
        collapsed: false,
        items: [
          { text: 'Prepare Scene', link: '/processes/prepare-scene' },
          { text: 'SubScene Creation', link: '/processes/process-subscenes' },
        ],
      },

      // --| Runtime Systems ----------
      // --|---------------------------
      {
        text: 'Runtime Systems',
        collapsed: false,
        items: [
          { text: 'Runtime Streaming', link: '/runtime-systems/runtime-streaming' },
          { text: 'Advanced Configuration', link: '/runtime-systems/advanced-configuration' },
        ],
      },

      // --| Troubleshooting ----------
      // --|---------------------------
      {
        text: 'Troubleshooting',
        collapsed: false,
        items: [
          { text: 'Common Issues', link: '/troubleshooting/troubleshooting' },
          { text: 'Install & Update', link: '/reference/install-update' },
          { text: 'Build & Runtime', link: '/troubleshooting/build-runtime' },
        ],
      },

      // --| Reference ----------------
      // --|---------------------------
      {
        text: 'Reference',
        collapsed: false,
        items: [
          { text: 'Settings Reference', link: '/reference/settings-reference' },
          { text: 'Change Log', link: '/reference/change-log' },
        ],
      },
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/instance-id' }],

    search: {
      provider: 'local',
    },

    footer: {
      message: 'ProStream - High-performance scene streaming for Unity',
      copyright: 'Copyright © 2026 instance.id',
    },
  },

  head: [['link', { rel: 'icon', href: `${base}prostream_logo_1.png` }]],
});
