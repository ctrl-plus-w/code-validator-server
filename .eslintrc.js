module.exports = {
  env: { es6: true, node: true, mocha: true },
  parserOptions: { ecmaVersion: 2017, sourceType: 'module' },
  extends: ['prettier', 'eslint:recommended'],
  parser: '@babel/eslint-parser',
  rules: {
    'no-unused-vars': 2,
    'no-var': 2,
    'no-multi-spaces': 2,
    'no-unexpected-multiline': 2,
    'no-multiple-empty-lines': [2, { max: 1, maxEOF: 1 }],
    'valid-jsdoc': [
      1,
      {
        requireReturn: false,
        requireParamDescription: false,
        requireReturnDescription: false
      }
    ],
    'require-jsdoc': 1,
    'key-spacing': 2,
    'semi-spacing': 2,
    'block-spacing': 2,
    'spaced-comment': 2,
    'callback-return': 0,
    'space-infix-ops': 2,
    'keyword-spacing': 2,
    'newline-after-var': 2,
    'space-before-blocks': 2,
    'handle-callback-err': 2,
    'newline-before-return': 2,
    semi: [2, 'always'],
    eqeqeq: [2, 'always'],
    'eol-last': [2, 'always'],
    'max-statements': [2, 30],
    'comma-dangle': [2, 'never'],
    indent: [2, 2, { SwitchCase: 1 }],
    'object-curly-spacing': [2, 'always'],
    'comma-spacing': [2, { before: false, after: true }],
    quotes: [2, 'single', { allowTemplateLiterals: true }]
  },
  settings: { 'import/resolver': { alias: { map: [['@', './src']] } } }
};
