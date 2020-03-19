<template>
  <div class="container">
      <van-tabs>
        <van-tab :title="item.name" v-for="item in channelList" :key="item.id">
          <!--   <van-cell-group>
              <van-cell :value="`内容${item}`" :title="`标题${item}`" v-for="item in 20" :key="item"></van-cell>
            </van-cell-group> -->

            <!-- 将 频道类型的id传给子组件-->
            <articlist :channel_id='item.id'></articlist>
        </van-tab>

      </van-tabs>
       <span class="bar_btn">
        <!-- 放入图标 vant图标 -->
         <van-icon name='wap-nav'></van-icon>
      </span>
  </div>
</template>

<script>
import Artic from '@/views/home/components/artic' // 引入tab选的子组件
import { getChannel } from '@/api/artic'
export default {
  data () {
    return {
      channelList: [] // 保顿获取的频道类型的相关信息
    }
  },
  methods: {
    async getChannel () {
      const res = await getChannel() // res是获取到的频道对象
      console.log(res)
      this.channelList = res.channels
    }
  },
  created () {
    // 调用获取频道的方法
    this.getChannel()
  },
  components: {
    articlist: Artic
  }
}
</script>

<style scoped lang='less'>
.van-tabs {
  height: 100%;
  display: flex;
  flex-direction: column;
  /deep/ .van-tabs__wrap {
    height: 36px;
    padding-right: 36px;
    .van-tab {
      line-height: 36px;
    }
    .van-tabs__line {
      background-color: #3296fa;
      height: 2px;
    }
  }
  /deep/ .van-tabs__content{
    flex: 1;
    overflow: hidden;
  }
  /deep/ .van-tab__pane{
    height: 100%;
    .scroll-wrapper{
      height: 100%;
      overflow-y: auto;
    }
  }
}
.bar_btn {
  width: 36px;
  height: 35px;
  position: absolute;
  top: 0;
  right: 0;
  &::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 999;
    box-shadow: 0 0 10px #999;
    transform: scale(1, 0.6);
  }
  .van-icon-wap-nav {
    width: 100%;
    height: 100%;
    background: #fff;
    text-align: center;
    line-height: 35px;
    position: relative;
    z-index: 1000;
    &::before {
      font-size: 20px;
    }
  }
}
</style>
