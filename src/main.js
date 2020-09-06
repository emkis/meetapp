import Vue from 'vue'

import App from './App'
import router from './router'
import store from './store'
import globalRegistrationComponents from './utils/globalRegister'

import '@/styles/global.scss'

globalRegistrationComponents(Vue)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
