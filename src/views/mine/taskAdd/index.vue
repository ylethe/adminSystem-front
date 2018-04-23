<template>
<div>
  <el-form label-position="left" label-width="60px" :mode="add">
    <el-form-item label="时间">
      <el-date-picker v-model="add.date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="任务">
      <el-input type="textarea" v-model="add.task"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary">添加</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
export default {
  name: 'add-task',
  data () {
    return {
      add: {
        date: '',
        task: ''
      }
    }
  },
  mounted () {
    console.log(111)
  }
}
</script>
