<template>
  <el-container>
    <header-bar :userName="userInfo.userName"></header-bar>
    <el-container class="main-container">
      <aside-bar></aside-bar>

      <el-main class="content">
        <div class="operation">
          <h2 class="title"><i class="el-icon-star-on title-icon"></i>{{$route.name}}</h2>
        </div>
        <div class="operation">
          <router-view/>
        </div>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import AsideBar from 'components/aside'
import HeaderBar from 'components/header'

export default {
  data () {
    return {
      userInfo: {}
    }
  },
  created () {
    const userInfo = window.localStorage.getItem('userInfo')

    if (userInfo) {
      this.userInfo = JSON.parse(userInfo)
    } else {
      this.$message({
        message: '你没有登录哦',
        type: 'error'
      })
      setTimeout(() => {
        this.$router.push('/login')
      }, 1000)
    }
  },
  methods: {

  },
  components: {
    AsideBar,
    HeaderBar
  }
}
</script>

<style lang="less" scoped>
.main-container {
  min-height: 100vh;
  background: #f4f5f5;
}
.content {
  padding: 65px 20px 20px;
}
.title {
  font-size: 18px;
  font-weight: 500;
  &-icon {
    margin-right: 10px;
    color: gold;
  }
}
</style>
