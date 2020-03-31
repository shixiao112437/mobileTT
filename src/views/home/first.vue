<template>
  <div class="container">
      <van-tabs v-model="tabIndex" animated swipeable @change='changeTab'>
        <van-tab :title="item.name" v-for="item in channelList" :key="item.id">
          <!--   <van-cell-group>
              <van-cell :value="`内容${item}`" :title="`标题${item}`" v-for="item in 20" :key="item"></van-cell>
            </van-cell-group> -->

            <!-- 将 频道类型的id传给子组件-->
            <articlist @openPopup='openPopup' :channel_id='item.id'></articlist>
        </van-tab>

      </van-tabs>
      <!-- tab栏图标 -->
       <span class="bar_btn">
        <!-- 放入图标 vant图标 -->
         <van-icon @click="sheetShow=true " name='wap-nav'></van-icon>
      </span>
      <!-- 遮罩层 -->
      <van-popup v-model="popupShow">
        <!--  遮罩层内容组件 -->
        <popup @dislike='dislike' @inform='inform'></popup>
      </van-popup>
      <!-- 上菜菜单 频道列表 -->
      <van-action-sheet v-model="sheetShow" title="编辑频道" :actions="action" :round="false">
          <!-- 编辑频道的布局 -->
          <!-- 将频道列表的数组 传给子组件 -->
          <sheet @addChannel='addChannel' @delChannel='delChannel' :activeTab='tabIndex' @selectChannel='selectChannel' :channelList=channelList></sheet>
      </van-action-sheet>
  </div>
</template>

<script>
import Artic from '@/views/home/components/artic' // 引入tab选的子组件
import { getChannel, dislike, informArtic, delChannel, addChannel } from '@/api/artic'
import popup from '@/views/home/components/popup'
import Bus from '@/utils/eventbus'
import sheet from './components/sheet'
export default {
  data () {
    return {
      channelList: [], // 保存获取的频道类型的相关信息
      popupShow: false, // 遮罩层显示与否
      manageArtID: null, // 管理谋篇文章的id
      tabIndex: 0, // 当前激活的tab栏 激活下标
      sheetShow: false, // 上拉列表 是否显示
      action: [{
        name: '当前频道',
        color: 'red'
      }, {
        name: '所有频道',
        color: 'green'
      }]
    }
  },
  methods: {
    // 获取频道列表
    async getChannel () {
      const res = await getChannel() // res是获取到的频道对象
      console.log(res)
      this.channelList = res.channels
    },
    // 打开遮罩层
    openPopup (artid) {
      this.popupShow = true // 遮罩层状态
      this.manageArtID = artid
    },
    // 不感兴趣
    async dislike () {
      this.popupShow = false // 先关闭遮罩层
      try {
        await dislike(this.manageArtID) // 发送请求 不感兴趣文章
        // console.log(res)
        // 然后将 不感兴趣的文章 给删除(在文章列表页面)
        this.$Notify({
          type: 'success',
          message: '操作成功'
        })
        Bus.$emit('delArticLIst', this.manageArtID, this.channelList[this.tabIndex].id) // 当前文章id 和频道类型id
      } catch (error) {
        this.$Notify({
          message: '操作失败'
        })
      }
    },
    // 举报
    async inform (type) {
      this.popupShow = false // 遮罩层状态
      try {
        await informArtic(this.manageArtID, type)
        this.$Notify({
          type: 'success',
          message: '举报成功',
          background: 'blue',
          color: 'white'

        })
        Bus.$emit('delArticLIst', this.manageArtID, this.channelList[this.tabIndex].id) // 当前文章id 和频道类型id
      } catch (error) {
        this.$Notify({
          message: '举报失败'
        })
      }
    },
    // 切换频道
    selectChannel (id) {
      // alert(id)
      // 先关闭上拉菜单
      this.sheetShow = false
      // 然后跳转 选择的频道 tab栏
      // 获取当前激活的tab栏index
      const index = this.channelList.findIndex(item => item.id === id)
      // alert(index)
      this.tabIndex = index
    },
    // 删除频道
    async  delChannel (id) {
      try {
        // 先修改内存中的频道列表(删除选中的频道 在内存中也要删除)
        delChannel(id)
        this.sheetShow = false // 关闭下拉菜单
        // 获取要删除频道的索引
        // 如果删除的频道在当前激活频道的前面  激活的频道的索引 要往前挪动
        const index = this.channelList.findIndex(item => item.id === id)
        if (index <= this.tabIndex) {
          this.tabIndex--
          this.channelList.splice(index, 1)
        }
      } catch (error) {
        this.$Notify({
          message: error.message,
          type: 'danger'
        })
      }
    },
    // 添加频道
    async addChannel (item) {
      // this.sheetShow = false
      this.channelList.push(item)
      // 并将本地内存中的频道列表 添加数据
      addChannel(item)
    },
    // 手动切换频道
    changeTab () {
      // 获取当前频道的id
      const id = this.channelList[this.tabIndex].id
      Bus.$emit('changeTab', id)
    }
  },
  created () {
    // 调用获取频道的方法
    this.getChannel()
  },
  components: {
    articlist: Artic,
    popup,
    sheet
  }
}
</script>

<style scoped lang='less'>
// 频道列表的样式
.van-action-sheet {
  max-height: 100%;
  height: 100%;
  .van-action-sheet__header {
    background: #3296fa;
    color: #fff;
    .van-icon-close {
      color: #fff;
    }
  }
}
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
