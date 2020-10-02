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

      <CategoryFilters @filtered="handleFilter" />
      <TrailsBoard class="grow-outside-container" :trails="filteredTrails" />
    </div>
  </BaseContainer>
</template>

<script>
import { mapState } from 'vuex'
import { isArrayEmpty } from '@/utils/validators'
import store from '@/store'

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
  beforeRouteEnter(to, from, next) {
    store.dispatch('trails/organize')
    next()
  },
  data() {
    return {
      trails: [],
    }
  },
  methods: {
    handleFilter(filteredTrails) {
      this.trails = filteredTrails
    },
    navigate() {
      this.$router.push({ name: 'Registration' })
    },
  },
  computed: {
    ...mapState('trails', { originalTrails: 'trails' }),
    filteredTrails() {
      const isFilteredTrailsEmpty = isArrayEmpty(this.trails)
      return isFilteredTrailsEmpty ? this.originalTrails : this.trails
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
