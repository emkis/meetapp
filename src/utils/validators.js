import { EVENING_MINUTES_LIMIT } from './constants'

export const mustNotBeGreaterThanLimit = (duration) => {
  const isGreater = duration > EVENING_MINUTES_LIMIT
  return isGreater
}

export const mustBeMultipleOfFive = (number) => (number % 5 === 0)

export const haveOnlyLetters = (text) => !/\d/.test(text)

export const isEmpty = (text) => !(!!text)
