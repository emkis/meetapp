import Vue from 'vue'
import Vuex from 'vuex'

import meet from '@/store/modules/meet'
import contextMenu from '@/store/modules/contextMenu'
import form from '@/store/modules/form'
import trails from '@/store/modules/trails'

import persistMeets from '@/plugins/persistMeets'

Vue.use(Vuex)

export default new Vuex.Store({
  plugins: [persistMeets],
  mutations: {
    initializeStorage() {
      this.dispatch('meet/initialize')
    },
  },
  modules: {
    meet,
    form,
    trails,
    contextMenu,
  },
})
