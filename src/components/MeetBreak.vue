<template>
  <div class="meet-break">
    <h4 class="title">{{ title }}</h4>

    <strong class="time">
      <IconClock size="20" />
      {{ schedule.startTime }} - {{ schedule.endTime }}
    </strong>
  </div>
</template>

<script>
import { IconClock } from '@/components/icons'

export default {
  components: { IconClock },
  props: {
    title: { type: String, required: true },
    schedule: { type: Object, required: true },
  },
}
</script>

<style lang="scss" scoped>
.meet-break {
  padding: rem(25px 36px);
  border-radius: var(--border-radius);
  color: var(--color-gray-dark);
  background: var(--color-gray-primary);

  .title {
    font-size: rem(20px);
    font-family: $font-body;
    line-height: 1.3;
    margin-bottom: rem(10px);
  }

  .time {
    display: flex;
    justify-content: flex-start;
    align-items: center;

    font-size: rem(16px);
    font-weight: 700;
    line-height: 1;

    > svg {
      margin-right: 6px;
    }
  }
}
</style>
