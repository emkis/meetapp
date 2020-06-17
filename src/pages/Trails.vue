<template>
  <div id="trails">
    <Header>
      <template #title>Trails</template>

      <Button @click="navigate">
        <IconPlus size="18" color="#26265e" />
        Add meet
      </Button>
    </Header>
  </div>
</template>

<script>
import Header from '@/components/Header'
import Button from '@/components/Button'
import { IconPlus } from '@/components/icons'

export default {
  components: { Header, Button, IconPlus },
  methods: {
    navigate() {
      this.$router.push({ name: 'Registration' })
    },
  },
}
</script>

<style lang="scss" scoped></style>
