<template>
  <div class="meet-list">
    <Meet :hasOptions="true" />
    <Meet :hasOptions="true" />
    <Meet :hasOptions="true" />
    <Meet :hasOptions="true" />
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
