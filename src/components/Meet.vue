<template>
  <div class="meet" :class="{ selected }">
    <ContextMenuClickableArea v-if="hasOptions" :options="options">
      <button class="options">
        <IconOptions size="35" color="#26265e" />
      </button>
    </ContextMenuClickableArea>

    <h4 class="title">{{ title }}</h4>
    <p class="category">{{ category }}</p>

    <strong class="time">
      <IconClock size="20" color="#26265e" />
      {{ durationInMinutes ? durationFormatted : scheduleFormatted }}
    </strong>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { rgba } from 'polished'

import { IconOptions, IconClock } from '@/components/icons'
import ButtonConfirm from '@/components/ButtonConfirm'
import ContextMenuClickableArea from '@/components/ContextMenuClickableArea'

export default {
  components: { IconOptions, IconClock, ContextMenuClickableArea },
  props: {
    id: { type: [String, Number], required: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    durationInMinutes: [String, Number],
    hasOptions: { type: Boolean, default: false },
    schedule: { type: Object, default: () => ({ startTime: '', endTime: '' }) },
    selected: { type: Boolean, default: false },
  },
  created() {
    this.options = [
      { label: 'Edit meet', action: this.editMeetFunction },
      {
        component: ButtonConfirm,
        props: { label: 'Remove meet', confirmAction: this.removeMeetFunction },
      },
    ]
  },
  mounted() {
    this.setCategoryColors()
  },
  methods: {
    editMeetFunction() {
      this.$store.dispatch('form/setFields', {
        id: this.id,
        title: this.title,
        category: this.category,
        duration: this.durationInMinutes,
      })
    },
    removeMeetFunction() {
      this.$store.dispatch('meet/delete', this.id)
      this.$store.dispatch('contextMenu/close')
    },

    setCategoryColors() {
      const { backgroundColor, sidebarColor } = this.categoryColor

      this.$el.style.setProperty('--color-background', backgroundColor)
      this.$el.style.setProperty('--color-sidebar', sidebarColor)
    },
    resetCategoryColors() {
      this.$el.style = ''
    },
  },
  computed: {
    ...mapState('category', { categories: 'categories' }),
    durationFormatted() {
      return `${this.durationInMinutes}min`
    },
    scheduleFormatted() {
      const { startTime, endTime } = this.schedule
      return `${startTime} - ${endTime}`
    },
    categoryColor() {
      const targetCategory = this.categories.find(
        (item) => item.name === this.category
      )

      const { color } = targetCategory

      return { backgroundColor: rgba(color, 0.1), sidebarColor: color }
    },
  },
  watch: {
    category() {
      this.resetCategoryColors()
      this.setCategoryColors()
    },
  },
}
</script>

<style lang="scss" scoped>
.meet {
  $title-space-before-icon: 60px;
  --color-background: rgba(0, 0, 0, 0.05);
  --color-sidebar: #555;

  position: relative;
  padding: rem(25px $title-space-before-icon 25px 36px);

  background: var(--color-background);
  border-radius: var(--border-radius);
  color: var(--color-primary);

  &.selected {
    border: 2px solid var(--color-sidebar);
    border-left: 0;
  }

  //sidebar
  &::before {
    position: absolute;
    content: '';
    top: 0;
    left: 0;
    width: 8px;
    height: 100%;

    background: var(--color-sidebar);
    border-top-left-radius: var(--border-radius);
    border-bottom-left-radius: var(--border-radius);
  }

  & + & {
    margin-top: rem(20px);
  }

  .title {
    font-size: rem(20px);
    font-family: $font-body;
    line-height: 1.3;
  }

  .category {
    margin: rem(6px 0 10px);
    font-size: rem(16px);
    line-height: 1.5;
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

  .options {
    all: unset;
    position: absolute;
    top: rem(20px);
    right: rem(20px);
    display: flex;
    align-items: center;
    justify-items: center;
    cursor: pointer;

    // circle
    &::before {
      position: absolute;
      content: '';
      width: 40px;
      height: 40px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      transition: opacity 100ms ease;

      border-radius: 50%;
      background: var(--color-primary-faded);
      opacity: 0;
    }

    &:focus::before,
    &:hover::before {
      opacity: 1;
    }
  }
}
</style>
