<template>
   <div class="comment">
       <!-- 文章评论列表 -->
    <van-list @load="loadComments" v-model="loading" :finished="finished" finished-text="没有更多了">
      <div class="item van-hairline--bottom van-hairline--top" v-for="(item,index) in commentsList" :key="index">
        <van-image
          round
          width="1rem"
          height="1rem"
          fit="fill"
          :src="item.aut_photo"
        />
        <div class="info">
          <p>
            <span class="name">{{item.aut_name}}</span>
            <span style="float:right">
              <span class="van-icon van-icon-good-job-o zan"></span>
              <span class="count">{{item.like_count}}</span>
            </span>
          </p>
          <p>{{item.content}}</p>
          <p>
            <span class="time">{{item.pubdate | relativeTime}}</span>&nbsp;
            <van-tag plain @click="openReply(item.com_id.toString())">{{item.reply_count}} 回复</van-tag>
          </p>
        </div>
      </div>
    </van-list>
    <!-- 用户回复评论 -->
    <div class="reply-container van-hairline--top">
      <van-field v-model="value" placeholder="写评论...">
        <van-loading v-if="submiting" slot="button" type="spinner" size="16px"></van-loading>
        <span class="submit"  slot="button">提交</span>
      </van-field>
    </div>
    <!-- 查看回复评论  用上来菜单 -->
    <van-action-sheet v-model="sheetShow" title="回复评论" :round="false" class="reply_dialog">
     <van-list @load="getReply" v-model="reply.loading" :finished="reply.finished" finished-text="没有更多了">
        <div class="item van-hairline--bottom van-hairline--top" v-for="(item,index) in reply.replyList" :key="index">
          <van-image round width="1rem" height="1rem" fit="fill" src="https://img.yzcdn.cn/vant/cat.jpeg" />
          <div class="info">
            <p><span class="name">{{item.aut_name}}</span></p>
            <p>{{item.content}}</p>
            <p><span class="time">{{item.pubdate | relativeTime}}</span></p>
          </div>
        </div>
      </van-list>
    </van-action-sheet>
  </div>
</template>

<script>
import { getComments } from '@/api/artic'
export default {
  data () {
    return {
      loading: false,
      finished: false,
      commentsList: [], // 文章的列表列表
      value: '',
      submiting: false,
      offset: null,
      sheetShow: false, // 回复评论的上拉菜单
      reply: {
        replyList: [],
        loading: false,
        finished: false,
        offset: null
      }
    }
  },
  methods: {
    // 获取文章评论
    async loadComments () {
      const id = this.$route.query.art_id
      const params = {
        type: 'a',
        source: id,
        offset: this.offset
      }
      const res = await getComments(params)
      console.log(res)
      this.commentsList.push(...res.results)
      this.loading = false // 加载完数据 关闭加载状态
      this.finished = res.end_id === res.last_id
      if (!this.finished) {
        // 表示 还没没结束
        // data.last_id是 当前页的最后一个id
        this.offset = res.last_id
      }
    },
    // 打开回复平论
    openReply (id) {
      this.sheetShow = true
      this.reply.replyList = [] // 先清空 回复评论的列表
      this.reply.finished = false
      //   this.reply.loading = false // ???????
      this.reply.id = id // 记录点击文评论的id
    },
    async getReply () {
      const params = {
        type: 'c',
        source: this.reply.id,
        offset: this.reply.offset
      }
      const res = await getComments(params)
      this.reply.replyList.push(...res.results)
      this.reply.loading = false
      this.reply.finished = res.end_id === res.last_id
      if (!this.reply.finished) {
        // 表示 还没没结束
        // data.last_id是 当前页的最后一个id
        this.reply.offset = res.last_id
      }
    }
  }
}
</script>

<style lang='less' scoped>
.comment {
  margin-top: 10px;
  /deep/ .item {
    display: flex;
    padding: 10px 0;
    .info {
      flex: 1;
      padding-left: 10px;
      .name{
        color:#069;
      }
      .zan{
        vertical-align:middle;
        padding-right:2px;
      }
      .count{
        vertical-align:middle;
        font-size:10px;
        color: #666;
      }
      .time{
        color: #666;
      }
      p {
        padding: 5px 0;
        margin: 0;
      }
    }
  }
  /deep/ .van-button:active::before {
    background: transparent;
  }
}
.reply-container {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 44px;
  width: 100%;
  background: #f5f5f5;
  z-index: 9999;
  .submit {
    font-size: 12px;
    color: #3296fa;
  }
}
.reply_dialog {
  height: 100%;
  max-height: 100%;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  .van-action-sheet__header {
    background: #3296fa;
    color: #fff;
    .van-icon-close {
      color: #fff;
    }
  }
  .van-action-sheet__content{
    flex: 1;
    overflow-y: auto;
    padding: 0 10px 44px;
  }
}
</style>
