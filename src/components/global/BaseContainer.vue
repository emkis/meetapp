<template functional>
  <div class="container">
    <slot />
  </div>
</template>

<script>
export default {
  name: 'BaseContainer',
}
</script>

<style lang="scss" scoped>
.container {
  margin: 0 auto;
  max-width: 1000px;
  width: 100%;
  height: 100%;
  padding: 0 20px;
}
</style>
