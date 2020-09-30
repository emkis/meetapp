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
import Header from '@/components/Header'
import CategoryFilters from '@/components/CategoryFilters'
import BaseButton from '@/components/BaseButton'
import BaseContainer from '@/components/BaseContainer'
import TrailsBoard from '@/components/TrailsBoard'
import { IconPlus } from '@/components/icons'
import { mapState } from 'vuex'
import store from '@/store'

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
      filters: [],
      // TODO: make filters work
    }
  },
  methods: {
    handleFilter(filteredTrails) {
      this.filteredTrails = filteredTrails
    },
    navigate() {
      this.$router.push({ name: 'Registration' })
    },
  },
  computed: {
    ...mapState('trails', ['trails']),
    filteredTrails() {
      return this.trails
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
