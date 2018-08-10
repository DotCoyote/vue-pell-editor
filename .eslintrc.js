// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'typescript-eslint-parser',
    ecmaVersion: 2017,
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    es6: true,
    jquery: true,
    jest: true
  },
  extends: [
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    'standard',
    'plugin:vue/recommended',
    'plugin:prettier/recommended'
  ],
  plugins: ['typescript'],
  // check if imports actually resolve
  settings: {
    'import/resolver': {
      webpack: {
        config: 'webpack/webpack.prod.babel.js'
      }
    }
  },
  rules: {
    indent: 0,
    'no-console': 0,
    'object-curly-spacing': 0,
    'space-before-function-paren': 0
  }
}
