import { EVENING_MINUTES_LIMIT } from './constants'

export const isLessThanLimit = (duration) => {
  return duration <= EVENING_MINUTES_LIMIT
}

export const haveOnlyLetters = (text) => !/\d/.test(text)

export const isMultipleOfFive = (number) => {
  if (!isNumber(number)) return false
  return number % 5 === 0
}

export const isNumber = (value) => !!Number(value)

export const isEmpty = (text) => !text
