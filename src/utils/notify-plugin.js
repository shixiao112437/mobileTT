import dayjs from 'dayjs' // 引入dayjs 用来处理时间
import 'dayjs/locale/zh-cn' // 引入中文包
import relativeTime from 'dayjs/plugin/relativeTime' // 引入相对时间的插件
dayjs.extend(relativeTime)
//  给Vue添加一个方法
export default {
  // 导出一个install的方法  在main.js中引入 Vue.use() 会使install这个方法执行
  install (Vue) {
    // 重新 在Vue的原型上加载一个与notify一样的方法 并 每次 默认给他一个配置
    Vue.prototype.$Notify = params => Vue.prototype.$notify({ duration: 800, ...params })
    // 延迟函数
    Vue.prototype.$delayed = (params = 500) => { return setTimeout(() => {}, params) }
    // 全局过滤器
    Vue.filter('relativeTime', function (time) {
      // 过滤器必须有返回值
      return dayjs().locale('zh-cn').from(time)
    })
  }
}
