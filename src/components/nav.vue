<template>
    <el-menu router
             :default-active="$route.path"
             class="el-menu-demo"
             mode="horizontal"
             @select="handleSelect"
             background-color="#545c64"
             text-color="#fff"
             active-text-color="#ffd04b">
        <el-menu-item index="/home">处理中心</el-menu-item>
        <el-menu-item index="/about">工单管理</el-menu-item>
        <el-menu-item index="3"><a href="https://www.ele.me" target="_blank">订单管理</a></el-menu-item>
    </el-menu>
</template>
f
<script>
    export default {
        name: "Nav",
        data() {
          return {
              menuItems: [
                  {}
              ]
          }
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
        },
    }
</script>

<style scoped>

</style>