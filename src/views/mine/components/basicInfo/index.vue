<template>
  <ul class="basic-info">
    <li class="item">
      <span class="title">头像</span>
      <div class="avatar-content">
        <img class="avatar" :src="formData.lifePhoto" alt="" v-if="formData.lifePhoto"/>
        <el-upload
          class="upload-content"
          :action="uploadLink"
          :show-file-list="false"
          :on-success="uploadSuccess"
          accept="image/png, image/jpeg">
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          <el-button size="small" type="primary">点击上传</el-button>
        </el-upload>
      </div>
    </li>
    <li class="item">
      <span class="title">姓名</span>
      <input type="text" class="input" placeholder="请填写姓名" v-model="formData.userName" @focus="showNameIcon = true" @blur="showNameIcon = false"/>
      <i class="el-icon-edit editor-icon" v-show="showNameIcon"></i>
    </li>
    <li class="item">
      <span class="title">性别</span>
      <input type="text" class="input" placeholder="请填写性别" v-model="formData.sex" @focus="showSexIcon = true" @blur="showSexIcon = false"/>
      <i class="el-icon-edit editor-icon" v-show="showSexIcon"></i>
    </li>
    <li class="item">
      <span class="title">联系方式</span>
      <input type="text" class="input" placeholder="请填写联系方式" v-model="formData.tel" @focus="showTelIcon = true" @blur="showTelIcon = false"/>
      <i class="el-icon-edit editor-icon" v-show="showTelIcon"></i>
    </li>
    <li class="item">
      <span class="title">职业</span>
      <input type="text" class="input" placeholder="请填写职业" v-model="formData.occupation" @focus="showOccupationIcon = true" @blur="showOccupationIcon = false"/>
      <i class="el-icon-edit editor-icon" v-show="showOccupationIcon"></i>
    </li>
    <li class="item">
      <span class="title">个人介绍</span>
      <input type="text" class="input" placeholder="请填写个人介绍" v-model="formData.comment" @focus="showIntroduceIcon = true" @blur="showIntroduceIcon = false"/>
      <i class="el-icon-edit editor-icon" v-show="showIntroduceIcon"></i>
    </li>
    <li class="submit">
      <el-button type="primary" @click="conserve">保存修改</el-button>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'basic-info',
  data () {
    return {
      formData: {
        lifePhoto: 'http://oia85104s.bkt.clouddn.com/head-pic.jpeg',
        userName: '木易',
        sex: '女',
        tel: '18716037958',
        occupation: '前端开发工程师',
        comment: '爱打游戏，吃鸡农药都行；喜欢夜跑，吃饭一定要吃辣'
      },
      userInfo: {},
      uploadLink: '',
      showNameIcon: false,
      showSexIcon: false,
      showTelIcon: false,
      showOccupationIcon: false,
      showIntroduceIcon: false
    }
  },
  mounted () {
    const userInfo = window.localStorage.getItem('userInfo')
    this.userInfo = JSON.parse(userInfo)
    this.getUserInfo()
  },
  methods: {
    uploadSuccess (file) {
      console.log(file)
    },
    getUserInfo () {
      this.$api.getStaffDetail({
        id: this.userInfo.userId
      }).then(res => {
        console.log(res.data)
      }).catch(err => {
        this.$message({
          message: err.msg,
          type: 'error'
        })
      })
    },
    conserve () {
      if (!this.userInfo.userName) {
        this.$message({
          message: '姓名为必填项哦',
          type: 'warning'
        })
        return
      }
      console.log(this.userInfo)
    }
  }
}
</script>

<style lang="less" scoped>
.basic-info {
  padding: 20px 0;
  .item {
    display: flex;
    align-items: center;
    padding: 10px;
    border-bottom: 1px solid #f1f1f1;
    .title {
      font-size: 14px;
      color: #333;
      width: 100px;
    }
    .avatar-content {
      display: flex;
      align-items: center;
      .avatar {
        margin-right: 20px;
        width: 100px;
        height: 100px;
      }
    }
    .input {
      width: 500px;
      color: #909090;
      font-size: 14px;
      border: none;
      outline: none;
      line-height: 40px;
    }
    .editor-icon {
      margin-left: 10px;
      color: #007fff;
    }
  }
  .submit {
    margin-top: 16px;
  }
}
</style>
