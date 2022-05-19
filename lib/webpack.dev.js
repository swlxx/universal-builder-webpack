const merge = require('webpack-merge');
const webpack = require('webpack');

const baseConfig = require('./webpack.base.js');

const decConfig = {
  mode: 'development',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
  devServer: {
    /* devserver 的服务基础目录 */
    contentBase: './dist',
    /* 这里为true webpack 会自动引入 HotModuleReplacementPlugin 插件 */
    hot: true,
    stats: 'errors-only',
  },
  /* eval source-map inline-source-map */
  devtool: 'source-map',
};

module.exports = merge(baseConfig, decConfig);
