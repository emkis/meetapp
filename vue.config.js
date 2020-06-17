module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: `@import "@/styles/constants/index.scss";`,
      },
    },
  },
}
