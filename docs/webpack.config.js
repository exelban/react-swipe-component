const path = require('path')
const webpack = require('webpack')
const CleanWebpackPlugin = require('clean-webpack-plugin')

const PATH = {
  src: path.resolve(__dirname, './src'),
  node: path.resolve(__dirname, './node_modules'),
  output: path.resolve(__dirname, './dist'),
}

module.exports = {
  target: 'web',
  resolve: {
    modules: [PATH.src, PATH.node],
    extensions: ['.js', '.css'],
    symlinks: false,
  },
  entry: {
    app: './src/index.js',
  },
  output: {
    path: PATH.output,
    filename: '[name].min.js',
  },
  module: {
    rules: [
      {
        test: /js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /.?css$/,
        include: [PATH.src, PATH.node],
        use: ['style-loader', 'css-loader?source-map'],
      },
    ],
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new CleanWebpackPlugin(PATH.output),
  ],
  devServer: {
    port: 8080,
    historyApiFallback: true,
    compress: false,
    inline: true,
    publicPath: '/dist',
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: 'initial',
          name: 'vendor',
          enforce: true,
        },
        app: {
          test: /src/,
          chunks: 'initial',
          name: 'app',
          enforce: true,
        },
      },
    },
  },
}
