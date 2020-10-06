<template>
  <div class="meet" :class="{ selected }">
    <MeetOptions v-if="hasOptions" :handlers="optionHandlers" />
    <MeetContent :content="contentProps" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { rgba } from 'polished'

import MeetContent from './MeetContent'
import MeetOptions from './MeetOptions'

export default {
  name: 'Meet',
  components: { MeetContent, MeetOptions },
  props: {
    id: { type: [String, Number], required: true },
    title: { type: String, required: true },
    category: { type: String, required: true },
    duration: [String, Number],
    hasOptions: { type: Boolean, default: false },
    schedule: { type: Object, default: () => ({}) },
    selected: { type: Boolean, default: false },
  },
  mounted() {
    this.setCategoryColors()
  },
  methods: {
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
    ...mapState('category', ['categories']),
    optionHandlers() {
      const editHandler = () => {
        this.$store.dispatch('form/setFields', {
          id: this.id,
          title: this.title,
          category: this.category,
          duration: this.duration,
        })
      }

      const deleteHandler = () => {
        this.$store.dispatch('meet/delete', this.id)
        this.$store.dispatch('contextMenu/close')
      }

      return { editHandler, deleteHandler }
    },
    contentProps() {
      return {
        title: this.title,
        category: this.category,
        duration: this.duration,
        schedule: this.schedule,
      }
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
  white-space: normal;

  background: var(--color-background);
  border-radius: var(--border-radius);
  border: 2px solid transparent;
  border-left: 0;
  color: var(--color-primary);
  transition: border-color 200ms ease;

  &.selected {
    border-color: var(--color-sidebar);
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

  ::v-deep .title {
    font-size: rem(20px);
    font-family: $font-body;
    line-height: 1.3;
  }

  ::v-deep .category {
    margin: rem(6px 0 10px);
    font-size: rem(16px);
    line-height: 1.5;
  }

  ::v-deep .time {
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

  ::v-deep .options {
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
