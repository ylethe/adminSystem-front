<template>
<div class="task-form">
  <el-form label-position="left" label-width="60px" ref="taskForm" :model="add" :rules="rules">
    <el-form-item label="时间" prop="date">
      <el-date-picker v-model="add.date" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" value-format="yyyy-MM-dd">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="标题" prop="title">
      <el-input v-model="add.title"></el-input>
    </el-form-item>
    <el-form-item label="任务" prop="content">
      <el-input type="textarea" v-model="add.content" rows="7"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="addTask">添加</el-button>
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
        title: '',
        content: ''
      },
      userInfo: {},
      rules: {
        date: [
          {required: true, message: '请选择时间'}
        ],
        title: [
          {required: true, message: '请选择时间'}
        ],
        content: [
          {required: true, message: '请选择时间'}
        ]
      }
    }
  },
  mounted () {
    const userInfo = window.localStorage.getItem('userInfo')

    this.userInfo = JSON.parse(userInfo)
    this.$nextTick(() => {
      this.$refs.taskForm.clearValidate()
    })
  },
  methods: {
    addTask () {
      this.$refs.taskForm.validate(valid => {
        if (valid) {
          this.add.startDate = this.add.date[0]
          this.add.endDate = this.add.date[1]
          this.add.userId = this.userInfo.userId
          this.$api.addTask(this.add).then(res => {
            this.$message({
              message: '添加任务成功，可往任务列表查看',
              type: 'success'
            })
          }).catch(err => {
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
.task-form {
  width: 600px;
  margin: 30px;
}
</style>
