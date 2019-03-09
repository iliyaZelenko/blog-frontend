module.exports = {
  root: true,
  env: {
    es6: true,
    browser: true,
    node: true
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/recommended',
    'standard',
    // TODO возможно не нужен
    'plugin:promise/recommended',
    // TODO вызывает ошибку в root элемента template (конфликтует с vue)
    // 'typescript'
    // 'plugin:@typescript-eslint/recommended'
  ],
  // required to lint *.vue files
  plugins: [
    'vue',
    // 'babel', это eslint-plugin-babel (не работают)
    // TODO не уверен что хоть что-то делает
    // 'typescript'
    '@typescript-eslint',
    '@typescript-eslint/tslint'
  ],
  rules: {
    // когда импортировал и использовал интерефейсы, выдавало такую ошибку https://github.com/eslint/typescript-eslint-parser/issues/77
    'no-unused-vars': 'off',
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',

    // eslint-plugin-babel (не работают)
    // "babel/camelcase": 1,
    // "babel/no-unused-expressions": 2,

    // Vue
    'vue/no-v-html': 'off',

    // '@typescript-eslint/tslint/config': [1, {
    //   lintFile: './tslint.json',
    // }],
  },
  parser: 'vue-eslint-parser', // babel-eslint чтобы optional chaining работало, без этого не работает
  parserOptions: {
    parser: "@typescript-eslint/parser",
    // parser: '@typescript-eslint/parser',
    project: "./tsconfig.json",
    // parser: 'babel-eslint',
    sourceType: 'module',
    // useJSXTextNode: true,
    ecmaFeature: {
      jsx: false
    },
    // 9 это 2018
    // ecmaVersion: 9,
    extraFileExtensions: ['.vue'],
  }
}
