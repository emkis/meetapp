<template>
  <div>
    <slot />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { rgba } from 'polished'

export default {
  name: 'MeetColorContainer',
  props: {
    category: { type: String, required: true },
  },
  mounted() {
    this.setCategoryColors()
  },
  methods: {
    setCategoryColors() {
      const { backgroundColor, sidebarColor } = this.categoryColor
      this.$parent.$el.style.setProperty('--color-background', backgroundColor)
      this.$parent.$el.style.setProperty('--color-sidebar', sidebarColor)
    },
    resetCategoryColors() {
      this.$parent.$el.style = ''
    },
  },
  computed: {
    ...mapState('category', ['categories']),
    categoryColor() {
      const currentCategory = ({ name }) => name === this.category
      const targetCategory = this.categories.find(currentCategory)

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
