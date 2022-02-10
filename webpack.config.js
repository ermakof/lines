const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// const production = process.env.NODE_ENV === 'production';

module.exports = {
  mode: 'development',
  devtool: 'source-map',
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  entry: './src/index.tsx',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/',
  },
  devServer: {
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
};
