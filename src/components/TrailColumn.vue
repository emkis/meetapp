<template>
  <div class="trail-column">
    <section class="inner">
      <p class="title">Trail {{ columnNumber | numberToWord }}</p>

      <div class="scrollable">
        <component
          :is="event.component"
          :key="event.id"
          v-for="event in formattedTrail"
          v-bind="event.props"
        />

        <EmptyMessage v-if="isTrailEmpty">
          No meets found on this trail
        </EmptyMessage>
      </div>
    </section>
  </div>
</template>

<script>
import { numberToWord } from '@/utils/string'
import { EVENT_TYPES } from '@/utils/constants'

import Meet from '@/components/Meet'
import MeetBreak from '@/components/MeetBreak'
import EmptyMessage from '@/components/EmptyMessage'

function sanitizeEvent(event) {
  const { id, title, category, schedule } = event
  const defaultProps = { id, title, schedule }

  if (event.type === EVENT_TYPES.MEET) {
    return { component: Meet, props: { ...defaultProps, category } }
  }

  return { component: MeetBreak, props: { ...defaultProps } }
}

export default {
  name: 'TrailColumn',
  filters: { numberToWord },
  components: { EmptyMessage },
  props: {
    trail: { type: Array, required: true },
    columnNumber: { type: Number, required: true },
  },
  computed: {
    formattedTrail() {
      return this.trail.map(sanitizeEvent)
    },
    isTrailEmpty() {
      return this.trail.length === 0
    },
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
