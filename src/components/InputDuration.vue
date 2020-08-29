<template>
  <div class="input-duration">
    <BaseInput
      type="number"
      min="5"
      step="5"
      v-bind="$attrs"
      v-model.trim="duration"
      @input="v.$touch()"
      :label="label"
      :isValid="!v.$invalid"
      :hasError="v.$error"
    >
      <template #requirements>
        <p v-if="!v.required">You need to provide a duration</p>
        <p v-else-if="!v.isGreaterThanZero">
          You need to provide a positive number
        </p>
        <p v-else-if="!v.isMultipleOfFive">Only multiple of five are allowed</p>
        <p v-else-if="!v.isLessThanLimit">Can't be greater than 240 minutes</p>
      </template>
    </BaseInput>
  </div>
</template>

<script>
export default {
  name: 'InputDuration',
  inheritAttrs: false,
  props: {
    v: {
      type: Object,
      required: true,
    },
    label: {
      type: String,
      required: true,
    },
    value: {
      type: String,
      default: '',
    },
  },
  computed: {
    duration: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      },
    },
  },
}
</script>
