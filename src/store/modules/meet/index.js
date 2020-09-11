import uuid from '@/utils/uuid'
import { ADD, DELETE, UPDATE, INITIALIZE } from './types'
import { getFromStorage } from '@/utils/storage'

export default {
  namespaced: true,

  state: {
    meets: [],
  },

  mutations: {
    [INITIALIZE](state) {
      const initialState = [
        {
          id: uuid(),
          title: 'CSS Tips & Tricks',
          category: 'Test',
          duration: 25,
        },
        {
          id: uuid(),
          title: 'Frontend for dummmies',
          category: 'Frontend',
          duration: 40,
        },
        {
          id: uuid(),
          title: 'Vue.js Pro Tips',
          category: 'Advanced Topics',
          duration: 20,
        },
        {
          id: uuid(),
          title: 'Build an API in five minutes with Deno',
          category: 'Backend',
          duration: 65,
        },
      ]

      const previousState = getFromStorage('meets')

      if (previousState) state.meets = previousState
      else state.meets = initialState
    },
    [ADD](state, meet) {
      state.meets.push({ ...meet, id: uuid() })
    },
    [UPDATE](state, newValues) {
      const { id } = newValues
      const targetMeet = state.meets.find((meet) => meet.id === id)

      if (targetMeet) {
        Object.assign(targetMeet, newValues)
      }
    },
    [DELETE](state, meetId) {
      state.meets = state.meets.filter((meet) => meet.id !== meetId)
    },
  },

  actions: {
    initialize({ commit }) {
      commit(INITIALISE)
    },
    add({ commit }, meet) {
      commit(ADD, meet)
    },
    update({ commit }, newValues) {
      commit(UPDATE, newValues)
    },
    delete({ commit }, meetId) {
      commit(DELETE, meetId)
    },
  },
}
