import { EVENING_MINUTES_LIMIT } from './constants'

export const mustNotBeGreaterThanLimit = duration => {
  const isGreater = duration > EVENING_MINUTES_LIMIT
  return isGreater
}

export const haveOnlyLetters = text => !/\d/.test(text)

export const mustBeMultipleOfFive = number => {
  if (!isNumber(number)) return false
  return number % 5 === 0
}

export const isNumber = value => !!Number(value)

export const isEmpty = text => !text
