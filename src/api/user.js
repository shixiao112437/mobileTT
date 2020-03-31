// 先引入 封装好的request 请求方法
import AXIOS from '@/utils/request'
// 封装一个登陆验证的请求 并导出
export function login (data) {
  return AXIOS({
    url: '/authorizations',
    method: 'post',
    data
  })
}
/*
 *封装一个回去用户信息的方法
 *
 */
export function getUserInfo () {
  return AXIOS({
    url: '/user'
  })
}
/*
 *获取用户个人资料的方法
 */
export function getUserData () {
  return AXIOS({
    url: '/user/profile'
  })
}
/*
 *编辑用户资料
 */
export function editInfo (data) {
  return AXIOS({
    url: '/user/profile',
    method: 'patch',
    data
  })
}
