import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/permission' // 引入路由守卫
import store from './store'
import Vant, { Lazyload } from 'vant' // 引入移动ui框架
// import 'vant/lib/index.css' // 引入它的样式
import 'vant/lib/index.less' // 引入vant组件的less样式 为了能修改vant组件的主题样式
import '@/style/index.less' // 引入自己的css样式
import 'amfe-flexible' // 设配
import msg from '@/utils/notify-plugin' // 引入 一个提示框的新方法(有默认的配置)
Vue.use(Vant) // 到入所有组件
Vue.use(msg) // 将新方法挂载在原型上
Vue.use(Lazyload)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
