import { isJSON } from '@/utils/validators'

export function getFromStorage(key) {
  const data = localStorage.getItem(key)
  const isDataInStorage = Boolean(data)

  if (!isDataInStorage) return null

  if (isJSON(data)) return JSON.parse(data)
  else return data
}
