<template>
  <el-container>
    <aside-bar></aside-bar>
    <el-container class="main-container">
      <header-bar></header-bar>
      <el-main>
        <router-view/>
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
      userName: ''
    }
  },
  created () {
    const userInfo = window.localStorage.getItem('userInfo')
    if (userInfo) {
      this.setUserInfo(JSON.parse(userInfo))
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
  flex-direction: column;
}
</style>
