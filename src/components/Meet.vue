<template>
  <div class="meet">
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
import { ContextMenuBus } from '@/eventBus'
import { CATEGORIES } from '@/utils/constants'
import { rgba } from 'polished'

import { IconOptions, IconClock } from '@/components/icons'
import ButtonConfirm from '@/components/ButtonConfirm'
import ContextMenuClickableArea from '@/components/ContextMenuClickableArea'

export default {
  components: { IconOptions, IconClock, ContextMenuClickableArea },
  props: {
    id: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    schedule: {
      type: Object,
      default: () => ({
        start_time: '',
        end_time: '',
      }),
    },
    durationInMinutes: Number,
    hasOptions: {
      type: Boolean,
      default: false,
    },
  },
  created() {
    const editMeetFunction = () => {
      alert(`editing meet ${this.id}... `)
    }

    const removeMeetFunction = () => {
      alert('deleting meet...')
      ContextMenuBus.$emit('@context-menu/CLOSE')
    }

    this.options = [
      { label: 'Edit meet', action: editMeetFunction },
      {
        component: ButtonConfirm,
        props: { label: 'Remove meet', confirmAction: removeMeetFunction },
      },
    ]
  },
  mounted() {
    this.setCategoryColors()
  },
  methods: {
    setCategoryColors() {
      const category = CATEGORIES.find((item) => item.name === this.category)
      if (!category) return

      const color = category.color
      const backgroundColor = rgba(color, 0.1)
      const sidebarColor = color

      this.$el.style.setProperty('--color-background', backgroundColor)
      this.$el.style.setProperty('--color-sidebar', sidebarColor)
    },
    resetCategoryColors() {
      this.$el.style = ''
    },
  },
  computed: {
    durationFormatted() {
      return `${this.durationInMinutes}min`
    },
    scheduleFormatted() {
      const { start_time, end_time } = this.schedule
      return `${start_time} - ${end_time}`
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
  $safe-title-space: 60px;
  $timing: 250ms;
  $animation: ease-in;

  --color-background: rgba(0, 0, 0, 0.05);
  --color-sidebar: #555;

  position: relative;
  padding: rem(25px $safe-title-space 25px 36px);

  background: var(--color-background);
  border-radius: var(--border-radius);
  color: var(--color-primary);
  transition: background $timing $animation;

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
    transition: background $timing $animation;
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

    &:hover::before {
      opacity: 1;
    }
  }
}
</style>
