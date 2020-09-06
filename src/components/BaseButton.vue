<template>
  <button class="button" :class="theme" v-on="$listeners">
    <slot />
  </button>
</template>

<script>
const THEMES = ['default', 'primary']

export default {
  name: 'BaseButton',
  props: {
    theme: {
      type: String,
      default: 'default',
      validator(wantedTheme) {
        return THEMES.some((theme) => theme === wantedTheme)
      },
    },
  },
}
</script>

<style lang="scss" scoped>
.default {
  --background-color: var(--color-gray-primary);
  --color-text: var(--color-primary);
}

.primary {
  --background-color: var(--color-primary);
  --color-text: white;
}

$timing: 100ms;

.button {
  display: flex;
  align-items: center;
  padding: rem(12px 25px);
  transition: opacity $timing ease-in, transform $timing ease-in;
  cursor: pointer;

  border: 0;
  border-radius: var(--border-radius);
  color: var(--color-text);
  background: var(--background-color);
  font-weight: 400;

  > svg {
    margin-right: rem(8px);
  }

  &:focus,
  &:focus-within {
    outline: none;
  }

  &:active {
    transform: scale(0.98);
  }

  &:disabled {
    opacity: 0.45;
    cursor: not-allowed;
  }
}
</style>
