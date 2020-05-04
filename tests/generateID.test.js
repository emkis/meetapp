import uuid from '../src/utils/generateID.js'

it('generated random id must be a number', () => {
  const id = uuid()
  expect(typeof id).toBe('number')
})

it('should generate a random id with 12 or more characters', () => {
  const id = uuid()
  const lengthOfId = String(id).length

  expect(lengthOfId).toBeGreaterThanOrEqual(12)
})
