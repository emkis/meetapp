<template>
  <button class="category-button" :style="active && activeStyles">
    {{ name }}
  </button>
</template>

<script>
import { rgba } from 'polished'

export default {
  name: 'CategoryButton',
  props: {
    name: {
      type: String,
      required: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    activeStyles() {
      const primaryColor = getComputedStyle(document.documentElement)
        .getPropertyValue('--color-primary')
        .trim()

      const fadedPrimaryColor = rgba(primaryColor, 0.2)

      return `--background-color: ${fadedPrimaryColor}; --border-color: ${primaryColor};`
    },
  },
}
</script>

<style lang="scss" scoped>
.category-button {
  --background-color: var(--color-gray-primary);
  --border-color: transparent;

  $timing: 100ms;

  display: inline-block;
  flex-shrink: 0;
  padding: rem(12px 25px);
  cursor: pointer;

  border: 2px solid var(--border-color);
  border-radius: var(--border-radius);
  color: var(--color-primary);
  background: var(--background-color);
  font-weight: 400;
  transition: background $timing ease-in, border $timing ease-in,
    transform $timing ease-in;

  &:not(:last-child) {
    margin-right: rem(15px);
  }

  &:focus,
  &:focus-within {
    outline: none;
  }

  &:active {
    transform: scale(0.98);
  }
}
</style>
