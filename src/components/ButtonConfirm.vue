<template>
  <button :class="{ 'button-confirm': clickedTimes >= 1 }" @click="handleClick">
    <IconAttention v-if="clickedTimes >= 1" color="#fa5f1c" />
    {{ currentLabel }}
  </button>
</template>

<script>
import { IconAttention } from '@/components/icons'

export default {
  name: 'ButtonConfirm',
  components: { IconAttention },
  props: {
    label: { type: String, required: true },
    confirmAction: { type: Function, required: true },
  },
  data() {
    return {
      clickedTimes: 0,
    }
  },
  methods: {
    handleClick() {
      this.increaseClickTimes()
      this.handleTimeout()
    },
    increaseClickTimes() {
      this.clickedTimes = this.clickedTimes + 1
    },
    handleTimeout() {
      setTimeout(this.resetClick, 1500)
    },
    resetClick() {
      this.clickedTimes = 0
    },
  },
  computed: {
    currentLabel() {
      return this.clickedTimes ? 'Click to confirm' : this.label
    },
  },
  watch: {
    clickedTimes(currentValue) {
      if (currentValue === 2) this.confirmAction()
    },
  },
}
</script>

<style lang="scss" scoped>
.button-confirm {
  color: var(--color-attention) !important;

  > svg {
    margin: 0 2px -2px 0;
  }
}
</style>
