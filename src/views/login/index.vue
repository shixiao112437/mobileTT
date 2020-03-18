<template>
  <div class="wrap">
    <!-- left-arrow表示有左侧箭头 -->

    <van-nav-bar title="登录" left-arrow border ></van-nav-bar>
    <!-- 登录表单 -->
    <van-form>
      <!-- van-cell-group可以提供边框 -->
      <van-cell-group>
        <!-- 手机号
        trim修饰符 双向绑定时去除空格
         -->
        <van-field :error-message="errMsg.tel" @blur="checkTel" v-model.trim="loginForm.phoneNum" type="tel" placeholder="请输入手机号" label="手机号" border required></van-field>
        <!-- 验证码 -->
        <van-field :error-message="errMsg.code" @blur="checkCode" v-model.trim="loginForm.authCode" label="验证码" required placeholder="请输入验证码">
          <!-- 验证码按钮 是一个插槽 -->
          <van-button type="primary" slot="button" size="small">获取验证码</van-button>
        </van-field>
        <div style="padding:16px;">
          <van-button @click="login" type="info" block round>登录</van-button>
        </div>
      </van-cell-group>
    </van-form>
  </div>
</template>

<script>
import { mapMutations } from 'vuex'
import * as user from '@/api/user'
export default {
  data () {
    return {
      // 登录账户密码
      loginForm: {
        phoneNum: '18404982990', // 登录手机号
        authCode: '246810' // 登录验证码
      },
      // 表单校验错误提示信息
      errMsg: {
        tel: '',
        code: ''
      }
    }
  },
  methods: {
  // 此方法用来校验手机号验证码格式 在输入框失去焦点是执行
    checkTel () {
      const num = this.loginForm.phoneNum
      if (!num) {
        // 说明没有输入手机号
        this.errMsg.tel = '手机号不能为空'
        return false
      }
      if (!/^1[3-9]\d{9}$/.test(num)) {
        // num不满足手机号的正则
        this.errMsg.tel = '手机号格式不正确'
        return false
      }
      this.errMsg.tel = ''
    },
    checkCode () {
      const code = this.loginForm.authCode
      if (!code) {
        // 说明没有输入验证码
        this.errMsg.code = '验证码不能为空'
        return false
      }
      if (!/^\d{6}$/.test(code)) {
        this.errMsg.code = '验证码为6位数字'
        return false
      }
      this.errMsg.code = ''
    },
    async login () {
      // 先手动校验表单
      this.checkTel()
      this.checkCode()
      if (!this.errMsg.tel && !this.errMsg.code) {
        // alert('校验通过')
        // 可以发送请求(调用封装好发送请求的的方法) 判断 密码是否正确
        // data 为登录请求的body参数
        const data = {
          mobile: this.loginForm.phoneNum,
          code: this.loginForm.authCode
        }
        // 请求成功进try
        // 请求失败 进catch
        try {
          const res = await user.login(data) // 异步代码 需要用await
          // console.log(res)
          // res 是登录成功后返回的token和refresh_token 需要用到vuex中共享token 的方法
          const payload = {
            user: res
          }
          this.updataToken(payload)
        } catch (error) {
          this.$Notify({
            message: `用户名或者验证码错误
请重新登录`,
            background: 'crimson',
            color: 'black'

          })
        }
      }
    },
    ...mapMutations(['updataToken'])
  }
}
</script>

<style>

</style>
