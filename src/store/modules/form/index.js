import { SET, UPDATE, RESET, BACKUP } from './types'

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
    backup: null,
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
    [BACKUP](state, currentFieldValues) {
      state.backup = currentFieldValues
    },
    [RESET](state) {
      state.fields = { ...initialFieldValues }
      state.backup = null
      state.isEditing = false
    },
  },

  actions: {
    setFields({ commit }, fields) {
      commit(SET, fields)
      commit(BACKUP, fields)
    },
    updateField({ commit, dispatch, state }, updatedValues) {
      commit(UPDATE, updatedValues)

      if (state.isEditing) {
        dispatch('meet/update', updatedValues, { root: true })
      }
    },
    revertChanges({ commit, dispatch, state }) {
      dispatch('meet/update', state.backup, { root: true })
      commit(RESET)
    },
    reset({ commit }) {
      commit(RESET)
    },
  },
}
