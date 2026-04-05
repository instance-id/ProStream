<script setup lang="ts">
import { computed, nextTick, onBeforeUnmount, ref, watch } from 'vue'
import { getQuickInfoPreset } from '../data/quick-info'

interface Props {
  definition?: string
  preset?: string
  title?: string
  position?: 'auto' | 'top' | 'bottom'
}

const props = withDefaults(defineProps<Props>(), {
  definition: '',
  preset: '',
  title: '',
  position: 'auto'
})

const presetContent = computed(() => getQuickInfoPreset(props.preset))
const resolvedTitle = computed(() => props.title || presetContent.value?.title || '')
const resolvedDefinition = computed(
  () => props.definition || presetContent.value?.definition || ''
)

const isOpen = ref(false)
const actualPlacement = ref<'top' | 'bottom'>('top')
const rootRef = ref<HTMLElement | null>(null)
const popoverRef = ref<HTMLElement | null>(null)

function updatePlacement() {
  if (!rootRef.value || !popoverRef.value) {
    return
  }

  if (props.position !== 'auto') {
    actualPlacement.value = props.position
    return
  }

  const margin = 12
  const triggerRect = rootRef.value.getBoundingClientRect()
  const popoverRect = popoverRef.value.getBoundingClientRect()
  const spaceAbove = triggerRect.top - margin
  const spaceBelow = window.innerHeight - triggerRect.bottom - margin

  if (spaceAbove >= popoverRect.height) {
    actualPlacement.value = 'top'
    return
  }

  if (spaceBelow >= popoverRect.height) {
    actualPlacement.value = 'bottom'
    return
  }

  actualPlacement.value = spaceBelow > spaceAbove ? 'bottom' : 'top'
}

function handleViewportChange() {
  if (!isOpen.value) {
    return
  }

  updatePlacement()
}

function bindViewportListeners() {
  window.addEventListener('resize', handleViewportChange)
  window.addEventListener('scroll', handleViewportChange, true)
}

function unbindViewportListeners() {
  window.removeEventListener('resize', handleViewportChange)
  window.removeEventListener('scroll', handleViewportChange, true)
}

function openPopover() {
  isOpen.value = true
}

function closePopover() {
  isOpen.value = false
}

function togglePopover() {
  isOpen.value = !isOpen.value
}

watch(isOpen, async (open) => {
  if (open) {
    await nextTick()
    updatePlacement()
    bindViewportListeners()
    return
  }

  unbindViewportListeners()
})

watch(
  () => props.position,
  async () => {
    if (!isOpen.value) {
      return
    }

    await nextTick()
    updatePlacement()
  }
)

onBeforeUnmount(() => {
  unbindViewportListeners()
})
</script>

<template>
  <span
    ref="rootRef"
    class="quick-info"
    :class="[`quick-info--${actualPlacement}`, { 'is-open': isOpen }]"
    @mouseenter="openPopover"
    @mouseleave="closePopover"
    @focusin="openPopover"
    @focusout="closePopover"
  >
    <span
      class="quick-info__trigger"
      tabindex="0"
      @click.stop="togglePopover"
      @keydown.enter.prevent="togglePopover"
      @keydown.space.prevent="togglePopover"
      @keydown.esc.prevent="closePopover"
    >
      <slot />
    </span>

    <Transition name="quick-info-fade">
      <span
        v-if="isOpen && ($slots.content || resolvedDefinition)"
        ref="popoverRef"
        class="quick-info__popover"
        role="tooltip"
      >
        <span v-if="resolvedTitle" class="quick-info__title">{{ resolvedTitle }}</span>
        <span class="quick-info__body">
          <slot name="content">{{ resolvedDefinition }}</slot>
        </span>
      </span>
    </Transition>
  </span>
</template>

<style scoped>
.quick-info {
  position: relative;
  display: inline-flex;
  align-items: center;
  vertical-align: middle;
}

.quick-info__trigger {
  display: inline-flex;
  align-items: center;
  cursor: help;
  outline: none;
}

.quick-info__trigger:focus-visible {
  border-radius: 14px;
  box-shadow: 0 0 0 2px color-mix(in srgb, var(--vp-c-brand-1) 45%, transparent);
}

.quick-info__popover {
  position: absolute;
  left: 50%;
  z-index: 40;
  width: min(22rem, calc(100vw - 2rem));
  padding: 0.85rem 0.95rem;
  border: 1px solid color-mix(in srgb, var(--vp-c-brand-1) 22%, var(--vp-c-border));
  border-radius: 14px;
  background: linear-gradient(180deg, color-mix(in srgb, var(--vp-c-bg-elv) 92%, var(--vp-c-brand-1) 8%), var(--vp-c-bg-elv));
  box-shadow: 0 18px 48px rgba(0, 0, 0, 0.28);
  color: var(--vp-c-text-1);
  white-space: normal;
  line-height: 1.55;
  transform: translateX(-50%);
}

.quick-info__popover::after {
  content: '';
  position: absolute;
  left: 50%;
  width: 12px;
  height: 12px;
  border-right: 1px solid color-mix(in srgb, var(--vp-c-brand-1) 22%, var(--vp-c-border));
  border-bottom: 1px solid color-mix(in srgb, var(--vp-c-brand-1) 22%, var(--vp-c-border));
  background: color-mix(in srgb, var(--vp-c-bg-elv) 94%, var(--vp-c-brand-1) 6%);
  transform: translateX(-50%) rotate(45deg);
}

.quick-info--top .quick-info__popover {
  bottom: calc(100% + 0.9rem);
}

.quick-info--top .quick-info__popover::after {
  top: calc(100% - 7px);
}

.quick-info--bottom .quick-info__popover {
  top: calc(100% + 0.9rem);
}

.quick-info--bottom .quick-info__popover::after {
  bottom: calc(100% - 7px);
  transform: translateX(-50%) rotate(225deg);
}

.quick-info__title {
  display: block;
  margin-bottom: 0.3rem;
  color: var(--vp-c-text-1);
  font-size: 0.92rem;
  font-weight: 700;
}

.quick-info__body {
  display: block;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.quick-info-fade-enter-active,
.quick-info-fade-leave-active {
  transition: opacity 0.16s ease, transform 0.16s ease;
}

.quick-info-fade-enter-from,
.quick-info-fade-leave-to {
  opacity: 0;
}

.quick-info--top .quick-info-fade-enter-from,
.quick-info--top .quick-info-fade-leave-to {
  transform: translate(-50%, 4px);
}

.quick-info--bottom .quick-info-fade-enter-from,
.quick-info--bottom .quick-info-fade-leave-to {
  transform: translate(-50%, -4px);
}

@media (max-width: 640px) {
  .quick-info__popover {
    width: min(18rem, calc(100vw - 1.5rem));
  }
}
</style>