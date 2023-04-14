module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true
  },
  globals: {
    ga: true,
    chrome: true,
    __DEV__: true
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:json/recommended",
    "plugin:vue/vue3-essential",
    "@vue/prettier"
  ],
  parserOptions: {
    ecmaVersion: 12,
    parser: "@typescript-eslint/parser",
    sourceType: "module"
  },
  plugins: ["vue", "@typescript-eslint"]
};
