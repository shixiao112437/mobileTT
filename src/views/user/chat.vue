<template>
  <div class="container">
    <van-nav-bar fixed left-arrow @click-left="$router.back()" title="小智同学"></van-nav-bar>
    <div class="chat-list" ref="msgList">
      <div class="chat-item" :class="item.name==='xz'?'left':'right'" v-for="(item,index) in list" :key="index">
        <van-image v-if="item.name==='xz'" fit="cover" round :src="img" />
        <div class="chat-pao">{{item.msg}}</div>
         <van-image v-if="item.name!=='xz'"  fit="cover" round :src="photo" />
      </div>
      <!-- <div class="chat-item right">
        <div class="chat-pao">ewqewq</div>
        <van-image  fit="cover" round :src="photo" />
      </div> -->
    </div>
    <div class="reply-container van-hairline--top">
      <van-field v-model.trim="value" placeholder="说点什么...">
        <van-loading v-if="loading" slot="button" type="spinner" size="16px"></van-loading>
        <span v-else @click="send()" slot="button" style="font-size:12px;color:#999">提交</span>
      </van-field>
    </div>
  </div>
</template>

<script>
import img from '@/assets/1.jpg'
import { mapState } from 'vuex' // 引入共享的头像
import io from 'socket.io-client'
export default {
  data () {
    return {
      img, // 客服头像
      value: '', // 用户输入
      loading: false, // 加载状态
      list: [] // 聊天记录
    }
  },
  methods: {
    // 发送信息
    async send () {
      if (this.value) {
        this.loading = true
        // 发送消息(注册事件)
        this.socket.emit('message', {
          msg: this.value,
          timestamp: Date.now()
        })
        this.list.push({ msg: this.value })
        this.value = ''
        this.loading = false
      } else {
        return false
      }
    },
    // 将滚动条滚动到底部
    scrollBottom () {
      console.log(this.list)
      console.log(this.$refs.msgList.scrollHeight)
      this.$nextTick(() => {
        this.$refs.msgList.scrollTop = this.$refs.msgList.scrollHeight
      })
    }
  },
  computed: {
    ...mapState(['photo', 'user']) // 获取照片
  },
  created () {
    // 拨号连接 new Websocket('')
    this.socket = io('http://ttapi.research.itcast.cn', {
      // 固定写法 ?token=....
      query: {
        token: this.user.token
      }
    })
    // 连接成功会调用onopen() 方法
    this.socket.on('connect', () => {
      // 连接成功 xz主动说句话
      this.list.push({ msg: '有什么可以帮助的呢', name: 'xz' })
    })
    // 监听 回复的内容
    this.socket.on('message', data => {
      console.log(data)
      this.list.push({ ...data, name: 'xz' })
    })
  },
  watch: {
    list () {
      this.scrollBottom()
    }
  },
  beforeDestroy () {
    this.socket.close()
    console.log('断开连接')
  }
}
</script>

<style lang='less' scoped>
.container {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  box-sizing: border-box;
  background:#fafafa;
  padding: 46px 0 50px 0;
  .chat-list {
    height: 100%;
    overflow-y: scroll;
    .chat-item{
      padding: 10px;
      .van-image{
        vertical-align: top;
        width: 40px;
        height: 40px;
      }
      .chat-pao{
        vertical-align: top;
        display: inline-block;
        min-width: 40px;
        max-width: 70%;
        min-height: 40px;
        line-height: 38px;
        border: 0.5px solid #c2d9ea;
        border-radius: 4px;
        position: relative;
        padding: 0 10px;
        background-color: #e0effb;
        word-break: break-all;
        font-size: 14px;
        color: #333;
        &::before{
          content: "";
          width: 10px;
          height: 10px;
          position: absolute;
          top: 12px;
          border-top:0.5px solid #c2d9ea;
          border-right:0.5px solid #c2d9ea;
          background: #e0effb;
        }
      }
    }
  }
}
.chat-item.right{
  text-align: right;
  .chat-pao{
    margin-left: 0;
    margin-right: 15px;
    &::before{
      right: -6px;
      transform: rotate(45deg);
    }
  }
}
.chat-item.left{
  text-align: left;
  .chat-pao{
    margin-left: 15px;
    margin-right: 0;
    &::before{
      left: -5px;
      transform: rotate(-135deg);
    }
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
}
</style>
