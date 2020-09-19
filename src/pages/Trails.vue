<template>
  <BaseContainer>
    <div id="trails">
      <Header>
        <template #title>Trails</template>

        <BaseButton @click="navigate">
          <IconPlus size="18" color="#26265e" />
          Add meet
        </BaseButton>
      </Header>

      <CategoryFilters />
      <TrailsBoard class="grow-outside-container" :trails="trails" />
    </div>
  </BaseContainer>
</template>

<script>
import Header from '@/components/Header'
import CategoryFilters from '@/components/CategoryFilters'
import BaseButton from '@/components/BaseButton'
import BaseContainer from '@/components/BaseContainer'
import TrailsBoard from '@/components/TrailsBoard'
import { IconPlus } from '@/components/icons'

export default {
  name: 'Trails',
  components: {
    CategoryFilters,
    Header,
    IconPlus,
    TrailsBoard,
    BaseButton,
    BaseContainer,
  },
  props: {
    trails: { type: Array, required: true },
  },
  methods: {
    navigate() {
      this.$router.push({ name: 'Registration' })
    },
  },
}
</script>

<style lang="scss" scoped>
#trails {
  display: flex;
  flex-direction: column;
  height: 100%;

  .header {
    padding-bottom: rem(40px);
  }

  .grow-outside-container {
    margin: 0 calc(-49vw + 50%) 13px;
  }

  #trails-board {
    margin-top: rem(40px);
    flex-grow: 1;
  }
}
</style>
