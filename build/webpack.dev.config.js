const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const config = require('../config');

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    open: true, // 自动打开浏览器
    port: config.dev.port, // 设置运行端口
    hot: true, // 启用热更新
    historyApiFallback: true,
    proxy: config.dev.proxy
  },
  plugins: [
    new ReactRefreshWebpackPlugin()
  ]
}