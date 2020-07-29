import uuid from '@/utils/uuid'
import { ADD_MEET, DELETE_MEET } from './types'

export default {
  namespaced: true,

  state: {
    original: [
      {
        id: uuid(),
        name: 'CSS Tips & Tricks',
        category: 'Test',
        duration: 25,
      },
      {
        id: uuid(),
        name: 'Frontend for dummmies',
        category: 'Frontend',
        duration: 40,
      },
      {
        id: uuid(),
        name: 'Vue.js Pro Tips',
        category: 'Advanced Topics',
        duration: 20,
      },
      {
        id: uuid(),
        name: 'Build an API in 5 minutes with Deno',
        category: 'Backend',
        duration: 65,
      },
    ],
    organized: {},
  },

  mutations: {
    [ADD_MEET](state, meet) {
      state.original.push({ ...meet, id: uuid() })
    },
    [DELETE_MEET](state, meetId) {
      state.original = state.original.filter((meet) => meet.id !== meetId)
    },
  },

  actions: {
    add({ commit }, meet) {
      commit(ADD_MEET, meet)
    },
    delete({ commit }, meetId) {
      commit(DELETE_MEET, meetId)
    },
  },
}
