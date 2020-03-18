import axios from 'axios' // 引入axios
import store from '@/store' // 引入共享数据的文件
import JSONbig from 'json-bigint' // 引入 处理大数字的插件
import router from '@/router'
// 使用自定义配置创建一个axios实例
const config = {
// 基地址
  baseURL: 'http://ttapi.research.itcast.cn/app/v1_0',
  // 响应格式化处理
  // 在传递给 then/catch 前，允许修改响应数据
  // 对大数字 进行处理
  transformResponse: [function (data) {
    // data 是 后端 返回的json字符串
    // 对大数字进行处理在返回
    return data ? JSONbig.parse(data) : {}
  }]
}
const instance = axios.create(config)

// 在请求拦截除 可以设置 一个请求头 用来 保存token 后端接口需要
instance.interceptors.request.use(function (config) {
  // 给据共享的state判断是否含有 token 如果有将 token 设置在请求头上(接口需要)
  // 获取state 需要将store文件引入 通过 store.state.user.token 获取
  if (store.state.user.token) config.headers.Authorization = `Bearer ${store.state.user.token}`
  // 不用 if else 简写
  //   config.headers.Authorization && (config.headers.Authorization = `Bearer ${store.state.user.token}`)
  // 将config返回
  return config
}, function (err) {
  // 请求出错是 将错误 返回
  return Promise.reject(err) // 会直接进入promise的catch()中
})

// 响应拦截
// 响应成功 会进入响应拦截器成功的区域(第一个函数里) 将响应的数据 进行解构
// 响应失败 会进入响应拦截器失败的区域(第二个函数里)
instance.interceptors.response.use(function (response) {
  // 对返回的数据进行解构(axios会自动将返回的数据包一层数据)
  try {
    return response.data.data // 解构两层数据
  } catch (err) {
    //   解构失败
    return response.data // 解构一层
  }
}, async function (error) {
  // 当响应失败是会进入此区域
  /*
        error 中包括 一下信息
            coonfig 当次请求的一些配置信息
            resquest 请求对象
            response 相应的错误对象
   */
  if (error.request && error.request.status === 401) {
    // 现获取当前发送请求的路由地址
    const path = {
      path: '/login',
      query: {
        // 来自哪个url发送的请求
        redirectUrl: router.currentRoute.fullPath
      }
    }
    //   说明token失效
    // 先判断有没有token
    if (store.state.user.refresh.token) {
      // 有refresh_token 可以通过发送请求获取新的token
      // 因为现在的token已经失效了  instance在请求拦截处 要统一 注入token
      // (如果用instance发送请求的话 会造成死循环 还会进入函数 造成死循环)
      // 所以要用axios发送请求 或者 重新实例化一个axios axios.creat()
    //   axios({
    //     url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
    //     method: 'put',
    //     headers: {
    //       Authorization: `Bearer ${store.state.user.refresh.token}`
    //     }
    //   }).then(res => {
    //     const user = {
    //       token: res.data.data.token,
    //       refresh_token: res.data.data.refresh_token
    //     }
    //     store.commit('updataToken', user)
    //     return instance(error.config)
    //   }).catch(() => {
    //     // 说明refresh_token也失效了 需要重新登录 设置token
    //     store.commit('delUser') // 调用store中删除token的方法
    //     router.push(path)
    //   })
      try {
        // 获取新token成功
        // res 为发送请求获得的数据 没有进行解构
        const res = await axios({
          url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
          method: 'put',
          headers: {
            Authorization: `Bearer ${store.state.user.refresh.token}`
          }
        })
        // 修改 token的payload
        const user = {
          token: res.data.data.token,
          refresh_token: res.data.data.refresh_token
        }
        // 调用 store中修改token的方法
        store.commit('updataToken', user) // 更新了token
        // 重新发送 刚刚失败的请求并将结果返回
        return instance(error.config)
      } catch (error) {
        // 获取新token失败
        store.commit('delUser') // 调用store中删除token的方法
        // 返回登录页 发送请求 重新设置token  记录是由哪个路由跳转至登录页的
        router.push(path)
      }
    } else {
      // 说明没有refresh_token // 直接返回登录页面
      // 需要返回到登录页面 并将失效的token清除
      store.commit('delUser') // 调用store中删除token的方法
      router.push(path)
    }
  }
  return Promise.reject(error) // 返回执行链的 catch
})
export default instance
