const packageName = require('./package.json').name;
module.exports = {
  publicPath: '/subwhite/',
  lintOnSave: true,
  devServer: {
    port: 8081,
    disableHostCheck: true,
    headers: {
      "Access-Control-Allow-Origin": "*"
    }
  },
  configureWebpack: {

    output: {
      // 输出重构  打包编译后的 文件名称  【模块名称.时间戳】
      library: `${packageName}`,
      libraryTarget: 'umd',
      jsonpFunction: `webpackJsonp_${packageName}`,
    },
  }, 
  chainWebpack: config => {
    config.module
      .rule("eslint")
      .use("eslint-loader")
      .loader("eslint-loader")
      .tap(options => {
        options.fix = true //设置自动修复eslint
        return options
      })
  }
};
