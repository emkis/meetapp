<template>
  <button v-on="$listeners" class="category-button" :class="{ active }">
    {{ name }}
  </button>
</template>

<script>
export default {
  name: 'CategoryButton',
  props: {
    name: { type: String, required: true },
    active: { type: Boolean, default: false },
  },
}
</script>

<style lang="scss" scoped>
.active {
  --background-color: var(--color-primary-faded) !important;
  --border-color: var(--color-primary) !important;
}

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
