<template>
   <div class="container">
    <van-nav-bar left-arrow @click-left="$router.back()" title="编辑资料" right-text="保存" ></van-nav-bar>
    <van-cell-group>
      <van-cell is-link title="头像"  center>
        <van-image
        @click="photoShow=true"
          slot="default"
          width="1.5rem"
          height="1.5rem"
          fit="cover"
          round
          :src="userData.photo"
        />
      </van-cell>
      <van-cell is-link title="名称" :value="userData.name" @click="nameShow=true" />
      <van-cell is-link title="性别" :value="userData.gender?'女':'男'" @click="sexShow=true"/>
      <van-cell is-link title="生日" :value="userData.birthdy" @click="birthShow=true" />
    </van-cell-group>
     <!-- 弹层 -->
     <!-- 头像弹层时 -->
    <van-popup v-model="photoShow" style="width:80%">
       <van-cell is-link title="本地相册选择图片"></van-cell>
       <van-cell is-link title="拍照"></van-cell>
    </van-popup>
    <!-- 名称弹层 -->
    <van-popup v-model="nameShow" style="width:80%">
       <van-field placeholder="请输入用户名" />
       <van-button  block type="info" loading loading-size="保存中">确认</van-button>
    </van-popup>
    <!-- 性别上拉菜单 -->
    <van-action-sheet v-model="sexShow" :actions="action">
    </van-action-sheet>
    <!-- 生日弹层 -->
    <van-popup v-model="birthShow" position="bottom">
      <van-datetime-picker type="date">

      </van-datetime-picker>
    </van-popup>
  </div>
</template>

<script>
import { getUserData } from '@/api/user'
export default {
  data () {
    return {
      // 用户个人资料
      userData: {},
      action: [],
      // 弹层显示状态
      photoShow: false,
      nameShow: false,
      sexShow: false,
      birthShow: false
      // 表单内容

    }
  },
  methods: {
    async getData () {
      const res = await getUserData()
      this.userData = res
    }
  },
  created () {
    this.getData()
  }
}
</script>

<style>

</style>
