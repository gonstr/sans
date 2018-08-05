const path = require('path')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  target: 'electron-renderer',
  entry: './lib/app/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'app.js'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        include: [path.resolve(__dirname, 'lib')]
      }
    ]
  },
  externals: [nodeExternals()]
}
