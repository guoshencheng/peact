var webpack = require('webpack')
var path = require('path')
var fs = require('fs')
var appDir = path.resolve(__dirname, './src/apps')

module.exports = {
  devtool: "source-map",
  entry: {
    example: './example/src/index.js'
  },
  output: {
      path: __dirname + "/example/dist/",
      filename: "[name].js",
      publicPath: "/example/dist/"
  },
  externals:{
    react:'React',
    'react-dom':'ReactDOM',
    pixi: 'PIXI'
  },
  module: {
    loaders: [
      {
        test: /.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      }
    ]
  },
}
