module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: ["standard", "plugin:vue/vue3-essential", "./.eslintrc-auto-import.json"],
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
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["vue"],
  rules: {
    "vue/multi-word-component-names": "off",
    quotes: ["error", "double"],
    "no-undef": "error",
    "comma-dangle": ["error", "only-multiline"],
    semi: ["error", "always"],
    "space-before-function-paren": "off",
  },
  globals: {
    ElButton: true,
    ElInput: true,
    ElMessageBox: true,
    ElDatePicker: true,
    ElMessage: true,
  },
};
