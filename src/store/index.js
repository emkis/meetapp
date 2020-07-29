import Vue from 'vue'
import Vuex from 'vuex'

import category from '@/store/modules/category'
import meet from '@/store/modules/meet'
import contextMenu from '@/store/modules/contextMenu'
import form from '@/store/modules/form'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    meet,
    form,
    category,
    contextMenu,
  },
})
