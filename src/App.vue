<template>
  <div id="app">
<!--    <img src="./assets/logo.png">-->
    <el-main>
      <Nav />
      <!-- 路由出口 -->
      <!-- 路由匹配到的组件将渲染在这里 -->
      <router-view></router-view>
    </el-main>
  </div>
</template>

<script>
  import Nav from "./components/nav.vue";
  export default {
    methods: {
    },
    components: {
      Nav
    }
  }
</script>

<style>
#app {
  font-family: Helvetica, sans-serif;
  text-align: center;
}
</style>
