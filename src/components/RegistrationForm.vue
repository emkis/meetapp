<template>
  <form id="registration-form" @submit.prevent="handleSubmit">
    <Input label="Meet name" />
    <Input label="Meet duration" />
    <InputSelect label="Meet category" :options="['yesssss', 'no', 'what']" />

    <Button theme="primary" type="submit">Create meet</Button>
  </form>
</template>

<script>
import Input from '@/components/Input'
import Button from '@/components/Button'
import InputSelect from '@/components/InputSelect'

export default {
  components: { Input, Button, InputSelect },
  methods: {
    handleSubmit() {
      console.log('subitted')
    },
  },
}
</script>

<style lang="scss" scoped>
#registration-form {
  button {
    margin-top: rem(40px);
  }
}
</style>
