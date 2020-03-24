<template>
  <div class="channel-edit">
    <div class="channel">
      <div class="tit">
        我的频道：
        <span class="tip">点击可进入频道</span>
        <van-button v-if="!editing" @click="editing=true" size="mini" type="info" plain>编辑</van-button>
        <van-button v-else @click="editing=false" size="mini" type="danger" plain>完成</van-button>
      </div>
      <van-grid class="van-hairline--left">
        <van-grid-item @click="$emit('selectChannel',item.id)" v-for="(item,index) in channelList" :key="index">
          <span :class="{red:index===activeTab}" class="f12">{{item.name}}</span>
          <!-- 删除频道 -->
          <van-icon @click.stop="$emit('delChannel',item.id) " class="btn" name="cross" v-if="editing"></van-icon>
        </van-grid-item>
      </van-grid>
    </div>
    <div class="channel">
      <div class="tit">可选频道：</div>
      <van-grid class="van-hairline--left">
          <!-- 可选频道 的渲染 现获取 在筛选出与我的频道的差值数组  -->
        <van-grid-item v-for="(item,index) in choiceChannel" :key="index">
          <span class="f12">{{item.name}}</span>
          <!-- 添加频道 -->
          <van-icon @click="$emit('addChannel',item)" class="btn" name="plus"></van-icon>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import { getAllChannel } from '@/api/artic'
export default {
  props: {
    //   频道列表 数组
    channelList: {
      required: true,
      type: Array,
      default: () => [] // 返回一个空数组 // 对象或数组的默认值必须从一个工厂函数返回。
    },
    activeTab: {
      required: true,
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      editing: false, // 频道编辑/完成
      allChannel: []

    }
  },
  methods: {
    //   获取所有频道
    async getChoiceChannel () {
      // 引入调用获取所有频道的方法
      const res = await getAllChannel() // res 是所有的频带类型
      /*     //   筛选
      const data = res.channels.filter(item => !this.channelList.some(i => i.id === item.id))
      this.choiceChannel = data */
      this.allChannel = res.channels
    }
  },
  created () {
    this.getChoiceChannel()
  },
  computed: {
    choiceChannel () {
      return this.allChannel.filter(item => !this.channelList.some(i => i.id === item.id))
    }
  }
}
</script>

<style lang='less' scoped>
.channel-edit {
  .channel {
    padding: 10px;
    .tit {
      line-height: 3;
      .tip {
        font-size: 10px;
        color: #999;
      }
    }
    .van-button {
      float: right;
      margin-top: 7px;
    }
    .btn {
      position: absolute;
      bottom: 0;
      right: 0;
      background: #ddd;
      font-size: 12px;
      color: #fff;
    }
    .f12 {
      font-size: 12px;
      color: #555;
    }
    .red {
      color: red;
    }
  }
}
</style>
