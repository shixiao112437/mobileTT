/*
封装一个获取文章列表的方法 并返回
 */
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
封装一个获取频道类型的方法 并返回
 */
export function getChannel () {
  return AXIOS({
    url: '/user/channels'
  })
}
