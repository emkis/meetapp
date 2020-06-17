<template>
  <svg
    :stroke="color"
    fill="none"
    stroke-width="0"
    viewBox="0 0 16 16"
    :height="size"
    :width="size"
    xmlns="http://www.w3.org/2000/svg"
    role="presentation"
  >
    <path
      d="M7.99967 14.6667C11.6816 14.6667 14.6663 11.6819 14.6663 8C14.6663 4.3181 11.6816 1.33333 7.99967 1.33333C4.31778 1.33333 1.33301 4.3181 1.33301 8C1.33301 11.6819 4.31778 14.6667 7.99967 14.6667Z"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M8 5.33333V7.99999"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M8 10.6667H8.00667"
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
