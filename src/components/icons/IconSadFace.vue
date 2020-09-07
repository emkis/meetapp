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
      d="M8.00016 14.6666C11.6821 14.6666 14.6668 11.6819 14.6668 7.99998C14.6668 4.31808 11.6821 1.33331 8.00016 1.33331C4.31826 1.33331 1.3335 4.31808 1.3335 7.99998C1.3335 11.6819 4.31826 14.6666 8.00016 14.6666Z"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M10.6668 10.6666C10.6668 10.6666 9.66683 9.33331 8.00016 9.33331C6.3335 9.33331 5.3335 10.6666 5.3335 10.6666"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M6 6H6.00667"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M10 6H10.0067"
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
