import Vue from 'vue'
import Vuex from 'vuex'

import category from '@/store/modules/category'
import meets from '@/store/modules/meets'
import contextMenu from '@/store/modules/contextMenu'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    category,
    meets,
    contextMenu,
  },
})
