<template>
  <div class="input-group" :class="{ 'has-error': hasError, valid: isValid }">
    <label @click="focus">{{ label }}</label>

    <div class="wrapper">
      <IconArrowDown size="26" color="#333" />

      <select
        ref="input"
        @input="updateValue"
        v-on="listeners"
        v-bind="$attrs"
        :value="value"
        :aria-label="label"
      >
        <option value="" selected disabled>{{ placeholder }}</option>
        <option
          v-for="option in options"
          :key="option"
          :selected="option === value"
        >
          {{ option }}
        </option>
      </select>
    </div>

    <div class="message" v-if="hasError"><slot name="requirements" /></div>
  </div>
</template>

<script>
import { IconArrowDown } from '@/components/icons'

export default {
  name: 'InputSelect',
  inheritAttrs: false,
  components: { IconArrowDown },
  props: {
    label: {
      type: String,
      required: true,
    },
    placeholder: {
      type: String,
      required: true,
    },
    options: {
      type: Array,
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
  computed: {
    listeners() {
      return {
        // resolve the @input event conflict, if there's two @input events
        ...this.$listeners,
        input: this.updateValue,
      }
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
    --default-color: var(--color-input-has-error);

    select {
      border-color: var(--default-color);
    }
  }

  &.valid {
    --default-color: var(--color-input-valid);
  }

  & + & {
    margin-top: rem($space-after);
  }

  label {
    display: block;
    margin-bottom: rem(10px);

    font-size: rem(18px);
    font-weight: 500;
    line-height: 1.5;
    color: var(--color-primary);
  }

  select {
    width: 100%;
    min-height: rem(55px);
    padding: rem(9px 20px);

    box-shadow: none;
    appearance: none;
    line-height: 2;
    border: 2px solid transparent;
    border-radius: var(--border-radius);
    color: var(--color-primary);
    background: var(--background-color);
    transition: border 200ms ease-out;

    &:focus,
    &:active {
      --background-color: white;
      border-color: var(--default-color);
      outline: none;
    }
  }

  > .wrapper {
    position: relative;

    > svg {
      position: absolute;
      top: 50%;
      right: rem(26px);
      transform: translateY(-50%);
      margin-top: 1px;
      display: inline-block;
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
