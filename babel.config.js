module.exports = api => ({
  env: {
    test: {
      plugins: [
        'transform-es2015-modules-commonjs',
        'dynamic-import-node',
        'syntax-dynamic-import',
      ],
      presets: [
        [
          '@babel/env',
          {
            debug: false,
            modules: 'commonjs',
            targets: {
              node: 'current',
            },
          },
        ],
      ],
    },
  },
  plugins: [
    '@babel/plugin-proposal-class-properties',
    // disable loose mode so we can properly transform spread operator
    // here:
    // https://github.com/jamesmfriedman/rmwc/blob/4e695006c1d41dbc26dc3fdd4783084aee4ca7c8/src/base/foundation-component.js#L103-L105
    // https://github.com/babel/babel/issues/6649
    ['@babel/plugin-transform-spread', {loose: false}],
    '@babel/plugin-syntax-dynamic-import',
    'syntax-trailing-function-commas',
    [
      'replace-imports',
      {
        replacer(_, module) {
          return `lodash/${module === 'startswith' ? 'startsWith' : module}`
        },
        test: /^lodash\.(\w+)$/i,
      },
    ],
    [
      'transform-imports',
      {
        lodash: {
          preventFullImport: true,
          /* eslint-disable-next-line no-template-curly-in-string */
          transform: 'lodash/${member}',
        },
      },
    ],
    [
      '@babel/plugin-transform-runtime',
      {
        absoluteRuntime: true,
        corejs: '3',
        helpers: true,
        regenerator: true,
        useESModules: false,
      },
    ],
  ],
  presets: [
    [
      '@babel/env',
      {
        debug: false,
        loose: true,
        modules: false,
        targets: {},
      },
    ],
    ['@babel/preset-react', {development: !api.env('production')}],
  ],
})
