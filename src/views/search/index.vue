<template>
  <div class="container">
    <!-- 搜索组件一级路由   返回上一个页面-->
    <van-nav-bar left-arrow title="搜索中心" @click-left="$router.back()"></van-nav-bar>
    <!-- 导航 -->
    <!-- 搜索框 -->
    <van-search @search='onSearch' show-action v-model.trim="q" placeholder="请输入搜索关键词" shape="round">
      <!-- 搜索按钮 -->
      <template #action>
        <div @click="onSearch">搜索</div>
      </template>
    </van-search>
    <!-- 联想提示 -->
    <van-cell-group v-if="q" class="suggest-box">
      <van-cell @click="clickTip(item)" icon="search" v-for="(item,index) in tipList" :key="index">
        <span>{{item}}</span>
      </van-cell>
    </van-cell-group>
    <!-- 历史记录 -->
    <div class="history-box">
      <div class="head">
        <span>历史记录</span>
        <van-icon @click="clearHistory" name="delete"></van-icon>
      </div>
      <van-cell-group>
        <van-cell @click="clickHistory(item)" v-for="(item,index) in histortList" :key="index">
          <a class="word_btn">{{item}}</a>
          <van-icon @click.stop="delHistort(index)" class="close_btn" slot="right-icon" name="cross" />
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<script>

import { getTipList } from '@/api/artic' // 引入获取提示文字的方法
const key = 'searchHistory'// 内存历史记录变量名
export default {
  data () {
    return {
      q: '', // 输入框的内容
      histortList: JSON.parse(window.localStorage.getItem(key)) || [], // 历史记录列表 如果缓存中有存的历史记录就获取 如果没有 是一个空数组
      tipList: [] // 提示文本列表
    }
  },
  methods: {
    // 搜索  并添加历史记录
    onSearch () {
      if (!this.q) return false // 没内容不执行任何操作 退出函数
      // 如果有内容 需要 跳转到搜索结果 的界面
      // 并将 搜索框的内容 传递给搜索结果的路由  使用query 传参 不用修改路由地址
      this.$router.push({
        path: '/result',
        query: {
          q: this.q
        }
      })
      // 在搜索的内容添加在历史记录的列表中
      this.histortList.unshift(this.q)
      // 去重 new Set(数组) ==> 返回一个没有重复内容的类数组
      //  需要再用 Array.from() => 将伪数组或类数组 转换成真数组
      // 重新赋值给历史记录列表
      this.histortList = Array.from(new Set(this.histortList))
      // 设置缓存中的历史记录
      window.localStorage.setItem(key, JSON.stringify(this.histortList))
    },
    // 删除历史记录
    delHistort (index) {
      this.histortList.splice(index, 1)
      // 并将缓存中的记录重新赋值
      window.localStorage.setItem(key, JSON.stringify(this.histortList))
    },
    // 清空历史记录
    clearHistory () {
      this.histortList = []
      window.localStorage.setItem(key, JSON.stringify([]))
    },
    // 点击历史记录
    clickHistory (item) {
      this.q = item
      this.onSearch()
    },
    // 点击提示文字
    clickTip (item) {
      this.q = item
      this.onSearch()
    }
  },
  watch: {
    // 监听搜索内容的变化 如果发生变化
    /* 防抖监听
     q () {
      clearTimeout(this.timer) // 先关闭上一个定时器
      // 开启开启定时器
      this.timer = setTimeout(async () => {
        if (this.q) {
          const res = await getTipList(this.q)
          this.tipList = res.options
        } else {
          this.tipList = []
        }
      }, 300)
    }
     */
    /*
    节流监听
     */
    q () {
      // 先判断有没有定时器 如果没有 就开启一个
      if (!this.timer) {
        this.timer = setTimeout(async () => {
          if (this.q) {
            const res = await getTipList(this.q)
            this.tipList = res.options
          } else {
            this.tipList = []
          }
          this.timer = null
        }, 500)
      }
    }
  }
}
</script>

<style lang='less' scoped>
.history-box {
  padding: 0 20px;
  .head {
    line-height: 36px;
    color: #999;
    .van-icon {
      font-size: 16px;
      float: right;
      margin-top: 10px;
    }
  }
  .van-cell {
    padding: 10px 0;
  }
  .word_btn {
    color: #3296fa;
  }
  .close_btn {
    margin-top: 5px;
    color: #999;
  }
}
.suggest-box {
  /deep/ .van-cell {
    padding: 10px 20px;
    color: #999;
    p {
      span {
        color: red;
      }
    }
  }
}
</style>
