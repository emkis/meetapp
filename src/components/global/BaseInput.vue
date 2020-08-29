<template>
  <fieldset class="input" :class="{ invalid: hasError, valid: isValid }">
    <label :for="customId">{{ label }}</label>

    <input
      :id="customId"
      @input="updateValue"
      v-bind="$attrs"
      :value="value"
      :aria-label="label"
    />

    <div class="message" v-if="hasError"><slot name="requirements" /></div>
  </fieldset>
</template>

<script>
export default {
  name: 'BaseInput',
  inheritAttrs: false,
  props: {
    customId: { type: String, required: true },
    label: { type: String, required: true },
    isValid: { type: Boolean, default: false },
    hasError: { type: Boolean, default: false },
    value: { type: [String, Number] },
  },
  methods: {
    updateValue({ target }) {
      this.$emit('input', target.value)
    },
  },
}
</script>

<style lang="scss" scoped>
.input {
  border: 0;
  padding: 0;

  --background-color: var(--color-gray-primary);
  --default-color: var(--color-primary);

  &.invalid {
    --default-color: var(--color-input-has-error);

    input {
      border-color: var(--default-color);
    }
  }

  &.valid {
    --default-color: var(--color-input-valid);
  }

  & + & {
    margin-top: rem(25px);
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
    padding: rem(8px 20px);

    box-shadow: none;
    border: 2px solid transparent;
    border-radius: var(--border-radius);
    color: var(--color-primary);
    background: var(--background-color);
    transition: background 200ms ease-out, border 200ms ease-out;

    &:focus,
    &:active {
      --background-color: white;
      border-color: var(--default-color);
      outline: none;
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
