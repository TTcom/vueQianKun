import Vue from "vue";
import App from "./App.vue";
import VueRouter from "vue-router";
import routerConfig from "./router";
import store from "./store";
import actions from "./utils/actions";
import "./public-path";
Vue.use(VueRouter);
Vue.config.productionTip = false;

// ========================================================================
// 启动配置
const packageName = require("../package.json").name;
let instance = null;
let router = null;

function render(props) {
  // if (props) {
  // 注入 actions 实例
  // actions.setActions(props)
  // }
  if (props) {
    actions.setActions(props);
    // props.onGlobalStateChange((state, prevState) => {
    //   // state: 变更后的状态; prev 变更前的状态
    //   console.log("通信状态发生改变：", state, prevState);
    // }, true); //第二位参数置为true，这样微应用一启动的时候，我们马上就可以看到刚刚设置的
  }
  console.log("子应用render的参数", props);
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

export async function mount(props) {
  console.log("mount12312");
  render(props);
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
