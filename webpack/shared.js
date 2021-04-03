const path = require('path');

const createBasicConfig = (isClient) => {
  const target = isClient ? 'web' : 'node';
  const entry = isClient
    ? {client: path.resolve(__dirname, '../src/client/index.tsx')}
    : {server: path.resolve(__dirname, '../src/server/index.tsx')}
    ;

  return {
    mode: 'development',
    target,
    entry,
    output: {
      path: path.resolve(__dirname, '../built'),
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
};

module.exports = {
  createBasicConfig,
};
