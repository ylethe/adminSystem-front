<template>
  <el-header class="header">
    <h1 class="title">药品存销后台管理系统</h1>
    <div class="right">
      <span>Hi~ {{userName}}</span>
      <el-dropdown>
        <i class="el-icon-arrow-down icon"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
          <el-dropdown-item @click="modifyPassword">修改密码</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-dialog>
      <el-form>
        <el-form-item label="旧密码">
          <el-input type="password" v-model="postData.password"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input type="password" v-model="postData.newPassword"></el-input>
        </el-form-item>
        <el-form-item label="再次输入新密码">
          <el-input type="password" v-model="postData.reNewpassword"></el-input>
        </el-form-item>
        <template slot="footer">
          <el-button type="primary">重置</el-button>
          <el-button>取消</el-button>
        </template>
      </el-form>
    </el-dialog>
  </el-header>
</template>

<script>
export default {
  props: {
    userName: String
  },
  data () {
    return {
      postData: {
        password: '',
        newPassword: '',
        reNewPassword: ''
      }
    }
  },
  methods: {
    logout () {
      window.localStorage.removeItem('userInfo')
      this.$router.push('/login')
    },
    modifyPassword () {

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
