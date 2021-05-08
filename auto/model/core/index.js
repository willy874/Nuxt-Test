const methods = require('../../function')
const buildViewModel = require('./view-model')

module.exports = function (settings) {
  settings.methods = methods
  buildViewModel(settings)
}
