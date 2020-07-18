<template>
  <div class="context-menu" :style="positionStyles">
    <component
      class="context-menu__option"
      v-for="(option, index) in options"
      :key="index"
      :is="option.component ? option.component : $options.defaultComponent"
      v-bind="option.component && option.props"
      @click="!option.component && handleAction(option.action)"
    >
      {{ option.label }}
    </component>
  </div>
</template>

<script>
import Joi from '@hapi/joi'

export default {
  name: 'ContextMenu',
  props: {
    position: {
      type: Object,
      required: true,
      validator(props) {
        const schema = Joi.object({
          x: Joi.number().required(),
          y: Joi.number().required(),
        })

        return !schema.validate(props).error
      },
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
  defaultComponent: 'button',
  data() {
    return {
      componentWidth: 0,
      componentHeight: 0,
    }
  },
  mounted() {
    this.getComponentSize()
    this.$nextTick(this.getComponentSize)
  },
  created() {
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
    getComponentSize() {
      this.componentWidth = this.$el.clientWidth
      this.componentHeight = this.$el.offsetHeight
    },
  },
  computed: {
    positionStyles() {
      const pageWidth = window.innerWidth
      const pageHeight = window.innerHeight
      const { x: positionX, y: positionY } = this.position

      const percentages = {
        x: ((positionX + this.componentWidth) * 100) / pageWidth,
        y: ((positionY + this.componentHeight) * 100) / pageHeight,
        limit: 97,
      }

      const isNearPageEnd = {
        x: percentages.x > percentages.limit,
        y: percentages.y > percentages.limit,
      }

      const safePosition = {
        x: isNearPageEnd.x ? positionX - this.componentWidth : positionX,
        y: isNearPageEnd.y ? positionY - this.componentHeight : positionY,
      }

      return { top: `${safePosition.y}px`, left: `${safePosition.x}px` }
    },
  },
  beforeDestroy() {
    document.removeEventListener('keyup', this.handleEscKeyup)
  },
}
</script>

<style lang="scss" scoped>
.context-menu {
  position: absolute;
  padding: rem(6px 0);
  min-width: rem(170px);
  max-width: rem(250px);
  display: flex;
  flex-direction: column;
  user-select: none;
  z-index: $layer-popover;

  background: white;
  border-radius: var(--border-radius);
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.25);

  &__option {
    all: unset;
    padding: rem(15px);
    cursor: pointer;

    text-align: left;
    color: var(--color-primary);
    transition: background 100ms ease;

    &:hover,
    &:active {
      background: var(--color-gray-primary);
    }
  }
}
</style>
