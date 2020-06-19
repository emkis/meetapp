<template>
  <div class="input-group" :class="{ 'has-error': hasError, valid: isValid }">
    <label @click="focus">{{ label }}</label>

    <div class="wrapper">
      <input
        ref="input"
        @input="updateValue"
        v-bind="$attrs"
        :value="value"
        :aria-label="label"
      />
    </div>

    <div class="message" v-if="hasError"><slot name="requirements" /></div>
  </div>
</template>

<script>
export default {
  name: 'BaseInput',
  inheritAttrs: false,
  props: {
    label: {
      type: String,
      required: true,
    },
    isValid: {
      type: Boolean,
      default: false,
    },
    hasError: {
      type: Boolean,
      default: false,
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
  --background-color: var(--color-gray-primary);
  --default-color: var(--color-primary);
  $space-after: 25px;

  &.has-error {
    --background-color: rgba(217, 48, 37, 0.2);
    --default-color: rgb(217, 48, 37);
  }

  &.valid {
    --background-color: rgba(37, 217, 37, 0.2);
    --default-color: rgb(37, 217, 37);
  }

  & + & {
    margin-top: rem($space-after);
  }

  label {
    display: inline-block;
    margin-bottom: rem(10px);

    font-size: rem(18px);
    font-weight: 500;
    line-height: 1.5;
    color: var(--color-primary);
  }

  input {
    width: 100%;
    min-height: rem(55px);
    padding: rem(8px 60px 8px 20px);

    box-shadow: none;
    border: 2px solid transparent;
    border-radius: var(--border-radius);
    color: var(--color-primary);
    background: var(--background-color);
    transition: background 200ms ease-out, border 200ms ease-out;

    &:focus,
    &:active {
      outline: none;
      border-color: var(--default-color);
    }
  }

  > .wrapper {
    position: relative;

    &::before {
      position: absolute;
      content: '😸🙀😿😄🤔😯';
      top: 50%;
      right: rem(26px);
      transform: translateY(-50%);
      pointer-events: none;
    }
  }

  > .message {
    margin-top: rem(6px);
    font-size: rem(14px);
    line-height: 1.3;

    color: var(--default-color);
  }
}
</style>
