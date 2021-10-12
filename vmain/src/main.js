import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import startQiankun from "./qiankun/index";
Vue.config.productionTip = false;
// 启动乾坤
startQiankun({ prefetch: true, sandbox: true }, () => {
  // initStatic();
  console.log("11");
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
