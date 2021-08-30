const packageName = require("./package.json").name;
const pageRedirect = {
  "/subwhite": { target: 'http://192.168.71.12:8081/', changeOrigin: true, },
  "/subblack": { target: 'http://192.168.71.12:8082/', changeOrigin: true, }
}
const path = require("path");
function resolve (dir) {
  return path.join(__dirname, dir);
}


module.exports = {
  lintOnSave: true,
  devServer: {
    port: 8080,
    disableHostCheck: true,
    headers: {
      "Access-Control-Allow-Origin": "*"
    },
    overlay: {
      warnings: false,
      errors: true
    },
    proxy:{
      ...pageRedirect
    },
    // ...devConfigs,
    // proxy: {
    //   // 访问的接口
    //   // ...apiRedirect,
    //   // 访问服务器的页面
    //   // ...pageRedirect,
    // }
  },
  configureWebpack: {
    output: {
      library: `${packageName}`,
      libraryTarget: "umd",
      jsonpFunction: `webpackJsonp_${packageName}`,
    },
    resolve: {
      alias: {
        "@": resolve("src")
      }
    },
  },
  chainWebpack: config => {
    config.plugins.delete("preload"); // TODO: need test
    config.plugins.delete("prefetch"); // TODO: need test
    config.resolve.alias.set(
      "./prefetch",
      path.resolve(__dirname, "src/plugins/qiankun/prefetch.js")
    );
     // set preserveWhitespace
     config.module
     .rule("vue")
     .use("vue-loader")
     .loader("vue-loader")
     .tap(options => {
       options.compilerOptions.preserveWhitespace = true;
       return options;
     })
     .end();
    config.module
      .rule("eslint")
      .use("eslint-loader")
      .loader("eslint-loader")
      .tap(options => {
        options.fix = true //设置自动修复eslint
        return options
      });
      
    config.when(process.env.NODE_ENV !== "development", config => {
      config
        .plugin("ScriptExtHtmlWebpackPlugin")
        .after("html")
        .use("script-ext-html-webpack-plugin", [
          {
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/
          }
        ])
        .end();
      // config.optimization.splitChunks({
      //   chunks: "all",
      //   cacheGroups: {
      //     libs: {
      //       name: "chunk-libs",
      //       test: /[\\/]node_modules[\\/]/,
      //       priority: 10,
      //       chunks: "initial" // only package third parties that are initially dependent
      //     },
      //     vant: {
      //       name: "vant", // split elementUI into a single package
      //       priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
      //       test: /[\\/]node_modules[\\/]_?vant(.*)/ // in order to adapt to cnpm
      //     },
      //     commons: {
      //       name: "chunk-commons",
      //       test: resolve("src/components"), // can customize your rules
      //       minChunks: 3, //  minimum common number
      //       priority: 5,
      //       reuseExistingChunk: true
      //     }
      //   }
      // });
      config.optimization.runtimeChunk("single");
    });
  }
};
