import { OPEN, CLOSE } from './types'

export default {
  namespaced: true,

  state: {
    isOpen: false,
    options: null,
    position: null,
  },

  mutations: {
    [OPEN](state, { options, position }) {
      state.isOpen = true
      state.options = options
      state.position = position
    },
    [CLOSE](state) {
      state.isOpen = false
      state.options = null
      state.position = null
    },
  },

  actions: {
    open({ commit }, payload) {
      commit(OPEN, payload)
    },
    close({ commit }) {
      commit(CLOSE)
    },
  },
}
