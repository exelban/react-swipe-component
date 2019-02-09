const path = require("path")
const CleanWebpackPlugin = require("clean-webpack-plugin")
const HtmlWebpackPlugin = require("html-webpack-plugin")

const PATH = {
  src: path.resolve(__dirname, "./src"),
  node: path.resolve(__dirname, "./node_modules"),
  output: path.resolve(__dirname, "./dist/"),
}

const config = {
  target: 'web',
  resolve: {
    modules: [PATH.src, PATH.node],
    extensions: [".ts", ".tsx", ".js", ".css"]
  },

  entry: {
    main: `${PATH.src}/index.tsx`,
  },
  output: {
    path: PATH.output,
    filename: '[name].js',
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "awesome-typescript-loader"
      },
      {
        test: /\.js$/,
        enforce: "pre",
        loader: "source-map-loader"
      },
      {
        test: /.?css$/,
        include: [PATH.src, PATH.node],
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              localIdentName: '[name]_[local]_[hash:base64:5]'
            }
          }
        ]
      },
    ]
  },

  plugins: [
    new CleanWebpackPlugin(PATH.output),
    new HtmlWebpackPlugin({
      template: `index.html`,
      filename: 'index.html',
      inject: true,
      minify: {
        collapseWhitespace: false,
        collapseInlineTagWhitespace: false,
        removeComments: true,
        removeRedundantAttributes: true,
      },
      inlineSource: /^.*$/,
    }),
  ],

  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: "initial",
          name: "vendor",
          enforce: true,
        },
        main: {
          test: /src/,
          chunks: "initial",
          name: "main",
          enforce: true,
        },
      },
    },
  },

  devServer: {
    port: 8080,
    compress: false,
    inline: true,
    publicPath: '/',
    host: 'localhost',
  },
}

module.exports = config
