<template>
  <ContextMenu
    v-if="isOpen"
    :options="options"
    :position="position"
    @onClose="handleClose"
    v-click-outside="handleClose"
  />
</template>

<script>
import { ContextMenuBus } from '@/eventBus'
import ContextMenu from '@/components/ContextMenu'

export default {
  name: 'ContextMenuRoot',
  components: { ContextMenu },
  data() {
    return {
      isOpen: false,
      options: null,
      position: null,
    }
  },
  created() {
    ContextMenuBus.$on('@context-menu/CLOSE', this.handleClose)

    ContextMenuBus.$on('@context-menu/OPEN', ({ options, position }) => {
      this.isOpen = true
      this.options = options
      this.position = position
    })
  },
  methods: {
    handleClose() {
      this.isOpen = false
      this.options = null
      this.position = null
    },
  },
}
</script>
