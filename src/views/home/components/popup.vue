<template>
  <div class="more-action">
    <van-cell-group v-if="!isReport">
      <van-cell @click="$emit('dislike')">不感兴趣</van-cell>
      <van-cell is-link @click="isReport=true">反馈垃圾内容</van-cell>
      <van-cell>拉黑作者</van-cell>
    </van-cell-group>
    <van-cell-group v-else>
      <van-cell icon="arrow-left" @click="isReport=false">返回</van-cell>
      <van-cell @click="$emit('inform',item.value)"  v-for="item in reports" :key="item.value" >{{item.label}}</van-cell>
    </van-cell-group>
  </div>
</template>

<script>
import Bus from '@/utils/eventbus'
export default {
  data () {
    return {
      isReport: false,
      reports: [{
        value: 0,
        label: '其他问题'
      }, {
        value: 1,
        label: '标题夸张'
      }, {
        value: 2,
        label: '低俗色情'
      }, {
        value: 3,
        label: '错别字多'
      }, {
        value: 4,
        label: '旧闻重复'
      }, {
        value: 5,
        label: '广告软文'
      }, {
        value: 6,
        label: '内容不实'
      }, {
        value: 7,
        label: '涉嫌违法犯罪'
      }, {
        value: 8,
        label: '侵权'
      }]

    }
  },
  created () {
    Bus.$on('delArticLIst', () => (this.isReport = false)) //
  }
}
</script>

<style lang='less' scoped>
.more-action {
  border-radius: 4px;
}
</style>
