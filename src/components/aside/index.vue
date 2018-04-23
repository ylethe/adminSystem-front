<template>
  <el-aside width="200px">
    <el-menu :default-openeds="['1']" class="aside-wrap" @select="handleSelect">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>首页</template>
        <el-menu-item-group>
          <el-menu-item index="1-1">我的</el-menu-item>
          <el-menu-item index="1-2">任务添加</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-menu"></i>药品</template>
        <el-menu-item-group>
          <el-menu-item index="2-1">药品入库</el-menu-item>
          <el-menu-item index="2-2">药品库存列表</el-menu-item>
          <el-menu-item index="2-3">药品出库列表</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-setting"></i>员工管理</template>
        <el-menu-item-group>
          <el-menu-item index="3-1">员工列表</el-menu-item>
          <el-menu-item index="3-2">员工入职</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
// 菜单索引对应的链接
const menuLinkType = {
  '1-1': '/',
  '1-2': '/task/add',
  '2-1': '/medical/add',
  '2-2': '/medical/list',
  '2-3': '/medical/out',
  '3-1': '/user/list',
  '3-2': '/user/add'
}

export default {
  methods: {
    handleSelect (key) {
      this.$router.push({
        path: menuLinkType[key]
      })
    }
  }
}
</script>

<style>
.aside-wrap {
  height: 100vh;
  color: #333;
}
</style>
