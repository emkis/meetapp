import { CATEGORIES } from '@/utils/constants'

export const namespaced = true

export const state = {
  categories: {
    ...CATEGORIES,
  },
}
