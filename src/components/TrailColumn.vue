<template>
  <div class="trail-column">
    <p class="title">Trail {{ columnNumber | numberToWord }}</p>

    <div class="scrollable">
      <Meet
        :key="meet.id"
        v-for="meet in trail"
        :id="meet.id"
        :title="meet.title"
        :category="meet.category"
        :schedule="meet.schedule"
      />
    </div>
  </div>
</template>

<script>
import { numberToWord } from '@/utils/string'

import Meet from '@/components/Meet'
// import MeetBreak from '@/components/MeetBreak'

export default {
  name: 'TrailColumn',
  components: { Meet },
  filters: { numberToWord },
  props: {
    trail: { type: Array, required: true },
    columnNumber: { type: Number, required: true },
  },
}
</script>

<style lang="scss" scoped>
.trail-column {
  position: relative;
  overflow: hidden;
  margin-bottom: 30px;

  .title {
    margin-bottom: rem(10px);

    font-size: rem(20px);
    font-weight: 400;
    line-height: 1.5;
    color: var(--color-gray-dark);
  }

  .scrollable {
    position: absolute;
    top: 40px;
    left: 0;
    width: 100%;
    height: 100%;

    overflow-y: auto;

    * + * {
      margin-top: rem(20px);
    }

    .meet {
      margin-right: 5px;
    }
  }
}
</style>
