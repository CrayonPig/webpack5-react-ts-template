const path = require('path');
const config = require('../config');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ESLintWebpackPlugin = require('eslint-webpack-plugin')

module.exports = {
  entry: {
    app: config.entry
  },
  output: {
    path: config.build.assetsRoot,
    publicPath: config.build.assetsPublicPath,
    chunkFilename: 'js/[contenthash].js',
    filename: 'js/[name].[contenthash].js',
    clean: true
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
    }
  },
  module: {
    rules: [
      { 
        test: /\.(css|less)$/, //匹配 css less文件
        use: ['style-loader', 'css-loader', 'postcss-loader'] 
      },
      { 
        test: /\.s[ac]ss$/, //匹配 sass 文件
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'] 
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
            {
              loader: 'babel-loader'
            }
        ]
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
            {
              loader: 'babel-loader'
            }
        ]
      },
      {
        test: /.(png|jpg|jpeg|gif|svg)$/,
        // 匹配图片文件
        type: "asset",
        parser: {
          dataUrlCondition: {
            // 小于10kb转base64位
            maxSize: 10 * 1024,
          }
        }, generator: {
          filename: 'static/images/[name][ext]',
          //文件输出目录和命名
        },
      }
    ]
  },
  plugins: [
    // HtmlWebpackPlugin会在打包结束后，自动生成一个html文件，并把打包生成的js自动引入到这个html文件中
    new HtmlWebpackPlugin({
      title: config.title, //对应打包后html文件 title
      template: path.resolve(__dirname, "../public/index.html"),//html配置路径
      filename: "index.html",
    }),
    new ESLintWebpackPlugin({
      //默认配置，请点击上方官网链接查看
      context: path.resolve(__dirname, 'src'),
      extensions: ['ts', 'tsx'],
      fix:true //自动修复
    })
  ]
} 