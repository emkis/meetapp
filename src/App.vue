<template>
  <div id="app">
    <router-view />
    <ContextMenuRoot />
  </div>
</template>

<script>
import fullViewportHeightMixin from '@/mixins/fullViewportHeightMixin'
import ContextMenuRoot from '@/components/ContextMenuRoot'

export default {
  mixins: [fullViewportHeightMixin],
  components: { ContextMenuRoot },
}
</script>
