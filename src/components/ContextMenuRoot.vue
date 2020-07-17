<template>
  <ContextMenu
    v-if="contextMenu.isOpen"
    :options="contextMenu.options"
    :position="contextMenu.position"
    @onClose="handleClose"
    v-click-outside="handleClose"
  />
</template>

<script>
import { mapState } from 'vuex'
import ContextMenu from '@/components/ContextMenu'

export default {
  name: 'ContextMenuRoot',
  components: { ContextMenu },
  computed: {
    ...mapState(['contextMenu']),
  },
  methods: {
    handleClose() {
      this.$store.dispatch('contextMenu/close')
    },
  },
}
</script>
