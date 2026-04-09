import { defineVersionedConfig } from '@viteplus/versions';
import { renderMermaidFenceToHtml } from '../../scripts/mermaid-diagrams.mjs';

const base = '/';
const currentVersion = '0.2.1';

export default defineVersionedConfig({
  title: 'ProStream',
  description: 'High-performance scene streaming for Unity using DOTS/ECS',
  base,
  markdown: {
    config: (md: any) => {
      const defaultFence = md.renderer.rules.fence?.bind(md.renderer.rules);
      if (!defaultFence) return;

      md.renderer.rules.fence = (tokens: any, index: any, options: any, env: any, self: any) => {
        const token = tokens[index];
        if (token.info.trim() === 'mermaid') {
          return renderMermaidFenceToHtml(token.content, {
            alt: 'Workflow process diagram'
          });
        }

        return defaultFence(tokens, index, options, env, self);
      };
    }
  },
  versionsConfig: {
    current: currentVersion,
    sources: 'src',
    archive: 'archive',
    versionSwitcher: false
  },

  themeConfig: {
    logo: '/logo_image_prostream.png',

    nav: [
      { text: 'Home', link: '/' },
      { text: 'Setup', link: '/getting-started/setup' },
      { text: 'Quick Start', link: '/getting-started/sample-quickstart' },
      { text: 'Roadmap', link: '/planned-features/' },
      { text: 'Reference', link: '/reference/settings-reference' },
      { text: 'Support', link: 'https://prostream.instance.id' },
      { component: 'VersionSwitcher' }
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
          { text: 'Standard Workflow', link: '/getting-started/standard-workflow' }
        ]
      },

      // --| Core Concepts ------------
      // --|---------------------------
      {
        text: 'Core Concepts',
        collapsed: false,
        items: [
          { text: 'Importance of Prefabs', link: '/core-concepts/importance-of-prefabs' },
          { text: 'Streaming Layers', link: '/core-concepts/layers/streaming-layers' },
          {
            text: 'Workflows',
            link: '/core-concepts/workflows',
            collapsed: false,
            items: [
              { text: 'InstanceObjects', link: '/core-concepts/workflow-guides/instanceobjects-workflow' },
              { text: 'ColliderObjects', link: '/core-concepts/workflow-guides/colliderobjects-workflow' }
            ]
          }
        ]
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
            items: [{ text: 'ProStream Editor', link: '/editor-guide/windows/prostream-editor' }]
          },

          // --| Components -----------
          {
            text: 'Components',
            collapsed: true,
            items: [
              { text: 'Scene Connector', link: '/editor-guide/components/scene-connector' },
              { text: 'Scene Search Filter', link: '/editor-guide/components/scene-search-filter' }
            ]
          },

          // --| Engines --------------
          {
            text: 'Engines',
            collapsed: true,
            items: [
              { text: 'Rule Engine', link: '/editor-guide/engines/rule-engine' },
              { text: 'Modification Engine', link: '/editor-guide/engines/modification-engine' },
              { text: 'Operation Engine', link: '/editor-guide/engines/operation-engine' },
              { text: 'Workflows Configuration', link: '/editor-guide/engines/workflows-configuration' }
            ]
          },

          // --| Tools ----------------
          {
            text: 'Tools',
            collapsed: true,
            items: [
              { text: 'Diagnostics', link: '/editor-guide/tools/validation-diagnostics' },
              { text: 'Pipeline Validation', link: '/editor-guide/tools/validation-pipeline' }
            ]
          }
        ]
      },

      // --| Processes ----------------
      // --|---------------------------
      {
        text: 'Processes',
        collapsed: false,
        items: [
          { text: 'Prepare Scene', link: '/processes/prepare-scene' },
          { text: 'SubScene Creation', link: '/processes/process-subscenes' }
        ]
      },

      // --| Runtime Systems ----------
      // --|---------------------------
      {
        text: 'Runtime Systems',
        collapsed: false,
        items: [
          { text: 'Runtime Streaming', link: '/runtime-systems/runtime-streaming' },
          { text: 'Advanced Configuration', link: '/runtime-systems/advanced-configuration' }
        ]
      },

      // --| Known Limitations --------
      // --|---------------------------
      {
        text: 'Known Limitations',
        collapsed: false,
        items: [{ text: 'Overview', link: '/known-limitations/overview' }]
      },

      // --| Planned Features ---------
      // --|---------------------------
      {
        text: 'Planned Features',
        collapsed: false,
        items: [
          { text: 'Overview', link: '/planned-features/' },
          { text: 'DataObjects Workflow', link: '/planned-features/dataobjects-workflow' },
          { text: 'RemoteScenes Workflow', link: '/planned-features/remote-scenes-workflow' },
          { text: 'Terrain System', link: '/planned-features/terrain-system' },
          { text: 'Visibility and Frustum Culling', link: '/planned-features/visibility-culling' },
          { text: 'Impostor Baking', link: '/planned-features/impostor-baking' }
        ]
      },

      // --| Troubleshooting ----------
      // --|---------------------------
      {
        text: 'Troubleshooting',
        collapsed: false,
        items: [
          { text: 'Common Issues', link: '/troubleshooting/troubleshooting' },
          { text: 'Install & Update', link: '/troubleshooting/install-update' },
          { text: 'Build & Runtime', link: '/troubleshooting/build-runtime' }
        ]
      },

      // --| Reference ----------------
      // --|---------------------------
      {
        text: 'Reference',
        collapsed: false,
        items: [
          { text: 'FAQ', link: '/reference/faq' },
          { text: 'Settings Reference', link: '/reference/settings-reference' },
          { text: 'Change Log', link: '/reference/change-log' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'youtube', link: 'https://www.youtube.com/@instanceid' },
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

  head: [['link', { rel: 'icon', href: `${base}prostream_logo_1.png` }]]
});
