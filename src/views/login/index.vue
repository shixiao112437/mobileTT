<template>
  <div class="wrap">
    <!-- left-arrow表示有左侧箭头 -->
    <van-nav-bar title="登录"
    left-arrow
    border
    @click-left='back'
    ></van-nav-bar>
    <!-- 登录表单 -->
    <van-form>
      <!-- 手机号 -->
      <van-field v-model="phoneNum"
      type="tel"
      placeholder="请输入手机号"
      label="手机号"
      border
      required
      >
      </van-field>
      <!-- 验证码 -->
      <van-field v-model="authCode"
      label="验证码"
      required
      placeholder="请输入验证码"
      >
      <!-- 验证码按钮 是一个插槽 -->
      <van-button type="primary" slot="button" size="small">获取验证码</van-button>

      </van-field>
     <div style="padding:16px;">
        <van-button type="info"
      block
      round
      >登录</van-button>
     </div>
    </van-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      authCode: '',
      phoneNum: ''
    }
  },
  methods: {
    back () {
      alert('返回')
    }
  }
}
</script>

<style>

</style>
