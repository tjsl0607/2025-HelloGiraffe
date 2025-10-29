// functions/.eslintrc.js
module.exports = {
  root: true,
  env: {
    es6: true,
    node: true, // <- node.js 환경임을 알려줍니다.
  },
  extends: ["eslint:recommended", "google"],
  rules: {
    quotes: ["error", "double"],
  },
  parserOptions: {
    ecmaVersion: 2020,
  },
};
