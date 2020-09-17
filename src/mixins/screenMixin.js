export default {
  created() {
    window.addEventListener('resize', this.handleResize)
  },
  data() {
    return {
      screenWidth: window.innerWidth,
    }
  },
  methods: {
    handleResize() {
      const currentWidth = document.documentElement.clientWidth
      this.updateScreenWidth(currentWidth)
    },
    updateScreenWidth(width) {
      this.screenWidth = width
    },
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
  },
}
