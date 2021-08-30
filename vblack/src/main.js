import Vue from "vue";
import VueRouter from "vue-router";
import App from "./App.vue";
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
// let isInit = process.env.NODE_ENV === "development";
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

  // 增加Router拦截，来设置App背景色
  // router.beforeEach((to, from, next) => {
  //   if (!isInit) return

  //   const color = to.meta.backgroundColor || 0xffffff
  //   console.log('jump to:' + to)
  //   window.tdh007 && window.tdh007.invokeNative('setBackgroundColor', { color: color, alpha: 1 })
  //   // window.tdhutruck && window.tdhutruck.setBackgroundColor({ color: color, alpha: 1 })
  //   next()
  // })

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

/**
 * bootstrap 只会在微应用初始化的时候调用一次
 */
export async function bootstrap() {
  console.log("vue app bootstraped");
}

/**
 * 应用每次进入都会调用 mount 方法，通常我们在这里触发应用的渲染方法
 */
export async function mount() {
  console.log("mount12312");
  // isInit = true;
  // initStatic()
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
// ========================================================================

// new Vue({
//   router,
//   store,
//   render: (h) => h(App),
// }).$mount("#app");
