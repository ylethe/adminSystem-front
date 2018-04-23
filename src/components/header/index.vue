<template>
  <el-header class="header">
    <el-dropdown>
      <i class="el-icon-setting icon"></i>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item>退出登录</el-dropdown-item>
        <el-dropdown-item>修改密码</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
    <span>{{userName}}</span>
  </el-header>
</template>

<script>
export default {
  props: {
    userName: String
  },
  methods: {
    logout () {

    },
    modifyPassword () {

    }
  }
}
</script>

<style lang="less" scoped>
.header {
  width: 100%;
  text-align: right;
  background-color: #B3C0D1;
  line-height: 60px;
  .icon {
    margin-right: 15px;
  }
}
</style>
