<template>
  <div class="input-group">
    <label @click="focus">{{ label }}</label>
    <input
      ref="input"
      @input="updateValue"
      v-bind="$attrs"
      :value="value"
      :aria-label="label"
    />
  </div>
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      required: true,
    },
    value: {
      type: [String, Number],
      default: '',
    },
  },
  methods: {
    updateValue({ target }) {
      this.$emit('input', target.value)
    },
    focus() {
      this.$refs.input.focus()
    },
  },
}
</script>

<style lang="scss" scoped>
.input-group {
  width: 100%;

  & + & {
    margin-top: rem(25px);
  }

  label {
    display: block;
    margin-bottom: rem(10px);

    font-size: rem(18px);
    font-weight: 500;
    line-height: 1.5;
    color: var(--color-primary);
  }

  input {
    width: 100%;
    min-height: rem(55px);
    padding: rem(8px 20px);

    box-shadow: none;
    border: 2px solid transparent;
    border-radius: var(--border-radius);
    color: var(--color-primary);
    background: var(--color-gray-primary);
    transition: border 200ms ease-out;

    &:focus,
    &:active {
      outline: none;
      border-color: var(--color-primary);
    }
  }
}
</style>
