// // 引入elementui 主题
import 'element-ui/lib/theme-chalk/index.css';
import '@/style/reset.css'
import '@/style/border.css'
import "@/style/css/main.css";
/*深色主题*/
import "@/style/css/color-dark.css";
// 浅绿色主题*
// import "./assets/css/theme-green/color-green.css";
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// 引入清除默认样式文件
// import '@/assets/love.js'
// // 引入axios
// import axios from 'axios'
// // 引入elementui

import ElementUI from 'element-ui'



// 引入SVG
import './icons'
import 'babel-polyfill'
// // 引入安装折线图所需组件
import Vue from 'vue'
import App from './App'
import router from './router'
import VCharts from 'v-charts';
import VeLine from 'v-charts/lib/line.common'

import login from '@/views/pages/login';
// 引入untils
import untils from '@/untils/untils'
import store from './store/index'
Vue.use(ElementUI, {
  size: 'small'
});
Vue.use(VCharts);
Vue.component(VeLine.name, VeLine)

Vue.config.productionTip = false
import {
  post,
  fetch,
  patch,
  put
} from './api/api'
//定义全局变量
Vue.prototype.$post = post;
Vue.prototype.$fetch = fetch;
Vue.prototype.$patch = patch;
Vue.prototype.$put = put;
Vue.prototype.untils = untils
router.beforeEach((to, from, next) => {
  
  const role = localStorage.getItem('ms_username')
  if (!role && to.path !== '/login') {
    next('/login')
  } else if (to.meta.permission) {
    // 如果是管理员权限则可进入，这里只是简单的模拟管理员权限而已
    role == 'admin' ? next() : next('/403')
  } else {
    // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
    if (navigator.userAgent.indexOf('MSIE') > -1 && to.path === '/editor') {
      Vue.prototype.$alert('vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看', '浏览器不兼容通知', {
        confirmButtonText: '确定'
      });
    } else {
      next();
    }
  }

})



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    login,
    App,
  },
  template: '<App/>'
})
