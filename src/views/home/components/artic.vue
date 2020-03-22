<template>
  <div class="scroll-wrapper">
    <van-pull-refresh v-model="refresh" @refresh='pullRefresh' loading-text='正在急速加载' :success-text='refreshText'>

    <van-list v-model="loading" @load="onLoad" :offset="200" :finished="finshed" loading-text='正在努力加载'>
      <van-cell-group>
        <!-- 循环文章列表  文章的id是一个大数字 对象 需要用toString()-->
        <van-cell v-for="item in articList" :key="item.art_id.toString()">
          <div class="article_item">
            <h3 class="van-ellipsis">{{item.title}}</h3>
            <div class="img_box" v-if="item.cover.type!==0">
              <van-image lazy-load  v-for="(item,index) in item.cover.images" :key="index" class="w33" fit="cover" :src="item" />
            </div>
            <div class="info_box">
              <span>{{item.aut_name}}</span>
              <span>{{item.comm_count}}评论</span>
              <span>{{item.pubdate | relativeTime}}</span>
              <!-- ×可以对数据进行操作 只有登录的用户才可以 操作 要判断 是否有token 给据vuex共享的属性 -->
              <span class="close" v-if="user.token">
                <!-- 点击查号 通过自定义事件 改变 popup的状态 并传出 当前文章的id(大数字需要toString)  -->
                <van-icon name="cross" @click="$emit('openPopup',item.art_id.toString())"></van-icon>
              </span>
            </div>
          </div>
        </van-cell>
      </van-cell-group>

    </van-list>
     </van-pull-refresh>
  </div>
</template>

<script>
import Bus from '@/utils/eventbus'
import { getArtic } from '@/api/artic'
import { mapState } from 'vuex' // 引入辅助函数 将token的状态共享
export default {
  props: {
    // 用于接受父组件的传值
    channel_id: {
      type: Number, // 传过来的频道类型
      required: true, // 是否必须传
      default: 20 // 默认值
    }
  },
  created () {
    //  id 为文章id , type 为 频道类型的id
    Bus.$on('delArticLIst', (id, type) => {
      // 当前频道下的文章 列表 删除 某一篇文章
      if (this.channel_id === type) {
        const index = this.articList.findIndex(item => {
          return item.art_id.toString() === id
        })
        this.articList.splice(index, 1)
        if (!this.articList.length) {
          this.onLoad()
        }
      }
    })
  },
  data () {
    return {
      loading: false,
      finshed: false, // 是否加载完成
      articList: [], // 文章列表
      timestamp: null, // 时间戳
      refresh: false, // 是否加载完成
      refreshText: '' // 下拉刷新 提示文字
    }
  },
  methods: {
    // 下拉加载理解
    /*     onLoad () {
      let a = 1

      setTimeout(() => {
        console.log('开始加载数据')
        this.loading = true

        const c = setInterval(() => {
          console.log(a++)
          if (a === 3) {
            this.loading = false
            clearInterval(c)
          }
        }, 1000)
      })
    } */
    // 上来加载
    async onLoad () {
    // 调用封装好的获取问政列表的方法 (先引入)
    // 请求参数
      // console.log('正在加载')

      await this.$delayed(5000)
      // await setTimeout(res => {}, 1000)
      const params = {
        channel_id: this.channel_id, // 频道id 有父组件传用props(对象)传过来的
        // timestamp: this.timestamp ? this.timestamp : Date.now()
        // 如果时间戳有值就传 如果没有值 就传当前的时间戳
        timestamp: this.timestamp || Date.now()
      }
      // console.log(res)
      // console.log(1)
      const res = await getArtic(params)
      console.log(res)
      this.articList.push(...res.results) // push到绑定的数组
      this.loading = false // 停止加载
      // 如果最后一次请求 没有携带时间戳 说明 没有数据了 将 van-list finished绑定的数据改为true 停止加载
      if (!res.pre_timestamp) {
        this.finshed = true
      } else {
        this.timestamp = res.pre_timestamp // 下次请求的时间戳 (第一次请求 为当时的时间)
      }
    },
    // 下拉刷新
    async  pullRefresh () {
      /*    setTimeout(res => {
        this.refresh = false
      }, 1000) */
      await this.$delayed(5000)
      const params = {
        channel_id: this.channel_id,
        timestamp: Date.now()
      }
      const res = await getArtic(params)
      // this.articList = res.
      console.log(res)
      this.refresh = false // 关闭下拉刷新
      // 判断 如果有数据 就覆盖 articList
      // 如果没有 提示 目前没有最新消息
      if (res.results.length) {
        this.articList = res.results
        this.refreshText = `加载了${res.results.length}条数据`
        // 将获得的数据的时间戳赋值 给timestamp
        if (res.pre_timestamp) {
          this.timestamp = res.pre_timestamp
          this.finshed = false
        }
      } else {
        // 没有 提示没有最新消息
        this.refreshText = '么得数据了O(∩_∩)O~'
      }
    }

  },
  computed: {
    ...mapState(['user']) // 引入 user 这个属性 usr.token 为token
  }

}
</script>

<style lang='less' scoped>
.article_item {
  h3 {
    font-weight: normal;
    line-height: 2;
  }
  .img_box {
    display: flex;
    justify-content: space-between;
    height: 120px;
    .w33 {
      margin: 0 3px;
     flex: 1;
    }
    .w100 {
      width: 100%;
      height: 180px;
    }
  }
  .info_box {
    color: #999;
    line-height: 2;
    position: relative;
    font-size: 12px;
    span {
      padding-right: 10px;
      &.close {
        border: 1px solid #ddd;
        border-radius: 2px;
        line-height: 15px;
        height: 12px;
        width: 16px;
        text-align: center;
        padding-right: 0;
        font-size: 8px;
        position: absolute;
        right: 0;
        top: 7px;
      }
    }
  }
}
</style>
