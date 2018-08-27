<template>
<div>
  <el-tabs v-model="activeName">
    <el-tab-pane label="基本信息" name="1">
      <basic-info></basic-info>
    </el-tab-pane>
    <el-tab-pane label="任务列表" name="2">
      <task-list></task-list>
    </el-tab-pane>
  </el-tabs>
</div>
</template>

<script>
import TaskList from './components/taskList'
import BasicInfo from './components/basicInfo'

export default {
  data () {
    return {
      activeName: '1'
    }
  },
  components: {
    TaskList,
    BasicInfo
  }
}
</script>

<style lang="less" scoped>
</style>
