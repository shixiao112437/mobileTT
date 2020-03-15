<template>
  <div class="contain">
    <!-- 头部标题 -->
    <van-nav-bar title="个人头条" right-text="搜索" @click-right="$router.push('/search')">
      <!-- <van-icon name="search" slot="right" /> -->
    </van-nav-bar>
    <!-- 首页内容 -->
    <div class="wrap">
      <router-view></router-view>
    </div>
    <!-- 底部导航 -->
    <van-tabbar route >
        <van-tabbar-item icon="wap-home-o" to='/home'>首页</van-tabbar-item>
        <van-tabbar-item icon="chat-o" to='/home/question'>问答</van-tabbar-item>
        <van-tabbar-item icon="tv-o" to='/home/video'>视频</van-tabbar-item>
        <van-tabbar-item icon="user-circle-o" to='/home/user'>我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {}
</script>

<style lang='less' scoped>
.contain {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  .wrap{
      flex: 1;
  }
  .van-tabbar{
    height: 60px;
    background: #3296fa;
    .van-tabbar-item{
        color: #ffffff;
    }
  }
}
  .van-nav-bar {
    background: #3296fa;
    height: 40px;
    .van-nav-bar__title {
      color: #fff;
    }
    .van-nav-bar__text {
      color: #fff;
      font-size: 12px;
    }
    .van-icon{
      color: #fff;
    }
  }
  .van-tabbar{
    background: #fdfdfd;
  }
  .van-nav-bar__text:active{
    background: transparent;
  }

  .split {
    height: 20px;
  }
</style>
