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
      return !!this.selectedFilters.find((item) => item.id === categoryId)
    },
    handleSelectItem(categoryId, categoryName) {
      const alreadySelected = this.isSelected(categoryId)

      if (alreadySelected) {
        const filteredItems = this.selectedFilters.filter(
          (item) => item.id !== categoryId
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
