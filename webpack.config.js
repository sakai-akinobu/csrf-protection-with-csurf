const path = require('path');

module.exports = {
  mode: 'development',
  target: 'node',
  entry: {
    client: path.resolve(__dirname, 'src/client/index.tsx'),
    server: path.resolve(__dirname, 'src/server/index.tsx'),
  },
  output: {
    path: path.resolve(__dirname, 'built'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader'
      }
    ],
  },
};
