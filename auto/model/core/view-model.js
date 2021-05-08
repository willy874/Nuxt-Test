const fs = require('fs').promises
const path = require('path')
const prettier = require('prettier')
const compilerPlugin = require('../plugins/view-model-base')

module.exports = function (ops) {
  return Promise.all([
    // eslint-disable-next-line prettier/prettier
    Object.keys(ops.schema).map(async (modelName) => {
      const { output, root, overwrite } = ops
      const { FileName } = ops.methods
      const fn = new FileName(modelName)
      const filename = fn.data.join('-').toLowerCase() + '.js'
      const writeString = prettier.format(compilerPlugin(ops, modelName), {
        semi: false,
        singleQuote: true,
        arrowParens: 'avoid',
        parser: 'babel',
      })
      const folders = await fs.readdir(path.join(root, output.viewModel))
      // eslint-disable-next-line prettier/prettier
      const fsWriteFile = (writePath) =>
        fs.writeFile(path.join(root, writePath, filename), writeString)
      if (ops.schema[modelName].dbRelation) {
        return Promise.resolve()
      }
      if (!folders.includes(filename)) {
        return fsWriteFile(output.viewModel).then(() => {
          fsWriteFile(path.join(...['auto', 'model', 'view']))
          console.log(
            'Create'.green,
            filename.yellow,
            `View Model success.`.green,
            path.join(root, output.viewModel, filename).blue
          )
        })
      } else if (overwrite) {
        return fsWriteFile(output.viewModel).then(() => {
          fsWriteFile(path.join(...['auto', 'model', 'view']))
          console.log(
            'Overwrite'.green,
            filename.yellow,
            `View Model success.`.green,
            path.join(root, output.viewModel, filename).blue
          )
        })
      }
    }),
  ])
}
