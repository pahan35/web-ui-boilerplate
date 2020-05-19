const path = require('path')
const fs = require('fs')
const babelJestTransformer = require('babel-jest')

const MODULE_DIR = /(.*([/\\]node_modules|\.\.)[/\\](@[^/\\]+[/\\])?[^/\\]+)([/\\].*)?$/g

function shouldBabelize(filepath) {
  // process es6 modules with babel; ignore everything else
  if (filepath.split(/[/\\]/).indexOf('node_modules') === -1) {
    return true
  }
  const manifest = path.resolve(
    filepath.replace(MODULE_DIR, '$1'),
    'package.json',
  )
  const pkg = JSON.parse(fs.readFileSync(manifest))
  return !!(pkg.module || pkg['jsnext:main'])
}

module.exports = {
  ...babelJestTransformer,
  // otherwise we have some cache issues: files are not transpiled correctly
  createTransformer: undefined,
  process: (src, filename, config, transformOptions) => {
    if (shouldBabelize(filename)) {
      return babelJestTransformer.process(
        src,
        filename,
        config,
        transformOptions,
      )
    }
    return src
  },
  shouldBabelize,
}
