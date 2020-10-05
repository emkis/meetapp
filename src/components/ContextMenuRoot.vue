<template>
  <ContextMenu
    v-if="contextMenu.isOpen"
    :options="contextMenu.options"
    :position="contextMenu.position"
    @on-close="handleClose"
    v-click-outside="handleClose"
  />
</template>

<script>
import { mapState } from 'vuex'
import vClickOutside from 'v-click-outside'

const ContextMenu = () =>
  import(/* webpackChunkName: "ContextMenu" */ '@/components/ContextMenu')

export default {
  name: 'ContextMenuRoot',
  components: { ContextMenu },
  directives: {
    clickOutside: vClickOutside.directive,
  },
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
