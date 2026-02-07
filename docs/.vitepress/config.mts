import { defineConfig } from 'vitepress'

const repoName = process.env.GITHUB_REPOSITORY?.split('/')?.[1]
const base = repoName ? `/${repoName}/` : '/'

export default defineConfig({
  title: "ProStream",
  description: "High-performance scene streaming for Unity using DOTS/ECS",
  base,

  themeConfig: {
    logo: '/logo_image_prostream.png',

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Getting Started', link: '/getting-started/prerequisites' },
      { text: 'Guide', link: '/editor-guide/windows/prostream-editor' },
      { text: 'Reference', link: '/reference/settings-reference' }
    ],

    sidebar: [
      {
        text: 'Getting Started',
        collapsed: false,
        items: [
          { text: 'Prerequisites', link: '/getting-started/prerequisites' },
          { text: 'Installation', link: '/getting-started/installation' },
          { text: 'Standard Workflow', link: '/getting-started/standard-workflow' }
        ]
      },
      {
        text: 'Core Concepts',
        collapsed: false,
        items: [
          { text: 'Importance of Prefabs', link: '/core-concepts/importance-of-prefabs' },
          { text: 'Streaming Layers', link: '/core-concepts/streaming-layers' }
        ]
      },
      {
        text: 'Editor Guide',
        collapsed: false,
        items: [
          {
            text: 'Editor Windows',
            collapsed: false,
            items: [
              { text: 'ProStream Editor', link: '/editor-guide/windows/prostream-editor' }
            ]
          },
          {
            text: 'Components',
            collapsed: false,
            items: [
              { text: 'Scene Connector', link: '/editor-guide/components/scene-connector' },
              { text: 'Scene Search Filter', link: '/editor-guide/components/scene-search-filter' }
            ]
          },
          {
            text: 'Engines',
            collapsed: false,
            items: [
              { text: 'Rule Engine', link: '/editor-guide/engines/rule-engine' },
              { text: 'Modification Engine', link: '/editor-guide/engines/modification-engine' },
              { text: 'Operation Engine', link: '/editor-guide/engines/operation-engine' }
            ]
          },
          {
            text: 'Tools',
            collapsed: false,
            items: [
              { text: 'Validation & Diagnostics', link: '/editor-guide/tools/validation-diagnostics' }
            ]
          }
        ]
      },
      {
        text: 'Processes',
        collapsed: false,
        items: [
          { text: 'Position Calculation', link: '/processes/position-calculation' },
          { text: 'SubScene Creation', link: '/processes/process-subscenes' }
        ]
      },
      {
        text: 'Runtime Systems',
        collapsed: false,
        items: [
          { text: 'Runtime Streaming', link: '/runtime-systems/runtime-streaming' }
        ]
      },
      {
        text: 'Troubleshooting',
        collapsed: false,
        items: [
          { text: 'Common Issues', link: '/troubleshooting/troubleshooting' },
          { text: 'Build & Runtime', link: '/troubleshooting/build-runtime' }
        ]
      },
      {
        text: 'Reference',
        collapsed: false,
        items: [
          { text: 'Settings Reference', link: '/reference/settings-reference' },
          { text: 'Change Log', link: '/reference/change-log' },
          { text: 'Install & Update', link: '/reference/install-update' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/instance-id' }
    ],

    search: {
      provider: 'local'
    },

    footer: {
      message: 'ProStream - High-performance scene streaming for Unity',
      copyright: 'Copyright © 2026 instance.id'
    }
  },

  head: [
    ['link', { rel: 'icon', href: `${base}prostream_logo_1.png` }]
  ]
})
