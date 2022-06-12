import path from 'path';
import fs from 'fs';
import { merge } from 'webpack-merge';
import { WebpackPluginServe } from 'webpack-plugin-serve';

import config from './webpack.config';
import prod from './prod.webpack.config';

const dev = {
  mode: 'development',
  watch: true,
  devtool: 'source-map',
  entry: {
    'onekey-js-sdk': path.resolve(__dirname, '../src/index.ts'),
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, '../build'),
    publicPath: './',
    library: 'onekey-js-sdk',
    libraryTarget: 'umd',
    libraryExport: 'default',
  },
  resolve: config.resolve,
  plugins: [
    new WebpackPluginServe({
      port: 8088,
      hmr: true,
      https: {
        key: fs.readFileSync(path.join(__dirname, '../webpack/https_dev.key')),
        cert: fs.readFileSync(path.join(__dirname, '../webpack/https_dev.crt')),
      },
      static: [path.join(__dirname, '../build')],
    }),
  ],
};

export default merge([prod, dev]);
