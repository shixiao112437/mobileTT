<template>
  <div class="container">
    <!-- 导航 显示返回箭头-->
    <!-- click-left点击左侧事件 -->
    <!-- $router.go(-1) $router.back() -->
    <!-- 将 导航栏固定在顶部 -->
    <van-nav-bar fixed title="搜索结果" left-arrow @click-left="$router.back()"></van-nav-bar>
    <!-- 防止搜索结果列表 -->
    <van-list v-model="loadShow" :finished="finished" @load="onLoad">
      <van-cell-group>
        <van-cell :to="{path:'/article', query:{artic_id:item.art_id.toString()}}" v-for="(item,index) in resultsList" :key="index">
          <div class="article_item">
            <h3 class="van-ellipsis">{{item.title}}</h3>
            <div class="img_box" v-if="item.cover.type===3">
              <van-image lazy-load class="w33" fit="cover" :src="item.cover.images[0]" />
              <van-image lazy-load class="w33" fit="cover" :src="item.cover.images[1]" />
              <van-image lazy-load class="w33" fit="cover" :src="item.cover.images[2]" />
            </div>
            <div class="img_box" v-if="item.cover.type===1">
              <van-image lazy-load class="w100" fit="cover" :src="item.cover.images[0]" />
            </div>
            <div class="info_box">
              <span>{{item.aut_name}}</span>
              <span>{{item.comm_count}}评论</span>
              <span>{{item.pubdate | relativeTime}}</span>
            </div>
          </div>
        </van-cell>
      </van-cell-group>
    </van-list>
  </div>
</template>

<script>
import { getResults } from '@/api/artic'
export default {
  data () {
    return {
      page: {
        page: 1,
        per_page: 10
      },
      resultsList: [], // 结果列表
      loadShow: false,
      finished: false

    }
  },
  methods: {

    async  onLoad () {
      try {
        const q = this.$route.query.q // 获取搜索中心传来关键词的参数
        // params 是获取结果需要用的参数
        const params = {
          q, ...this.page
        }
        // 通过发送请求 获取 搜索结果
        const res = await getResults(params)
        this.loadShow = false
        this.resultsList.push(...res.results)
        console.log(this.resultsList)

        if (res.results.length) {
          // 说明还有数据
          // 下次加载的时候 将要获取 的页码++
          this.page.page++
        } else {
          this.finished = true
          this.$Notify({ type: 'warning', message: '已经没有数据了' })
        }
      } catch (error) {
        this.Notify('服务器繁忙')
      }
    }
  }

}
</script>

<style lang='less' scoped>
.container {
  padding-top: 46px;
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
}
.article_item {
  h3 {
    font-weight: normal;
    line-height: 2;
  }
  .img_box {
    display: flex;
    justify-content: space-between;
    .w33 {
      width: 33%;
      height: 90px;
    }
    .w100 {
      height: 180px;
      width: 100%;
    }
  }
  .info_box {
    color: #999;
    line-height: 2;
    position: relative;
    span {
      padding-right: 10px;
    }
  }
}
</style>
