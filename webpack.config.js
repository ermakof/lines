const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin({
      dry: true,
      dangerouslyAllowCleanPatternsOutsideProject: true,
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  entry: './src/index.tsx',
  output: {
    filename: '[name].[fullhash].js',
    path: path.join(__dirname, '/dist'),
  },
  devServer: {
    historyApiFallback: true,
    open: true,
    port: 8081,
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        loader: require.resolve('babel-loader'),
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['css-loader'],
      },
    ],
  },
  optimization: {
    minimizer: [
      new TerserJSPlugin({
        parallel: true,
      }),
    ],
    runtimeChunk: 'single',
    splitChunks: {
      chunks: 'all',
    },
    moduleIds: 'deterministic',
  },
};
