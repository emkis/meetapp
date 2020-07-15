<template>
  <div id="trails-board" v-dragscroll="true">
    <TrailColumn />
    <TrailColumn />
    <TrailColumn />
    <TrailColumn />
    <TrailColumn />
  </div>
</template>

<script>
import { dragscroll } from 'vue-dragscroll'

import TrailColumn from '@/components/TrailColumn'

export default {
  name: 'TrailsBoard',
  components: { TrailColumn },
  directives: { dragscroll },
}
</script>

<style lang="scss" scoped>
#trails-board {
  $meet-width: rem(433px);

  display: grid;
  grid-template-columns: repeat(auto-fill, minmax($meet-width, 1fr));
  grid-auto-columns: minmax($meet-width, 1fr);
  grid-auto-flow: column;
  grid-gap: 40px;

  overflow-x: auto;
}
</style>
