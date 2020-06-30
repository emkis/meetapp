import Vue from 'vue'
import Vuelidate from 'vuelidate'
import vClickOutside from 'v-click-outside'

import App from './App'
import router from './router'
import store from './store'
import globalRegistrationComponents from './utils/globalRegister'

import '@/styles/global.scss'

Vue.use(Vuelidate)
Vue.use(vClickOutside)

globalRegistrationComponents(Vue)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
