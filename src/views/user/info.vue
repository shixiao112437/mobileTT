<template>
   <div class="container">
    <van-nav-bar left-arrow @click-left="$router.back()" title="编辑资料" right-text="保存" @click-right="editInfo"></van-nav-bar>
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
      <van-cell is-link title="生日" :value="userData.birthday" @click="openBirth" />
    </van-cell-group>
     <!-- 弹层 -->
     <!-- 头像弹层时 -->
    <van-popup v-model="photoShow" style="width:80%">
      <!-- 文件上传 -->
      <van-uploader :after-read='editPhoto'>
       <van-cell is-link title="本地相册选择图片"></van-cell>
      </van-uploader>
       <van-cell is-link title="拍照"></van-cell>
    </van-popup>
    <!-- 名称弹层 -->
    <van-popup :close-on-click-overlay="false" v-model="nameShow" style="width:80%">
       <van-field v-model="userData.name" />
       <van-button @click="editName" block type="info" :loading="isloading" loading-size="保存中">确认</van-button>
    </van-popup>
    <!-- 性别上拉菜单 -->
    <!-- 点击选型时 触发选择性别的事件 -->
    <van-action-sheet @select="editGender" v-model="sexShow" :actions="action" title="性别选择" :round="false">
    </van-action-sheet>
    <!-- 生日弹层 -->
    <van-popup v-model="birthShow" position="bottom">
      <van-datetime-picker v-model="currentDate" type="date" @confirm='editBirth' :min-date='mindate' :max-date='maxdate'>

      </van-datetime-picker>
    </van-popup>

  </div>
</template>

<script>
import { getUserData, editInfo } from '@/api/user'
import dayjs from 'dayjs'
export default {
  data () {
    return {
      // 用户个人资料
      userData: {},
      action: [{ name: '男' }, { name: '女' }], // 上拉菜单的选项
      mindate: new Date(1920, 1, 1),
      maxdate: new Date(),
      currentDate: new Date(),
      // 弹层显示状态
      photoShow: false,
      nameShow: false,
      sexShow: false,
      birthShow: false,
      isloading: false
      // 要修改的新内容

    }
  },
  methods: {
    // 获取用户信息
    async getData () {
      const res = await getUserData()
      this.userData = res
    },
    // 修改昵称
    editName () {
      const newname = this.userData.name
      // 判断昵称的长度
      if (newname.length < 1 || newname.length > 7) {
        this.$Notify({
          message: '昵称必须为1-7位'
        })
      } else {
        this.nameShow = false
      }
    },
    // 修改性别
    editGender (item, index) {
      this.userData.gender = index
      this.sexShow = false // 关闭弹层
    },
    // 打开生日弹层
    openBirth () {
      this.birthShow = true
      this.currentDate = new Date(this.userData.birthday)
    },
    // 修改生日
    editBirth (value) {
      // console.log(value) value是当前选中的时间  但是时间的格式不对 需要用dayjs对其进行转换
      this.userData.birthday = dayjs(value).format('YYYY-MM-DD')
      this.birthShow = false
    },
    // 修改照片
    editPhoto (file, detail) {
      console.log(file)
      console.log(detail)
      this.userData.photo = file.content
      this.photoShow = false
    },
    // 保存资料
    async editInfo () {
      await editInfo({ ...this.userData, photo: null })
      this.$Notify({ type: 'success', message: '保存成功' })
    }

  },
  created () {
    this.getData()
  }
}
</script>

<style>

</style>
