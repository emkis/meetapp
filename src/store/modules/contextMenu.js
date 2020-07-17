export default {
  namespaced: true,

  state: {
    isOpen: false,
    options: null,
    position: null,
  },

  mutations: {
    SET_OPEN(state, { options, position }) {
      state.isOpen = true
      state.options = options
      state.position = position
    },
    SET_CLOSE(state) {
      state.isOpen = false
      state.options = null
      state.position = null
    },
  },

  actions: {
    open({ commit }, payload) {
      commit('SET_OPEN', payload)
    },
    close({ commit }) {
      commit('SET_CLOSE')
    },
  },
}
