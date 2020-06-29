<template>
  <div @click="openContextMenu">
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
