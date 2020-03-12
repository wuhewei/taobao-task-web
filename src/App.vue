<template>
    <div id="app">
        <el-header v-show="this.isLogin">
            <Nav />
        </el-header>
        <el-main>
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
    body {
        margin: 0;
    }
    .el-header {
        padding: 0;
    }
    #app {
        font-family: Helvetica, sans-serif;
        text-align: center;
    }
</style>
