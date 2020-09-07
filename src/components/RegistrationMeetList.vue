<template>
  <div class="meet-list">
    <transition-group name="list" tag="div" appear>
      <Meet
        :key="meet.id"
        v-for="meet in meets"
        :id="meet.id"
        :title="meet.title"
        :category="meet.category"
        :durationInMinutes="meet.duration"
        :hasOptions="meet.id !== currentMeetId"
        :selected="meet.id === currentMeetId"
      />
    </transition-group>

    <EmptyMessage v-if="isListEmpty">
      No meet has been created yet
    </EmptyMessage>
  </div>
</template>

<script>
import { mapState } from 'vuex'

import Meet from '@/components/Meet'
import EmptyMessage from '@/components/EmptyMessage'

export default {
  components: { Meet, EmptyMessage },
  computed: {
    ...mapState('meet', {
      meets: (state) => [...state.meets].reverse(),
    }),
    ...mapState('form', {
      currentMeetId: (state) => state.fields.id,
    }),
    isListEmpty() {
      return this.meets.length === 0
    },
  },
}
</script>

<style lang="scss" scoped>
.meet-list {
  max-height: 400px;
  overflow: auto;
  overscroll-behavior: contain;

  .meet {
    margin-right: 5px;
  }

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
