import Vue from 'vue'

import App from './App'
import router from './router'
import store from './store'

import '@/styles/global.scss'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
  beforeCreate() {
    this.$store.commit('initialiseStorage')
  },
}).$mount('#app')
