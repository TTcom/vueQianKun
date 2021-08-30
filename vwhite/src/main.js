import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import routerConfig from "./router";
import store from "./store";
import "./public-path";
Vue.use(VueRouter);
Vue.config.productionTip = false;

// ========================================================================
// 启动配置
const packageName = require("../package.json").name;
let instance = null;
let router = null;

function render() {
  // if (props) {
  // 注入 actions 实例
  // actions.setActions(props)
  // }

  router = new VueRouter({
    // 区分子应用方式独立挂载的时候前面加sub
    base: window.__POWERED_BY_QIANKUN__
      ? `/${packageName}`
      : `/sub${packageName}/`,
    mode: "history",
    routes: routerConfig,
  });

  router.onError((error) => {
    const pattern = /Loading chunk (\d)+ failed/g;
    const isChunkLoadFailed = error.message.match(pattern);
    console.log(
      "driver onError ， router.history.pending.fullPath = " +
        router.history.pending.fullPath
    );
    const targetPath = router.history.pending.fullPath;
    if (isChunkLoadFailed) {
      router.replace(targetPath);
    }
  });
  instance = new Vue({
    el: "#app",
    router,
    store,
    render: (h) => h(App),
  });
}
// 独立运行时，直接挂载应用
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}
export async function bootstrap() {
  console.log("vue app bootstraped");
}

export async function mount() {
  console.log("mount12312");
  render();
}

/**
 * 应用每次 切出/卸载 会调用的方法，通常在这里我们会卸载微应用的应用实例
 */
export async function unmount() {
  // isInit = false;
  instance.$destroy();
  instance = null;
  router.beforeHooks = [];
  router = null;
}

// new Vue({
//   router,
//   store,
//   render: (h) => h(App),
// }).$mount("#app");
