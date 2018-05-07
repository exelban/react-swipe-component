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

    "camelcase": "off", // Disallow to use camelcase in variables
    "no-console": "off", // Allow to use console
    "no-param-reassign": "off", // this is needed for store mutations
    "no-plusplus": "off",
    "no-underscore-dangle": "off",

    "semi": ["error", "never"], // semicolon never at the end of line

    "space-before-function-paren": ["error", "always"], // enforce consistent spacing before function definition

    // let flow handle resolving - he is much better in that :)
    'import/no-extraneous-dependencies': 0,
    'import/no-unresolved': 0,
    'import/extensions': 0,
  }
}