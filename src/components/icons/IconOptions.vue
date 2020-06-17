<template>
  <svg
    :stroke="color"
    fill="none"
    stroke-width="0"
    viewBox="0 0 35 27"
    :height="size"
    :width="size"
    xmlns="http://www.w3.org/2000/svg"
    role="presentation"
  >
    <circle cx="8" cy="13" r="2" stroke-width="2" />
    <circle cx="17" cy="13" r="2" stroke-width="2" />
    <circle cx="26" cy="13" r="2" stroke-width="2" />
  </svg>
</template>

<script>
import iconMixin from '@/mixins/iconMixin'
export default {
  mixins: [iconMixin],
}
</script>
