import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/permission'
import store from './store'
import Vant from 'vant' // 引入移动ui框架
import 'vant/lib/index.css' // 引入它的样式
import '@/style/index.less' // 引入自己的css样式
import 'amfe-flexible'
Vue.use(Vant) // 到入所有组件

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
