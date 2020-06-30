<template>
  <form id="registration-form" @submit.prevent="handleSubmit">
    <BaseInput
      label="Meet name"
      v-model.trim="meetName"
      @input="$v.meetName.$touch()"
      :isValid="!$v.meetName.$invalid"
      :hasError="$v.meetName.$error"
    >
      <template #requirements>
        <p v-if="!$v.meetName.required">You need to provide a name</p>
        <p v-else-if="!$v.meetName.haveOnlyLetters">Only letters are allowed</p>
      </template>
    </BaseInput>

    <InputDuration
      label="Meet duration in minutes"
      v-model="meetDuration"
      :v="$v.meetDuration"
    />

    <InputSelect
      label="Meet category"
      placeholder="Choose a category"
      :options="categoryNames"
      v-model.trim="meetCategory"
      @input="$v.meetCategory.$touch()"
      :isValid="!$v.meetCategory.$invalid"
      :hasError="$v.meetCategory.$error"
    >
      <template #requirements>
        <p v-if="!$v.meetCategory.required">You need to choose a category</p>
      </template>
    </InputSelect>

    <div class="action-buttons">
      <BaseButton v-if="isEditing" type="button">Cancel</BaseButton>
      <BaseButton theme="primary" type="submit">
        {{ submitButtonText }}
      </BaseButton>
    </div>
  </form>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
import {
  isMultipleOfFive,
  haveOnlyLetters,
  isLessThanLimit,
} from '@/utils/validators'
import { CATEGORIES } from '@/utils/constants'

import InputDuration from '@/components/InputDuration'
import InputSelect from '@/components/InputSelect'

export default {
  name: 'RegistrationForm',
  components: { InputDuration, InputSelect },
  props: {
    isEditing: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      meetName: '',
      meetDuration: null,
      meetCategory: '',
    }
  },
  validations: {
    meetName: {
      required,
      haveOnlyLetters,
    },
    meetDuration: {
      required,
      isMultipleOfFive,
      isLessThanLimit,
    },
    meetCategory: {
      required,
    },
  },
  methods: {
    handleSubmit() {
      this.$v.$touch()

      if (!this.$v.invalid) {
        console.log('subitted')
        console.log(this.meetName, this.meetDuration, this.meetCategory)
      }
    },
  },
  computed: {
    categoryNames() {
      return CATEGORIES.map((category) => category.name)
    },
    submitButtonText() {
      return this.isEditing ? 'Save changes' : 'Create meet'
    },
  },
}
</script>

<style lang="scss" scoped>
#registration-form {
  > * + * {
    margin-top: rem(25px);
  }

  > .action-buttons {
    display: flex;
    margin-top: rem(40px);

    button {
      margin-right: rem(15px);
      min-height: rem(55px);
    }
  }
}
</style>
