import path from 'path'

const src  = path.resolve(__dirname, 'src')
const dist = path.resolve(__dirname, 'dist')

export default {
  entry: src + '/index.js',

  output: {
    path: dist,
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          'plugins': ['lodash'],
          'presets': [['env', { 'targets': { 'node': 4 } }]]
        }
      }
    ]
  },

  resolve: {
    extensions: ['*', '.js']
  },

  devtool: '#inline-source-map',

  plugins: []
}
