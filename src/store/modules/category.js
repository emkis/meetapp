import { CATEGORIES } from '@/utils/constants'

export default {
  namespaced: true,

  state: {
    categories: {
      ...CATEGORIES,
    },
  },
}
