import Vue from 'vue'
import axios from 'axios';
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import VueClipboard from 'vue-clipboard2'
import 'element-ui/lib/theme-chalk/index.css'

import App from './App.vue'

Vue.prototype.$http = axios;
Vue.prototype.$axios = axios;

Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(VueClipboard);

// 引入组件
import home from './components/home';
import about from './components/about';
import login from './components/login';

const routes = [
    {path: '/login', component: login},
    {path: '/home', component: home, meta: {requireAuth: true}},
    {path: '/about', component: about, meta: {requireAuth: true}},
];

const router = new VueRouter({routes});

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.requireAuth)) { // 判断该路由是否需要登录权限
        console.log('需要登录...');
        if (localStorage.token) { // 判断当前的token是否存在 ； 登录存入的token
            next();
        } else {
            next({
                path: '/',
                query: {redirect: to.fullPath} // 将跳转的路由path作为参数，登录成功后跳转到该路由
            })
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


new Vue({router, render: h => h(App)}).$mount('#app');