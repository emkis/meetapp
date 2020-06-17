<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import fullViewportHeightMixin from '@/mixins/fullViewportHeightMixin'

export default {
  mixins: [fullViewportHeightMixin],
}
</script>
