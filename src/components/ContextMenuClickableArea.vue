<template>
  <div v-on:[handler].prevent="openContextMenu">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'ContextMenuClickableArea',
  props: {
    options: { type: Array, required: true },
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
      const { pageX, pageY } = event

      this.$store.dispatch('contextMenu/open', {
        position: { x: pageX, y: pageY },
        options: this.options,
      })
    },
  },
}
</script>
