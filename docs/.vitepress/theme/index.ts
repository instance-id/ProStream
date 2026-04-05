import type { Theme } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import VersionSwitcher from '@viteplus/versions/components/version-switcher.component.vue'
import QuickInfo from './components/QuickInfo.vue'
import './custom.css'
import Layout from './Layout.vue'

export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app, router, siteData }) {
    app.component('QuickInfo', QuickInfo)
    app.component('VersionSwitcher', VersionSwitcher)
  }
} satisfies Theme
