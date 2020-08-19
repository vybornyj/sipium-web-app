Object.defineProperty(exports, '__esModule', { value: true })
exports.getRandomInteger = void 0
exports.getRandomInteger = function (min, max) {
  return Math.round(min - 0.5 + Math.random() * (max - min + 1))
}
