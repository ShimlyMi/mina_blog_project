/* eslint-env node */
// require('@rushstack/eslint-patch/modern-module-resolution')
// @ts-check
const { defineConfig } = require("eslint-define-config");

module.exports = defineConfig(
    {
      root: true,
      env: {
        browser: true,
        node: true,
        es6: true,
      },
      parser: "vue-eslint-parser",
      'extends': [
        'plugin:vue/vue3-essential',
        'eslint:recommended',
        '@vue/eslint-website-prettier/skip-formatting',
        "prettier"
      ],
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: "module",
      },

      overrides: [
        {
          env: {
            node: true,
          },
          files: [".eslintrc.{js,cjs}"],
          parserOptions: {
            sourceType: "script",
          },
        },
      ],
      plugins: ["vue"],
      rules: {
        "no-console": "off",
        "no-debugger": "warn",
        "vue/no-unused-vars": "warn",
        "vue/multi-word-component-names": "off",
      },
    }
)
