<template>
  <div id="trails">
    <Header>
      <template #title>Trails</template>

      <BaseButton @click="navigate">
        <IconPlus size="18" color="#26265e" />
        Add meet
      </BaseButton>
    </Header>

    <CategoryFilters />
  </div>
</template>

<script>
import Header from '@/components/Header'
import CategoryFilters from '@/components/CategoryFilters'
import { IconPlus } from '@/components/icons'

export default {
  name: 'Trails',
  components: { CategoryFilters, Header, IconPlus },
  methods: {
    navigate() {
      this.$router.push({ name: 'Registration' })
    },
  },
}
</script>

<style lang="scss" scoped></style>
