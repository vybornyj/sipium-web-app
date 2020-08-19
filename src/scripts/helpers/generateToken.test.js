Object.defineProperty(exports, '__esModule', { value: true })
let generateToken_1 = require('./generateToken')
describe('generateToken()', function () {
  let value = generateToken_1.generateToken()
  test('value type string', function () {
    expect(typeof value).toEqual('string')
  })
  test('value.length >= 31', function () {
    expect(value.length).toBeGreaterThanOrEqual(31)
  })
  test('value.length <= 35', function () {
    expect(value.length).toBeLessThanOrEqual(35)
  })
})
