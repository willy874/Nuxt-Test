const path = require('path')
const schema = require('../../models/schema')
const root = path.join(__dirname, '..', '..')

module.exports = {
  root,
  schema,
  output: {
    viewModel: path.join(...['models', 'data']),
  },
  // data,
  overwrite: true,
  plugins: [],
}
