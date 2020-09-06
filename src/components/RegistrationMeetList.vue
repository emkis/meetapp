<template>
  <div class="meet-list">
    <Meet
      :key="meet.id"
      v-for="meet in meets"
      :id="meet.id"
      :title="meet.title"
      :category="meet.category"
      :durationInMinutes="meet.duration"
      :hasOptions="true"
    />
  </div>
</template>

<script>
import { createNamespacedHelpers } from 'vuex'
const { mapState } = createNamespacedHelpers('meet')

import Meet from '@/components/Meet'

export default {
  components: { Meet },
  computed: {
    ...mapState({
      meets: (state) => [...state.meets].reverse(),
    }),
  },
}
</script>

<style lang="scss" scoped>
.meet-list {
  max-height: 400px;
  overflow: auto;
  overscroll-behavior: contain;
}
</style>
