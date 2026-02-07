<script setup lang="ts">
import { h } from 'vue'
import { useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import LogoVideo from './LogoVideo.vue'

const { frontmatter } = useData()

const Layout = () => {
  return h(DefaultTheme.Layout, null, {
    'home-hero-image': () => h(LogoVideo)
  })
}
</script>

<template>
  <Layout />
</template>
