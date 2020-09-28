import {
  isEmpty,
  haveOnlyLetters,
  mustNotBeGreaterThanLimit,
  mustBeMultipleOfFive } from '../src/utils/validators'

describe('Function: isEmpty', () => {
  it('should return true when an empty string is passed', () => {
    const areEmpty = isEmpty('')
    expect(areEmpty).toBe(true)
  })

  it('should return true when nothing is passed', () => {
    const areEmpty = isEmpty()
    expect(areEmpty).toBe(true)
  })

  it('should return false when a value is passed in', () => {
    const areEmpty = isEmpty('hello im a string')
    expect(areEmpty).toBe(false)
  })
})

describe('Function: haveOnlyLetters', () => {
  it('should return true when an string without numbers is passed in', () => {
    const result = haveOnlyLetters('just a random string')
    expect(result).toBe(true)
  })

  it('should return false when the string has numbers', () => {
    const result = haveOnlyLetters('just 4 random 5 string')
    expect(result).toBe(false)
  })
})

describe('Function: mustBeMultipleOfFive', () => {
  it('should return true when a number is multiple of 5', () => {
    const result = mustBeMultipleOfFive(85)
    expect(result).toBe(true)
  })

  it('should return false when a number is not multiple of 5', () => {
    const result = mustBeMultipleOfFive(23)
    expect(result).toBe(false)
  })
})

describe('Function: mustNotBeGreaterThanLimit', () => {
  const durationIsBiggerThanLimit = mustNotBeGreaterThanLimit()
  it('should return true when the number is bigger than 240', () => {
    const result = mustNotBeGreaterThanLimit(900)
    expect(result).toBe(true)
  })

  it('should return false when the number is lower than 240', () => {
    const result = mustNotBeGreaterThanLimit(150)
    expect(result).toBe(false)
  })
})
