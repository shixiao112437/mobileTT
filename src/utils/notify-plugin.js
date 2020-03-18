//  给Vue添加一个方法
export default {
  // 导出一个install的方法  在main.js中引入 Vue.use() 会使install这个方法执行
  install (Vue) {
    // 重新 在Vue的原型上加载一个与notify一样的方法 并 每次 默认给他一个配置
    Vue.prototype.$Notify = params => Vue.prototype.$notify({ duration: 800, ...params })
  }
}
