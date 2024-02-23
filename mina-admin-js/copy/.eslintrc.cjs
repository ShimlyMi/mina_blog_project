/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
    root: true,
    'extends': [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        '@vue/eslint-config-prettier/skip-formatting'
    ],
    parserOptions: {
        ecmaVersion: 'latest'
    },
    env: {
      browser: true,
      node: true,
      es6: true,
    },
  // add your custom rules here
  //it is base on https://github.com/vuejs/eslint-config-vue
  rules: {

    "no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_"
      }
    ],
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,

  }
}
