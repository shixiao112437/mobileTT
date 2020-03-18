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
