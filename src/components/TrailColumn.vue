<template>
  <div class="trail-column">
    <section class="inner">
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
    </section>
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
  .inner {
    display: flex;
    flex-direction: column;
    max-height: 100%;
  }

  .title {
    margin-bottom: rem(10px);

    font-size: rem(20px);
    font-weight: 400;
    line-height: 1.5;
    color: var(--color-gray-dark);
  }

  .scrollable {
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
