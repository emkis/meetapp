<template>
  <div class="meet-list">
    <transition-group name="list" tag="div">
      <Meet
        :key="meet.id"
        v-for="meet in meets"
        :id="meet.id"
        :title="meet.title"
        :category="meet.category"
        :durationInMinutes="meet.duration"
        :hasOptions="true"
        :selected="meet.id === currentMeetId"
      />
    </transition-group>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import Meet from '@/components/Meet'

export default {
  components: { Meet },
  computed: {
    ...mapState('meet', {
      meets: (state) => [...state.meets].reverse(),
    }),
    ...mapState('form', {
      currentMeetId: (state) => state.meet.id,
    }),
  },
}
</script>

<style lang="scss" scoped>
.meet-list {
  max-height: 400px;
  overflow: auto;
  overscroll-behavior: contain;

  .list {
    &-enter-active,
    &-leave-active {
      transition: all 300ms ease;
    }
    &-enter,
    &-leave-to {
      opacity: 0;
      transform: translateY(15px);
    }
  }
}
</style>
