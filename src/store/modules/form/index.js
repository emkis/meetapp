import { SET, UPDATE, RESET } from './types'

const initialFieldValues = {
  id: null,
  title: '',
  category: '',
  duration: null,
}

export default {
  namespaced: true,

  state: {
    fields: { ...initialFieldValues },
    isEditing: false,
  },

  mutations: {
    [SET](state, fieldValues) {
      state.fields = { ...fieldValues }
      state.isEditing = true
    },
    [UPDATE](state, updatedValues) {
      state.fields = {
        ...state.fields,
        ...updatedValues,
      }
    },
    [RESET](state) {
      state.fields = { ...initialFieldValues }
      state.isEditing = false
    },
  },

  actions: {
    setFields({ commit }, fields) {
      commit(SET, fields)
    },
    reset({ commit }) {
      commit(RESET)
    },
    updateField({ commit, dispatch, state }, updatedValues) {
      commit(UPDATE, updatedValues)

      if (state.isEditing) {
        dispatch('meet/update', updatedValues, { root: true })
      }
    },
  },
}
