<template>
  <p class="empty-message"><slot /> <IconSadFace size="18" /></p>
</template>

<script>
import { IconSadFace } from '@/components/icons'

export default { components: { IconSadFace } }
</script>

<style lang="scss" scoped>
.empty-message {
  display: flex;
  align-items: center;
  color: var(--color-gray-dark);
  line-height: 2;

  > svg {
    margin-left: 5px;
  }
}
</style>
