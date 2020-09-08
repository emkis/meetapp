import Vue from 'vue'
import Vuex from 'vuex'

import category from '@/store/modules/category'
import meet from '@/store/modules/meet'
import contextMenu from '@/store/modules/contextMenu'
import form from '@/store/modules/form'

import persistMeets from '@/plugins/persistMeets'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [persistMeets],
  mutations: {
    initialiseStorage() {
      this.dispatch('meet/initialise')
    },
  },
  modules: {
    meet,
    form,
    category,
    contextMenu,
  },
})
