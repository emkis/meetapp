export function getFromStorage(key) {
  const isKeyInStorage = Boolean(localStorage.getItem(key))

  if (isKeyInStorage) {
    try {
      return JSON.parse(localStorage.getItem(key))
    } catch {
      localStorage.removeItem(key)
    }
  }

  return null
}
