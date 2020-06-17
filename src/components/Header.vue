<template>
  <Container>
    <header class="header">
      <HeaderTitle><slot name="title"/></HeaderTitle>

      <slot />
    </header>
  </Container>
</template>

<script>
import Container from '@/components/Container'
import HeaderTitle from '@/components/HeaderTitle'

export default {
  components: {
    Container,
    HeaderTitle,
  },
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: rem(80px 0);
}
</style>
