<template>
<div class="container">
    <div class="user-profile">
      <div class="info">
        <van-image round :src="userInfo.photo" />
        <h3 class="name">
          {{userInfo.name}}
          <br />
          <van-tag size="mini">申请认证</van-tag>
        </h3>
      </div>
      <van-row>
        <van-col span="8">
          <p>{{userInfo.art_count}}</p>
          <p>动态</p>
        </van-col>
        <van-col span="8">
          <p>{{userInfo.follow_count}}</p>
          <p>关注</p>
        </van-col>
        <van-col span="8">
          <p>{{userInfo.fans_count}}</p>
          <p>粉丝</p>
        </van-col>
      </van-row>
    </div>
    <van-row class="user-links">
      <van-col span="8">
        <van-icon name="newspaper-o" color="#7af" />我的作品
      </van-col>
      <van-col span="8">
        <van-icon name="star-o" color="#f00" />我的收藏
      </van-col>
      <van-col span="8">
        <van-icon name="tosend" color="#fa0" />阅读历史
      </van-col>
    </van-row>

    <van-cell-group class="user-group">
      <van-cell icon="edit" title="编辑资料" to="/user/info" is-link />
      <van-cell icon="chat-o" title="小智同学" to="/user/chat" is-link />
      <van-cell icon="setting-o" title="系统设置" is-link />
      <van-cell @click="logout" icon="warning-o" title="退出登录" is-link />
    </van-cell-group>
    <div>
        <h1>这是用户</h1>
        <router-link to='/login'>登录</router-link> <br>
        <router-link to='/user/chat'>小智聊天</router-link> <br>
        <router-link to='/user/info'>编辑用户</router-link>
    </div>

  </div>

</template>

<script>
import { getUserInfo } from '@/api/user.js'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      userInfo: {
        photo: '',
        name: '',
        sex: '',
        birthday: ''
      }
    }
  },
  methods: {
    // 引入vuex中删除token的方法
    ...mapMutations(['delUser', 'editPhoto']),
    // 获取用户的个人信息
    async getUserInfo () {
      const res = await getUserInfo()
      this.userInfo = res
      this.editPhoto({ photo: this.userInfo.photo }) // 更新用户的头像
    },
    // 退出登录
    async logout () {
      try {
        // 弹出一个消息 确认是否退出
        await this.$dialog.confirm({
          message: '是否确认退出'
        })
        // 确认之后 调用 vuex中的方法 删除 token() 并清除缓存中的token
        this.delUser()
        this.$router.push('/login')
      } catch (error) {

      }
    }
  },
  created () {
    this.getUserInfo()
  }
}
</script>

<style lang='less' scoped>
.user {
  &-profile {
    width: 100%;
    height: 150px;
    display: block;
    background: #3296fa;
    color: #fff;
    .info {
      display: flex;
      padding: 20px;
      align-items: center;
      .van-image{
        width: 64px;
        height: 64px;
      }
      .name {
        font-size: 16px;
        font-weight: normal;
        margin-left: 10px;
      }
      .van-tag {
        background: #fff;
        color: #3296fa;
      }
    }
    p{
      margin: 0;
      text-align: center;
    }
  }
  &-group {
    margin-bottom: 15px;
  }
  &-links {
    padding: 15px 0;
    font-size: 12px;
    text-align: center;
    background-color: #fff;
    .van-icon {
      display: block;
      font-size: 24px;
      padding-bottom: 5px;
    }
  }
}

</style>
