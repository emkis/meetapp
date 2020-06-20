<template>
  <div class="meet-list">
    <Meet
      title="CSS Tips & Tricks"
      category="Beginner"
      :durationInMinutes="25"
      :hasOptions="true"
    />
    <Meet
      title="Frontend for dummmies"
      category="Beginner"
      :durationInMinutes="25"
      :hasOptions="true"
    />
    <Meet
      title="Vue.js Pro Tips"
      category="Advanced Topics"
      :durationInMinutes="25"
      :hasOptions="true"
    />
    <Meet
      title="AA"
      category="Beginner"
      :durationInMinutes="25"
      :hasOptions="true"
    />
  </div>
</template>

<script>
import Meet from '@/components/Meet'

export default {
  components: { Meet },
}
</script>

<style lang="scss" scoped>
.meet-list {
  max-height: 400px;
  overflow: auto;
  overscroll-behavior: contain;
}
</style>
