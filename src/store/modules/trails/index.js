import trailsFactory from '@/trailsFactory'
import { isArrayEmpty } from '@/utils/validators'
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
    filterByCategories: (state) => (wantedCategories = []) => {
      const isCategoriesEmpty = isArrayEmpty(wantedCategories)
      if (isCategoriesEmpty) return state.trails

      function isMeetInCategories(meet) {
        return wantedCategories.includes(meet.category)
      }

      const filteredTrails = state.trails.map((trail) => {
        return {
          id: trail.id,
          meets: trail.meets.filter(isMeetInCategories),
        }
      })

      return filteredTrails
    },
  },
}
