<template>
  <div class="container">
    <!-- 头部标题 -->
    <van-nav-bar  title="个人头条" right-text="搜索" @click-right="$router.push('/search')" v-if="$route.path!== '/home/user'">
      <!-- <van-icon name="search" slot="right" /> -->
    </van-nav-bar>
    <!-- 首页内容 -->
    <div class="wrap" :class="{noTop: $route.path === 'home/user'}">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
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

.container{
  width: 100%;
  height: 100%;
  position: relative;
  // 控制二级路由容器的高宽
  .wrap{
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding-bottom: 50px;
    box-sizing: border-box;
    &.noTop{
      padding-top: 0;
    }
  }
}
</style>
