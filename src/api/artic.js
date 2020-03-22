/*
封装一个获取文章列表的方法 并返回
 */
import store from '@/store'
import AXIOS from '@/utils/request'
export function getArtic (data) {
  return AXIOS({
    url: 'http://ttapi.research.itcast.cn/app/v1_1/articles',
    params: {
      with_top: 1,
      ...data
    }
  })
}
/*
封装一个获取当前用户的频道类型的方法 并返回
 */
/* export function getChannel () {
  return AXIOS({
    url: '/user/channels'
  })
}
 */
export function getChannel () {
  return new Promise(function (resolve, reject) {
  // 先判断 是否token
    const token = store.state.user.token
    const key = token ? 'staff' : 'visitor'
    // 然后从内存中获取 频道列表的数组
    const list = window.localStorage.getItem(key)
    // 如果 列表 可以获取到 就返回 如果获取不到 就 发送请求 重新获取
    if (list) {
      // 可以再内存中获取到
      // list是一个json字符串 需要转换
      resolve({ channels: JSON.parse(list) })
    } else {
      // 获取不到
      AXIOS({
        url: '/user/channels'
      }).then(res => {
        //  res 是获取到的频道列表
        // 存在内存中
        window.localStorage.setItem(key, JSON.stringify(res.channels))
        resolve(res)
      })
    }
  })
}
/*
 *删除频道的方法(删除本地内存中的频道列表)
 */
export function delChannel (id) {
  return new Promise(function (resolve, reject) {
    // 先判断 有没有toekn
    const token = store.state.user.token
    const key = token ? 'staff' : 'visitor'
    let list = window.localStorage.getItem(key) // 频道列表
    list = JSON.parse(list)
    const index = list.findIndex(item => item.id === id)
    if (index >= -1) {
      list.splice(index, 1) // 删除
      // 然后再存进去
      window.localStorage.setItem(key, JSON.stringify(list))
      resolve('删除成功')
    } else {
      reject(new Error('服务器错误'))
    }
  })
}
/*
 * 添加频道
 */
export function addChannel (item) {
  return new Promise(function (resolve, reject) {
    const token = store.state.user.token
    const key = token ? 'staff' : 'visitor'
    let list = window.localStorage.getItem(key) // 频道列表
    list = JSON.parse(list)
    list.push(item)
    window.localStorage.setItem(key, JSON.stringify(list))
  })
}
/*
封装一个获取所有的频道类型的方法 并返回
 */
export function getAllChannel () {
  return AXIOS({
    url: '/channels'
  })
}
/*
 * 不喜欢文章
 */
export function dislike (id) {
  return AXIOS({
    url: '/article/dislikes',
    method: 'post',
    data: {
      target: id
    }
  })
}
/*
 * 举报文章
 * target:举报文章 type 举报类型
 */
export function informArtic (target, type, remark = null) {
  return AXIOS({
    url: '/article/reports',
    method: 'post',
    data: {
      target,
      type,
      remark
    }

  })
}
