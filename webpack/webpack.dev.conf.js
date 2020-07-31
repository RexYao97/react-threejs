const { merge } = require('webpack-merge');
const base = require('./webpack.base.conf');
const path = require('path');
const webpack = require('webpack');
// 自定义全局变量
console.log(process.env.NODE_ENV, process.env.DEV);
module.exports = merge(base, {
  //模块参数
  mode: 'development',
  devServer: {
    port: 9005,
    contentBase: path.join(__dirname, '/build'),
    historyApiFallback: true,
    hot: true,
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.js$|\.jsx$/,
        loader: 'eslint-loader',
        enforce: 'pre', // 编译前检查
        exclude: [/(node_modules)/, /(webpack)/], // 不检测的文件
        options: {
          fix: true,
        },
      },
    ],
  },
  //启用source-map方便调试
  devtool: 'source-map',
  plugins: [
    //定义全局变量
    new webpack.DefinePlugin({
      //这里必须要解析成字符串进行判断，不然将会被识别为一个变量
      DEV: JSON.stringify('dev'),
    }),
  ],
});
