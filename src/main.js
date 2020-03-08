import Vue from 'vue'
import VueRouter from 'vue-router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import App from './App.vue'

Vue.use(ElementUI);
Vue.use(VueRouter);

// 引入组件
import home from './components/home';
import about from './components/about';

const routes = [
  {path: '/home', component: home},
  {path: '/about', component: about},
];

const router = new VueRouter({routes});

new Vue({router,render: h => h(App)}).$mount('#app');