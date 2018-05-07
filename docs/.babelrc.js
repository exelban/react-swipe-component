module.exports = {
  presets: [
    [
      "@babel/env",
      {
        "modules": false,
      }
    ],
    [
      '@babel/preset-stage-3',
    ],
    '@babel/preset-flow',
    '@babel/preset-react',
  ],
  plugins: [],
}