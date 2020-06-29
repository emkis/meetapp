<template>
  <svg
    stroke="currentColor"
    :fill="color"
    stroke-width="0"
    viewBox="0 0 17 16"
    :height="size"
    :width="size"
    xmlns="http://www.w3.org/2000/svg"
    role="presentation"
  >
    <path
      d="M8.96094 3.33337V12.6667"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M4.29443 8H13.6278"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>

<script>
import iconMixin from '@/mixins/iconMixin'
export default {
  mixins: [iconMixin],
}
</script>
