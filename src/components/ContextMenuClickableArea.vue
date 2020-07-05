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
      const { pageX, pageY } = event

      ContextMenuBus.$emit('@context-menu/OPEN', {
        position: { x: pageX, y: pageY },
        options: this.options,
      })
    },
  },
}
</script>
