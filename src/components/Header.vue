<template>
  <header class="header">
    <HeaderTitle><slot name="title" /></HeaderTitle>

    <slot />
  </header>
</template>

<script>
import HeaderTitle from '@/components/HeaderTitle'

export default {
  name: 'Header',
  components: { HeaderTitle },
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: rem(40px 0 80px);
}
</style>
