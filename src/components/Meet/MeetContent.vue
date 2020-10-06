<template>
  <div>
    <h4 class="title">{{ content.title }}</h4>
    <p class="category">{{ content.category }}</p>

    <strong class="time">
      <IconClock size="20" color="#26265e" />
      {{ timeText }}
    </strong>
  </div>
</template>

<script>
import { IconClock } from '@/components/icons'

export default {
  name: 'MeetContent',
  components: { IconClock },
  props: {
    content: { type: Object, required: true },
  },
  computed: {
    timeText() {
      return this.content.duration ? this.durationInMinutes : this.schedule
    },
    durationInMinutes() {
      return `${this.content.duration}min`
    },
    schedule() {
      const { startTime, endTime } = this.content.schedule
      if (!startTime && !endTime) return 'Schedule not defined yet'

      return `${startTime} - ${endTime}`
    },
  },
}
</script>
