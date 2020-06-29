<template>
  <BaseContainer>
    <header class="header">
      <HeaderTitle><slot name="title"/></HeaderTitle>

      <slot />
    </header>
  </BaseContainer>
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
  justify-content: space-between;
  align-items: center;
  padding: rem(40px 0 80px);
}
</style>
