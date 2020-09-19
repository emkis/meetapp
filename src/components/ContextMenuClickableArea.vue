<template>
  <div v-on:[handler].prevent="openContextMenu">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'ContextMenuClickableArea',
  props: {
    options: {
      type: Array,
      required: true,
    },
    handler: {
      type: String,
      default: 'click',
      validator(value) {
        const handlers = ['click', 'contextmenu']
        return handlers.includes(value)
      },
    },
  },
  methods: {
    openContextMenu(event) {
      const { srcElement } = event
      const sourceElementPosition = srcElement.getClientRects()[0]
      const { x, y } = sourceElementPosition

      this.$store.dispatch('contextMenu/open', {
        position: { x, y },
        options: this.options,
      })
    },
  },
}
</script>
