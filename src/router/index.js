import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
const home = () => import('@/views/home') // 主页
const first = () => import('@/views/home/first') // 主页首页
const question = () => import('@/views/question') // 主页问答
const video = () => import('@/views/video') // 主页视频
const user = () => import('@/views/user') // 主页用户
const userChat = () => import('@/views/user/chat') // 小智同学
const login = () => import('@/views/login') // 登录
const info = () => import('@/views/user/info') // 用户信息
const search = () => import('@/views/search') // 搜索
const searchResult = () => import('@/views/search/result') // 搜索结果
const article = () => import('@/views/article')
const routes = [
  {
    // 打开页面 直接进入主页 的 首页
    path: '',
    redirect: '/home' // home为主页
  },
  {
    // 主页路由
    path: '/home',
    component: home,
    children: [{
      // 主页首页
      path: '',
      component: first
    }, {
      // 主页 问答
      path: 'question',
      component: question
    }, {
      // 主页视频
      path: 'video',
      component: video
    }, {
      // 主页 用户
      path: 'user',
      component: user
    }]
  },
  {
    // 小智同学
    path: '/user/chat',
    component: userChat
  }, {
    // 登录
    path: '/login',
    component: login
  }, {
    // 用户信息 编辑资料
    path: '/user/info',
    component: info
  }, {
    // 搜索
    path: '/search',
    component: search
  }, {
    // 搜索结果
    path: '/result',
    component: searchResult
  },
  {
    // 文章详情
    path: '/article',
    component: article
  }
]

const router = new VueRouter({
  routes
})

export default router
