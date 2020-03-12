<template>
    <el-menu router
             :default-active="$route.path"
             class="el-menu-demo"
             mode="horizontal"
             @select="handleSelect"
             background-color="#545c64"
             text-color="#fff"
             active-text-color="#ffd04b">
        <el-menu-item index="/">处理中心</el-menu-item>
        <el-menu-item index="/task">工单管理</el-menu-item>
        <el-menu-item index="/user">用户管理</el-menu-item>
        <el-menu-item index="/shop">店铺管理</el-menu-item>

        <el-menu-item class="el-menu-item-avatar">
            <el-popover placement="bottom" max-width="50" trigger="click">
                <el-link class="el-row" @click="toLogout()">退出登录</el-link>
                <div class="block" slot="reference">张三 <el-avatar size="medium" :src="circleUrl"></el-avatar></div>
            </el-popover>
        </el-menu-item>
    </el-menu>

</template>
f
<script>
    export default {
        name: "Nav",
        data() {
          return {
              circleUrl: "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
          }
        },
        methods: {
            toLogout() {
                this.isLogin = false;
                localStorage.clear();
                this.$router.push({path: "/login"})
            },
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            },
        },
    }
</script>

<style scoped>
    .el-menu-item-avatar {
        float: right;
    }
</style>