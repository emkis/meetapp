import { isJSON } from '@/utils/validators'

export function getFromStorage(key) {
  const data = localStorage.getItem(key)
  const isKeyInStorage = Boolean(data)

  if (isKeyInStorage) {
    try {
      if (isJSON(data)) {
        return JSON.parse(data)
      } else {
        return data
      }
    } catch {
      localStorage.removeItem(key)
    }
  }

  return null
}
