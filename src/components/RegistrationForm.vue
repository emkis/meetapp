<template>
  <form id="registration-form" @submit.prevent="handleSubmit">
    <BaseInput
      label="Meet name"
      v-model="meetName"
      @input="$v.meetName.$touch()"
      :isValid="!$v.meetName.$invalid"
      :hasError="$v.meetName.$error"
      autofocus
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
      :options="categories"
      v-model="meetCategory"
      @input="$v.meetCategory.$touch()"
      :isValid="!$v.meetCategory.$invalid"
      :hasError="$v.meetCategory.$error"
    >
      <template #requirements>
        <p v-if="!$v.meetCategory.required">You need to choose a category</p>
      </template>
    </InputSelect>

    <div class="action-buttons">
      <BaseButton v-if="isEditing" @click="handleRevertChanges">
        Cancel
      </BaseButton>
      <BaseButton theme="primary" type="submit">
        {{ submitButtonText }}
      </BaseButton>
    </div>
  </form>
</template>

<script>
import {
  isMultipleOfFive,
  haveOnlyLetters,
  isLessThanLimit,
  isGreaterThanZero,
} from '@/utils/validators'
import { validationMixin } from 'vuelidate'
import { mapState, mapActions } from 'vuex'
import { required } from 'vuelidate/lib/validators'

import InputDuration from '@/components/InputDuration'
import InputSelect from '@/components/InputSelect'
import BaseButton from '@/components/BaseButton'
import BaseInput from '@/components/BaseInput'

export default {
  name: 'RegistrationForm',
  components: { InputDuration, InputSelect, BaseButton, BaseInput },
  mixins: [validationMixin],
  validations: {
    meetName: { required, haveOnlyLetters },
    meetCategory: { required },
    meetDuration: {
      required,
      isGreaterThanZero,
      isMultipleOfFive,
      isLessThanLimit,
    },
  },
  methods: {
    ...mapActions('form', { revertChanges: 'revertChanges' }),
    handleSubmit() {
      this.$v.$touch()

      if (!this.$v.$invalid) {
        if (this.isEditing) {
          this.dispatchTo('meet/update')
        } else {
          this.dispatchTo('meet/add')
        }

        this.handleResetForm()
      }
    },
    handleRevertChanges() {
      this.revertChanges()
      this.handleResetForm()
    },
    handleResetForm() {
      this.$store.dispatch('form/reset')
      this.$v.$reset()
    },
    dispatchTo(dispatchString) {
      this.$store.dispatch(dispatchString, {
        title: this.meetName,
        category: this.meetCategory,
        duration: Number(this.meetDuration),
      })
    },
    updateForm(data) {
      this.$store.dispatch('form/updateField', {
        id: this.meetId,
        ...data,
      })
    },
  },
  computed: {
    ...mapState('form', {
      meetId: (state) => state.fields.id,
      meetDuration: (state) => state.fields.duration,
      meetCategory: (state) => state.fields.category,
      isEditing: (state) => state.isEditing,
    }),
    ...mapState('category', {
      categories: (state) => state.categories.map((category) => category.name),
    }),
    meetName: {
      get() {
        return this.$store.state.form.fields.title
      },
      set(value) {
        this.updateForm({ title: value })
      },
    },
    meetCategory: {
      get() {
        return this.$store.state.form.fields.category
      },
      set(value) {
        this.updateForm({ category: value })
      },
    },
    meetDuration: {
      get() {
        return this.$store.state.form.fields.duration
      },
      set(value) {
        this.updateForm({ duration: value })
      },
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
