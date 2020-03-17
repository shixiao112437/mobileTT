/*
*次文件是专门对token 进行处理的
*封装了一些对token 设置 读取 删除的方法
* 并将这些方法导出 可以在其他的业务场景中用
*/
const USER_TOKEN = 'user_token'

// 设置token
export function setUserToken (user) {
  // 设置一个token并将其存在浏览器内存中
  // 在localStorage中储存 必须是json格式的对象  需要用JSON.stringify() 对齐转换
  window.localStorage.setItem(USER_TOKEN, JSON.stringify(user))
}
// 获取token
export function getUserToken () {
// 将存在本地的token返回  如果没有获取到token返回一个空对象
  return JSON.parse(window.localStorage.getItem(USER_TOKEN)) || {}
}
// 删除token
export function delUserToken () {
  window.localStorage.removeItem(USER_TOKEN) // 删除缓存中的token
}
