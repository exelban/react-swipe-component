module.exports = {
  "parserOptions": {
    "parser": "babel-eslint",
    "sourceType": "module",
  },

  "env": {
    "browser": true,
    "node": true,
  },


  "plugins": [
    "flowtype",
    "flowtype-errors",
  ],


  "extends": [
    "eslint:recommended",
    "plugin:react/recommended",
    "airbnb-base",
    "plugin:flowtype/recommended",
  ],


  "rules": {
    "flowtype-errors/show-errors": 2,

    "camelcase": "off",
    "no-console": "off",
    "no-param-reassign": "off",
    "no-plusplus": "off",
    "no-underscore-dangle": "off",

    "semi": ["error", "never"],

    "space-before-function-paren": ["error", "always"],

    'import/no-extraneous-dependencies': 0,
    'import/no-unresolved': 0,
    'import/extensions': 0,
  }
}
