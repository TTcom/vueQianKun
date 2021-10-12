<template>
  <!-- <div id="app"> -->
  <!-- <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div> -->
  <!-- <router-view /> -->
  <div>
    <button type="button" @click="goVwhite">vwhite</button>
    <button type="button" @click="setStates">setStates</button>
    <button type="button" @click="goVblack">vblack</button>
    <section id="frame" />
  </div>

  <!-- </div> -->
</template>
<script>
import { actions } from "@/qiankun"; //新增
export default {
  mounted() {
    actions.onGlobalStateChange((state, prevState) => {
      // state: 变更后的状态; prevState: 变更前的状态
      console.log("主应用观察者：token 改变前的值为 ", state, prevState);
    });
  },
  methods: {
    setStates() {
      actions.setGlobalState({ globalToken: "123456" });
    },
    goVwhite() {
      window.history.replaceState({}, null, "/white");
    },
    goVblack() {
      // window.history.replaceState({}, null, "/black");
      actions.setGlobalState({ token: 445555555555555555 });
    },
  },
};
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
