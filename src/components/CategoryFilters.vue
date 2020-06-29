<template>
  <BaseContainer>
    <section id="category-filters">
      <h4 class="title">Categories</h4>

      <div class="filters">
        <CategoryButton
          :key="index"
          v-for="(category, index) in categories"
          :name="category.name"
          :active="selectedFilters.includes(index)"
          @click="handleSelectItem(index, category.name)"
        />
      </div>
    </section>
    <strong>{{ selectedFilters }}</strong>
  </BaseContainer>
</template>

<script>
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
    handleSelectItem(id, categoryName) {
      const alreadySelected = this.selectedFilters.findIndex(
        item => item.id === id
      )

      if (alreadySelected >= 0) {
        const filteredItems = this.selectedFilters.filter(
          item => item.id !== id
        )
        this.selectedFilters = filteredItems
      } else {
        this.selectedFilters.push({ id, name: categoryName })
      }
    },
  },
  computed: {
    categories() {
      return this.$store.state.category.categories
    },
  },
}
</script>

<style lang="scss" scoped>
#category-filters {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;

  > .title {
    font-size: rem(18px);
    line-height: 1;
    margin-right: rem(20px);
    color: var(--color-primary);
  }

  > .filters {
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    overflow: auto;
  }
}
</style>
