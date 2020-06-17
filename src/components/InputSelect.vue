<template>
  <div class="input-group">
    <label @click="focus">{{ label }}</label>

    <select
      ref="input"
      :aria-label="label"
      v-on="listeners"
      v-bind="$attrs"
      @input="updateValue"
      :value="value"
    >
      <option
        v-for="option in options"
        :key="option"
        :selected="option === value"
      >
        {{ option }}
      </option>
    </select>
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
    options: {
      type: Array,
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
