import Vue from 'vue'
import App from './App.vue'
// import $ from 'jquery';
import axios from 'axios';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from "vue-router";
//引入组件
import Index from './components/index.vue'
import Logoin from './components/logoin.vue'
import Yujing from './components/yujing.vue'
import Bingli from './components/bingli.vue'
import Danger from './components/danger.vue'
import Chuli from './components/chuli.vue'
import Weichuli from './components/weichuli.vue'
import Liucheng from './components/liucheng.vue'
import Dangan from './components/dangan.vue'
import Gerendangan from './components/gerendangan.vue'
import Indexxiangqing from './components/indexxiangqing.vue'

import global_ from './components/logo' //引用文件
Vue.prototype.GLOBAL = global_ //挂载到Vue实例上面
Vue.use(VueRouter)
const routes = [{
    path: '/',
    name: '主页面',
    redirect: '/index'
  }, {
    path: "/index",
    component: Index,
    name: 'index'
  },
  {
    path: "/logoin",
    component: Logoin,
    name: 'logoin'
  }, {
    path: "/yujing",
    component: Yujing,
    name: 'yujing'
  }, {
    path: "/bingli",
    component: Bingli,
    name: 'bingli'
  }, {
    path: "/danger",
    component: Danger,
    name: 'danger'
  }, {
    path: "/chuli",
    component: Chuli,
    name: 'chuli'
  }, {
    path: "/weichuli",
    component: Weichuli,
    name: 'weichuli'
  }, {
    path: "/liucheng",
    component: Liucheng,
    name: 'liucheng'
  }, {
    path: "/dangan",
    component: Dangan,
    name: 'dangan'
  }, {
    path: "/gerendangan",
    component: Gerendangan,
    name: 'gerendangan'
  }, {
    path: "/indexxiangqing",
    component: Indexxiangqing,
    name: 'indexxiangqing'
  }
]
var router = new VueRouter({
  routes
})
Vue.config.productionTip = false
Vue.use(ElementUI);
// Vue.prototype.$ = $;
Vue.prototype.$axios = axios;
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')