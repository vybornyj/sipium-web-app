Object.defineProperty(exports, '__esModule', { value: true })
exports.generateToken = void 0
let rand = function () {
  return Math.random().toString(36).substr(2)
}
exports.generateToken = function () {
  return rand() + rand() + rand()
}
