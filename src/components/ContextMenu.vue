<template>
  <div class="contex-menu-list" :style="positionStyles">
    <component
      class="option"
      v-for="(option, index) in options"
      :key="index"
      :is="option.component ? option.component : DEFAULT_COMPONENT"
      v-bind="option.component && option.props"
      @click="!option.component && handleAction(option.action)"
    >
      {{ option.label }}
    </component>
  </div>
</template>

<script>
export default {
  name: 'ContextMenu',
  props: {
    position: {
      type: Object,
      required: true,
      // TODO: create validator
    },
    options: {
      type: Array,
      required: true,
      validator(options) {
        const receivedProps = options.map((option) => {
          if (typeof option !== 'object') return false
          return (
            ('label' in option && 'action' in option) || 'component' in option
          )
        })

        return !receivedProps.some((prop) => prop === false)
      },
    },
  },
  created() {
    this.DEFAULT_COMPONENT = 'button'

    document.addEventListener('keyup', this.handleEscKeyup)
  },

  methods: {
    handleEscKeyup(event) {
      const escapeKey = event.keyCode === 27
      if (escapeKey) this.handleClose()
    },
    handleAction(actionFunction) {
      actionFunction()
      this.handleClose()
    },
    handleClose() {
      this.$emit('onClose')
    },
  },
  computed: {
    positionStyles() {
      const positionY = this.position.y
      const positionX = this.position.x

      return `top: ${positionY}px; left: ${positionX}px;`
    },
  },
  beforeDestroy() {
    document.removeEventListener('keyup', this.handleEscKeyup)
  },
}
</script>

<style lang="scss" scoped>
.contex-menu-list {
  position: absolute;
  padding: rem(6px 0);
  min-width: rem(170px);
  max-width: rem(250px);
  overflow: hidden;
  user-select: none;
  z-index: $layer-popover;

  background: white;
  border-radius: var(--border-radius);
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25);

  .option {
    all: unset;
    display: block;
    max-width: 100%;
    width: 100%;
    padding: rem(15px);
    cursor: pointer;

    text-align: left;
    color: var(--color-primary);
    transition: background 100ms ease;

    &:hover {
      background: var(--color-gray-primary);
    }
  }
}
</style>
