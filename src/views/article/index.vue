<template>
    <div class='container'>
    <van-nav-bar fixed title="文章详情" left-arrow @click-left="$router.back()" />
    <div class="detail">
      <h3 class="title">{{articInfo.title}}</h3>
      <div class="author">
        <van-image round width="1rem" height="1rem" fit="fill" :src="articInfo.aut_photo" />
        <div class="text">
          <p class="name">{{articInfo.aut_name}}</p>
          <p class="time">{{articInfo.pubdate | relativeTime}}</p>
        </div>
        <van-button @click="follow" round size="small" type="info">{{articInfo.is_followed?'取消':'+'}} 关注</van-button>
      </div>
      <!-- 文章内容 -->
      <div class="content" v-html="articInfo.content">
      </div>
      <div class="zan">
        <van-button round size="small" :class="{active: articInfo.attitude === 1}" plain icon="like-o">点赞</van-button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <van-button round size="small" :class="{active: articInfo.attitude === 0}" plain icon="delete">不喜欢</van-button>
      </div>
   <comments></comments>
    </div>
  </div>
</template>

<script>
import { getArticById, followAuth, CancelFollow } from '@/api/artic'
import comments from './components/comment'
export default {
  components: {
    comments
  },
  data () {
    return {
      articInfo: {} // 文章的具体信息
    }
  },
  methods: {
    // 获取文章信息
    async getArtic () {
      const id = this.$route.query.art_id
      const res = await getArticById(id)
      this.articInfo = res
    },
    // 关注与取消关注
    async follow () {
      try {
        const target = this.articInfo.aut_id

        if (this.articInfo.is_followed) {
        // 已关注 点击取消
          await CancelFollow(target)
          this.$Notify({ message: '取消成功', type: 'success' })
        } else {
          await followAuth(target)
          this.$Notify({ message: '关注成功', type: 'success' })
        }
        this.articInfo.is_followed = !this.articInfo.is_followed //
      } catch (error) {
        this.$Notify({ message: '操作失败' })
      }
    }
  },
  created () {
    this.getArtic()
  }
}
</script>

<style lang='less' scoped>
.container {
  height: 100%;
  overflow-y: auto;
  box-sizing: border-box;
}
.detail {
  padding: 46px 10px 44px;
  .title {
    font-size: 18px;
    line-height: 2;
  }
  .zan{
    text-align: center;
    padding: 10px 0;
    .active{
      border-color:red;
      color: red;
    }
  }
  .author {
    padding: 10px 0;
    display: flex;
    position:sticky;
    background-color: #fff;
    top:46px;
    z-index: 2;
    .text {
      flex: 1;
      padding-left: 10px;
      line-height: 1.5;
      .name {
        font-size: 14px;
        margin: 0;
      }
      .time {
        margin: 0;
        font-size: 12px;
        color: #999;
      }
    }
  }
  .content {
    padding: 20px 0;
    overflow: hidden;
    white-space: pre-wrap;
    word-break: break-all;
    /deep/ img{
      max-width:100%;
      background: #f9f9f9;
    }
    /deep/ code{
      white-space: pre-wrap;
    }
  }
}
</style>
