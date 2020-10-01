<template functional>
  <svg
    :stroke="props.color"
    :fill="props.color"
    stroke-width="0"
    viewBox="0 0 24 24"
    :height="props.size"
    :width="props.size"
    xmlns="http://www.w3.org/2000/svg"
    role="presentation"
  >
    <path d="M7.41 7.84L12 12.42l4.59-4.58L18 9.25l-6 6-6-6z" />
  </svg>
</template>

<script>
import iconMixin from '@/mixins/iconMixin'
export default {
  mixins: [iconMixin],
}
</script>
