<template>
  <h1 class="header-title">
    <slot />
  </h1>
</template>

<style lang="scss" scoped>
.header-title {
  font-size: rem(42px);
  line-height: 1.3;
  color: var(--color-primary);
}
</style>
