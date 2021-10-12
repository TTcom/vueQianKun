<template>
  <div class="App">
    <div>vwhite</div>
    <div>{{ a }}</div>
    <div>{{ b }}</div>
    <button type="button" @click="goSendmsg">sendmsg</button>
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view />
  </div>
</template>
<script>
import actions from "@/utils/actions";
export default {
  data() {
    return {
      a: 123,
      b: "abcdefg",
    };
  },
  methods: {
    goSendmsg() {
      //对于state 会做第一层的校验 只有是初始化的有的属性才允许被修改
      // actions.setGlobalState(state)
      actions.setGlobalState({ globalToken: "vwhite setGlobalState" });
    },
  },
  mounted() {
    actions.onGlobalStateChange((state, prevState) => {
      // state: 变更后的状态; prev 变更前的状态
      console.log("通信状态发生改变state：", state);
      console.log("通信状态发生改变prevState：", prevState);
    }, true);
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
