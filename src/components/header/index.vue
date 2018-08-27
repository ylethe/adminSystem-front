<template>
  <el-header class="header">
    <h1 class="title">药品存销后台管理系统</h1>
    <div class="right">
      <span>Hi~ {{userName}}</span>
      <el-dropdown>
        <i class="el-icon-arrow-down icon"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click.native="logout">退出登录</el-dropdown-item>
          <el-dropdown-item @click.native="modifyPassword">修改密码</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-dialog :visible.sync="visible" width="35%">
      <el-form ref="form" :model="postData" :rules="rules" label-width="100px">
        <el-form-item label="旧密码" prop="password">
          <el-input type="password" v-model="postData.password"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPassword">
          <el-input type="password" v-model="postData.newPassword"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="reNewpassword" required>
          <el-input type="password" v-model="postData.reNewpassword"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer">
        <el-button type="primary" @click="reset">重置</el-button>
        <el-button>取消</el-button>
      </div>
    </el-dialog>
  </el-header>
</template>

<script>
export default {
  props: {
    userName: String
  },
  data () {
    const validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请再次输入密码'))
      } else if (value !== this.postData.pass) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    return {
      postData: {
        password: '',
        newPassword: '',
        reNewPassword: ''
      },
      visible: false,
      rules: {
        password: [{required: true, message: '旧密码不能为空'}],
        newPassword: [{required: true, message: '新密码不能为空'}],
        reNewpassword: [{validator: validatePass, trigger: 'blur'}]
      }
    }
  },
  methods: {
    logout () {
      window.localStorage.removeItem('userInfo')
      this.$router.push('/login')
    },
    modifyPassword () {
      this.visible = true
    },
    reset () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$api.resetPassword(this.postData).then(() => {
            this.$message({
              message: '修改密码成功，　请重新登录',
              type: 'success'
            })
            this.visible = false
            this.$router.push('/login')
          }).catch((err) => {
            this.$message({
              message: err.msg,
              type: 'error'
            })
          })
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.header {
  position: fixed;
  top: 0;
  z-index: 999;
  width: 100%;
  background: #ffffff;
  box-shadow: 0 1px 3px 0 rgba(0,0,0,.08);
  line-height: 60px;
  .title {
    float: left;
    text-align: left;
    margin: 0;
    padding: 0;
    color: #007fff;
  }
  .icon {
    margin-right: 15px;
  }
  .right {
    float: right;
  }
}
</style>
