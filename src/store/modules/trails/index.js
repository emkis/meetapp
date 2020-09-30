import trailsFactory from '@/trailsFactory'
import { ORGANIZE } from './types'

export default {
  namespaced: true,

  state: {
    trails: [],
  },

  actions: {
    organize({ commit, rootState }) {
      const { meets } = rootState.meet
      commit(ORGANIZE, meets)
    },
  },

  mutations: {
    [ORGANIZE](state, meets) {
      const organizer = trailsFactory(meets)
      organizer.build()
      const trails = organizer.buildSchedule()

      state.trails = trails
    },
  },

  getters: {
    filterByCategories: (state) => (wantedCategories) => {
      // TODO: make this work

      function selectedOnly(trail) {
        return trail.meets.filter((meet) => {
          return wantedCategories.includes(meet.category)
        })
      }

      return state.trails.filter(selectedOnly)
    },
  },
}
