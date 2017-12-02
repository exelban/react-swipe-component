const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

const release = {
    entry: "./dev/index.js",
    output: {
        path: __dirname,
        filename: "./release/bundle.min.js"
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    use: [
                        {
                            loader: "css-loader",
                            options: { importLoaders: 1, minimize: true, options: { sourceMap: true } }
                        }
                    ]
                })
            },
            {
                test: /js$/,
                exclude: /(node_modules)/,
                loader: "babel-loader",
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: "release/style.min.css"
        }),
        new webpack.optimize.AggressiveMergingPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            parallels: 4,
            mangle: true,
            compress: {
                warnings: false,
                pure_getters: true,
                unsafe: true,
                unsafe_comps: true,
                screw_ie8: true
            },
            output: {
                comments: false,
            }
        }),
        new webpack.DefinePlugin({
            'process.env': {
                'NODE_ENV': JSON.stringify("production")
            }
        })
    ]
};

module.exports = [release];