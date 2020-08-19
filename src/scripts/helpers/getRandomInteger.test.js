Object.defineProperty(exports, '__esModule', { value: true })
let getRandomInteger_1 = require('./getRandomInteger')
describe('value = getRandomInteger(min, max)', function () {
  let min = 1
  let max = 2
  let value = getRandomInteger_1.getRandomInteger(min, max)
  test('value type number', function () {
    expect(typeof value).toEqual('number')
  })
  test('value >= min', function () {
    expect(value).toBeGreaterThanOrEqual(min)
  })
  test('value <= max', function () {
    expect(value).toBeLessThanOrEqual(max)
  })
})
