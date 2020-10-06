<template>
  <section id="category-filters">
    <h4 class="title">Categories</h4>

    <div class="filters">
      <CategoryButton
        :key="category.name"
        v-for="category in categories"
        :name="category.name"
        :active="isSelected(category)"
        @click="handleSelectItem(category)"
      />
    </div>
  </section>
</template>

<script>
import { mapGetters } from 'vuex'
import { CATEGORIES } from '@/utils/constants'

import CategoryButton from '@/components/CategoryButton'

export default {
  name: 'CategoryFilters',
  components: { CategoryButton },
  data() {
    return {
      selectedFilters: [],
    }
  },
  methods: {
    isSelected({ name: categoryName }) {
      return !!this.selectedFilters.includes(categoryName)
    },
    removeCategory(targetCategory) {
      return this.selectedFilters.filter((item) => item !== targetCategory)
    },
    handleSelectItem({ name: categoryName }) {
      const alreadySelected = this.isSelected({ name: categoryName })

      if (alreadySelected) {
        const updatedFilters = this.removeCategory(categoryName)
        this.selectedFilters = updatedFilters
      } else {
        this.selectedFilters.push(categoryName)
      }
    },
    getSelectedMeets() {
      const filteredTrails = this.filterByCategories(this.selectedFilters)
      this.$emit('filtered', filteredTrails)
    },
  },
  computed: {
    ...mapGetters('trails', ['filterByCategories']),
    categories() {
      return CATEGORIES
    },
  },
  watch: {
    selectedFilters(filters) {
      this.getSelectedMeets(filters)
    },
  },
}
</script>

<style lang="scss" scoped>
#category-filters {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;

  .title {
    margin-right: rem(20px);

    font-size: rem(18px);
    color: var(--color-primary);
  }

  .filters {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    margin-right: calc(-50vw + 50%);

    -ms-overflow-style: none;
    scrollbar-width: none;
    -webkit-overflow-scrolling: touch;
    -ms-overflow-style: -ms-autohiding-scrollbar;
    overflow-x: auto;

    &::-webkit-scrollbar {
      display: none;
    }
  }
}
</style>
