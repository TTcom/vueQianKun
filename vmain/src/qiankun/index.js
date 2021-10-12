import {
  registerMicroApps,
  addGlobalUncaughtErrorHandler,
  // setDefaultMountApp,
  // prefetchApps,
  runAfterFirstMounted,
  initGlobalState,
  start,
} from "qiankun";

const state = {};
const actions = initGlobalState(state); //应用之间通信
import NProgress from "nprogress";
import "nprogress/nprogress.css";
// 子应用注册信息
import apps from "./apps.js";

const startQK = (params, cb = () => {}) => {
  /**
   * 注册子应用
   * 第一个参数 - 子应用的注册信息
   * 第二个参数 - 全局生命周期钩子
   */
  // let isLoadedSub = false;
  registerMicroApps(apps, {
    // qiankun 生命周期钩子 - 加载前
    beforeLoad: (app) => {
      // 加载子应用前，加载进度条
      NProgress.start();
      // isLoadedSub = true;
      console.log("before load", app.name);
      return Promise.resolve();
    },
    // qiankun 生命周期钩子 - 挂载后
    afterMount: (app) => {
      // 加载子应用前，进度条加载完成
      // isLoadedSub = true;
      NProgress.done();
      console.log("after mount", app.name);
      return Promise.resolve();
    },
    afterUnmount: (app) => {
      // isLoadedSub = false;
      // 加载子应用前，进度条加载完成
      console.log("after unmount", app.name);
      setTimeout(() => {
        // console.log("isLoadedSub = " + isLoadedSub);
        // if (!isLoadedSub) {
        cb && cb();
        // }
      }, 200);
      return Promise.resolve();
    },
  });

  // prefetchApps(apps)

  /**
   * 添加全局的未捕获异常处理器
   */
  addGlobalUncaughtErrorHandler((event) => {
    console.error(event);
    const { message: msg } = event;
    // 加载失败时提示
    if (msg && msg.includes("died in status LOADING_SOURCE_CODE")) {
      console.log("子应用加载失败，请检查应用是否可运行");
    }
  });
  // setDefaultMountApp('/pwdLogin')
  // 导出 qiankun 的启动函数
  // runAfterFirstMounted()
  runAfterFirstMounted(() => console.info("first app mounted"));

  start(params);
};
export default startQK;
export { actions };
