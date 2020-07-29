import { SET, UPDATE } from './types'

export default {
  namespaced: true,

  state: {
    meet: {},
  },

  mutations: {
    [SET](state, meet) {
      state.meet = { ...meet }
    },
    [UPDATE](state, { fieldName, value }) {
      state.meet[fieldName] = value
    },
  },

  actions: {
    setMeet({ commit }, meet) {
      commit(SET, meet)
    },
    updateMeet({ commit }, newValues) {
      commit(UPDATE, newValues)
    },
  },
}
