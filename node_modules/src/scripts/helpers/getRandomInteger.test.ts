import { getRandomInteger } from './getRandomInteger'

describe('value = getRandomInteger(min, max)', () => {
  const min = 1
  const max = 2
  const value = getRandomInteger(min, max)

  test('value type number', () => {
    expect(typeof value).toEqual('number')
  })

  test('value >= min', () => {
    expect(value).toBeGreaterThanOrEqual(min)
  })

  test('value <= max', () => {
    expect(value).toBeLessThanOrEqual(max)
  })
})
