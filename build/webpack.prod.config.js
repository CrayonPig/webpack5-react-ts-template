const path = require('path')
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  devtool: 'cheap-module-source-map',
  plugins: [
    // 复制文件插件
    new CopyPlugin({
      patterns: [{
        // 复制public下文件
        from: path.resolve(__dirname, '../public'),
        // 复制到dist目录中
        to: path.resolve(__dirname, '../dist'),
        filter: source => {
          // 忽略index.html
          return !source.includes('index.html')
        }
      }]
    }),
  ]
}