const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const {
  absolutize,
  typescriptRule,
  cssRule,
  fontsRule,
  svgRule,
  imagesRule,
  plugins
} = require('./webpack.parts');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  entry: [
    'core-js/modules/es6.promise',
    'core-js/modules/es6.array.iterator',
    absolutize('src/index.tsx')
  ],
  resolve: {
    alias: {
      'react-dom': '@hot-loader/react-dom',
      fs: 'browserfs/dist/shims/fs.js',
      buffer: 'browserfs/dist/shims/buffer.js',
      path: 'browserfs/dist/shims/path.js',
      processGlobal: 'browserfs/dist/shims/process.js',
      bufferGlobal: 'browserfs/dist/shims/bufferGlobal.js',
      bfsGlobal: require.resolve('browserfs')
    },
    extensions: ['.ts', '.tsx', '.mjs', '.js', '.jsx'],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: absolutize('tsconfig.json')
      })
    ]
  },

  mode: isProduction ? 'production' : 'development',
  devtool: isProduction ? 'none' : 'cheap-eval-source-map',

  module: {
    rules: [typescriptRule, cssRule, fontsRule, svgRule, imagesRule],
    noParse: /browserfs\.js/
  },

  plugins,

  output: {
    filename: isProduction ? '[hash].bundle.js' : 'bundle.js',
    publicPath: process.env.BASE_URL
  },

  node: {
    process: false,
    Buffer: false
  }
};
