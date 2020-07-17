import Vue from 'vue'
import Vuex from 'vuex'

import category from '@/store/modules/category'
import contextMenu from '@/store/modules/contextMenu'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    category,
    contextMenu,
  },
})
