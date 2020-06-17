<template>
  <svg
    :stroke="color"
    fill="none"
    stroke-width="0"
    viewBox="0 0 21 20"
    :height="size"
    :width="size"
    xmlns="http://www.w3.org/2000/svg"
    role="presentation"
  >
    <path
      d="M10.6849 18.3333C15.257 18.3333 18.9635 14.6024 18.9635 10C18.9635 5.39763 15.257 1.66667 10.6849 1.66667C6.11272 1.66667 2.40625 5.39763 2.40625 10C2.40625 14.6024 6.11272 18.3333 10.6849 18.3333Z"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
    <path
      d="M10.6851 5V10L13.9965 11.6667"
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
