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
import { mapState } from 'vuex'
import Meet from '@/components/Meet'

export default {
  components: { Meet },
  computed: {
    ...mapState('meet', {
      meets: 'original',
    }),
  },
}
</script>

<style lang="scss" scoped>
.meet-list {
  max-height: 420px;
  overflow: auto;
  overscroll-behavior: contain;
}
</style>
