import { generateToken } from './generateToken'

describe('generateToken()', () => {
  const value = generateToken()

  test('value type string', () => {
    expect(typeof value).toEqual('string')
  })

  test('value.length >= 31', () => {
    expect(value.length).toBeGreaterThanOrEqual(31)
  })

  test('value.length <= 35', () => {
    expect(value.length).toBeLessThanOrEqual(35)
  })
})
