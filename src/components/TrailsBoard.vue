<template>
  <div id="trails-board">
    <main v-dragscroll="true">
      <TrailColumn />
      <TrailColumn />
      <TrailColumn />
      <TrailColumn />
      <TrailColumn />
    </main>
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
  $meet-width: rem(430px);

  position: relative;
  user-select: none;
  overflow-x: auto;
  margin-bottom: 13px;

  main {
    white-space: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    padding-bottom: 10px;
  }

  .trail-column {
    display: inline-block;
    width: $meet-width;
    margin: 0 20px;
    height: 100%;

    &:first-child {
      margin-left: 40px;
    }

    &:last-child {
      margin-right: 40px;
    }
  }
}
</style>
