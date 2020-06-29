<template>
  <BaseContainer>
    <section id="category-filters">
      <h4 class="title">Categories</h4>

      <div class="filters">
        <CategoryButton
          :key="index"
          v-for="(category, index) in categories"
          :name="category.name"
          :active="isSelected(index)"
          @click="handleSelectItem(index, category.name)"
        />
      </div>
    </section>
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
    isSelected(categoryId) {
      return !!this.selectedFilters.find(item => item.id === categoryId)
    },
    handleSelectItem(categoryId, categoryName) {
      const alreadySelected = this.isSelected(categoryId)

      if (alreadySelected) {
        const filteredItems = this.selectedFilters.filter(
          item => item.id !== categoryId
        )

        this.selectedFilters = filteredItems
      } else {
        this.selectedFilters.push({ id: categoryId, name: categoryName })
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
