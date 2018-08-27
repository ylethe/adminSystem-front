<template>
  <el-aside width="200px">
    <el-menu default-active="1-1" class="aside-wrap" @select="handleSelect">
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>首页</template>
        <el-menu-item-group>
          <el-menu-item index="1-1">我的主页</el-menu-item>
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
      <el-submenu index="4">
        <template slot="title"><i class="el-icon-setting"></i>客户管理</template>
        <el-menu-item-group>
          <el-menu-item index="4-1">客户列表</el-menu-item>
          <el-menu-item index="4-2">客户添加</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
// 菜单索引对应的链接
const menuLinkType = {
  '1-1': '/me',
  '1-2': '/me/task/add',
  '2-1': '/medical/add',
  '2-2': '/medical/list',
  '2-3': '/medical/out',
  '3-1': '/staff/list',
  '3-2': '/staff/add',
  '4-1': '/customer/list',
  '4-2': '/customer/add'
}

export default {
  name: 'aaside',
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
  position: absolute;
  top: 80px;
  left: 10px;
  width: 200px;
  min-height: 80vh;
  color: #333;
}
</style>
