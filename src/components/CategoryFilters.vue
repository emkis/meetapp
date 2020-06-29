<template>
  <Container>
    <section id="category-filters">
      <h4 class="title">Categories</h4>

      <div class="filters">
        <CategoryButton
          :key="index"
          v-for="(category, index) in categories"
          :name="category.name"
          :active="true"
        />
      </div>
    </section>
  </Container>
</template>

<script>
import Container from '@/components/Container'
import CategoryButton from '@/components/CategoryButton'

export default {
  name: 'CategoryFilters',
  components: { Container, CategoryButton },
  data() {
    return {
      selectedFilters: [],
    }
  },
  methods: {
    // handleSelectItem(id) {
    //   const alreadySelected = selectedItems.findIndex(item => item === id)
    //   if (alreadySelected >= 0) {
    //     const filteredItems = selectedItems.filter(item => item !== id)
    //     setSelectedItems(filteredItems)
    //   } else {
    //     setSelectedItems([...selectedItems, id])
    //   }
    // },
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
