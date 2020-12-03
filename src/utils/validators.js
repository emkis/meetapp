import { EVENING_MINUTES_LIMIT } from './constants'

export const isLessThanLimit = (duration) => {
  return duration <= EVENING_MINUTES_LIMIT
}

export const haveOnlyLetters = (text) => !/\d/.test(text)

export const isMultipleOfFive = (number) => {
  if (!isNumber(number)) return false
  return number % 5 === 0
}

export const isGreaterThanZero = (number) => {
  if (!isNumber(number)) return false
  return number > 0
}

export const isNumber = (value) => typeof value === 'number' && isFinite(value)

export const isArrayEmpty = (targetArray) => targetArray.length === 0

export function isJSON(stringToTest) {
  try {
    JSON.parse(stringToTest)
    return true
  } catch {
    return false
  }
}
