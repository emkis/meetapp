<template>
  <div v-on:[clickHandler].prevent="openContextMenu">
    <slot />
  </div>
</template>

<script>
import { ContextMenuBus } from '@/eventBus'

export default {
  name: 'ContextMenuClickableArea',
  props: {
    options: {
      type: Array,
      required: true,
    },
    clickHandler: {
      type: String,
      default: 'click',
      validator(value) {
        const handlers = ['click', 'contextmenu']
        return handlers.includes(value)
      },
    },
  },
  methods: {
    openContextMenu(event) {
      const { clientX, clientY } = event

      ContextMenuBus.$emit('@context-menu/OPEN', {
        position: { x: clientX, y: clientY },
        options: this.options,
      })
    },
  },
}
</script>
