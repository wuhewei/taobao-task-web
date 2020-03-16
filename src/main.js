import Vue from 'vue'
import axios from 'axios';
import VueRouter from 'vue-router';
import VueMoment from 'vue-moment';
import ElementUI from 'element-ui';
import VueClipboard from 'vue-clipboard2';
import 'element-ui/lib/theme-chalk/index.css';

import App from './App.vue'

Vue.prototype.$http = axios;
Vue.prototype.$axios = axios;

Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(VueMoment);
Vue.use(VueClipboard);

// 引入组件
import process from './components/process';
import task from './components/task';
import user from './components/user';
import shop from './components/shop';
import login from './components/login';

const routes = [
    {path: '/login', component: login},
    {path: '/user', component: user, meta: {requireAuth: true}},
    {path: '/shop', component: shop, meta: {requireAuth: true}},
    {path: '/', component: process, meta: {requireAuth: true}},
    {path: '/task', component: task, meta: {requireAuth: true}},
];

Vue.prototype.isLogin = false;

const router = new VueRouter({routes});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requireAuth)) { // 判断该路由是否需要登录权限
        let token = localStorage.getItem('token');
        Vue.prototype.isLogin = !!token;
        // 未登录状态；当路由到nextRoute指定页时，跳转至login从
        if (!token) {
            next({
                path: '/login',
                // 将跳转的路由path作为参数，登录成功后跳转到该路由
                query: {redirect: to.fullPath}
            })
        } else {
            next();
        }
        // 已登录状态；当路由到login时，跳转至home
        if (to.name === 'login') {
            if (token) {
                router.push({path: '/home'});
            }
        }
    } else {
        next();
    }
});

// response全局拦截器
axios.interceptors.response.use(
    response => {
        if (response.data.status === 1001) {
            router.push({
                path: '/login'
            }).then(() => {
            })
        }
        return response;
    },
    error => {
        return Promise.reject(error.response.data);
    });


const vue = new Vue({router, render: h => h(App)});
vue.$mount('#app');