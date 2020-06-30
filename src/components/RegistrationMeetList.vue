<template>
  <div class="meet-list">
    <Meet
      :id="uuid()"
      title="CSS Tips & Tricks"
      category="Test"
      :durationInMinutes="25"
      :hasOptions="true"
    />
    <Meet
      :id="uuid()"
      title="Frontend for dummmies"
      category="Frontend"
      :durationInMinutes="25"
      :hasOptions="true"
    />
    <Meet
      :id="uuid()"
      title="Vue.js Pro Tips"
      category="Advanced Topics"
      :durationInMinutes="25"
      :hasOptions="true"
    />
    <Meet
      :id="uuid()"
      title="React Ninja"
      category="Backend"
      :durationInMinutes="25"
      :hasOptions="true"
    />
  </div>
</template>

<script>
import uuid from '@/mixins/uuid'
import Meet from '@/components/Meet'

export default {
  components: { Meet },
  mixins: [uuid],
}
</script>

<style lang="scss" scoped>
.meet-list {
  max-height: 420px;
  overflow: auto;
  overscroll-behavior: contain;
}
</style>
