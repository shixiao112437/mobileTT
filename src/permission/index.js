// 一些页面 要通过路由守卫对其进行拦截
// 如果判断没有登录 或者没有token token失效  需要让其返回登录页进行登录
// 该文件需要在main.js中引入 不然不会生效
import router from '@/router'
import store from '@/store'
router.beforeEach(function (to, from, next) {
  if (to.path.startsWith('/user') && !store.state.user.token) {
    next({
      path: '/login',
      query: {
        redirectUrl: to.fullPath // 登录成功要返回的页面
      }
    })
  } else {
    next()
  }
})
