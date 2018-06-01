<template>
  <div>
    <el-card v-for="l in tasks" :key="l.id" class="list">
      <div slot="header" class="task-header">
        <h2>{{l.title}}</h2>
        <div>
          <span v-if="!l.isComplete" key="unComplete" class="link" @click="complete(l.id)">完成</span>
          <span v-else key="complete">已完成 <i class="el-icon-success icon"></i></span>
          <span class="delete" @click="deleteTask(l.id)">删除</span>
        </div>
      </div>
      <p class="time">时间：{{l.startDate}} ~ {{l.endDate}}</p>
      <p>{{l.content}}</p>
    </el-card>
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="getTasks"
      :current-page.sync="pagination.current"
      :page-size="5"
      layout="prev, pager, next, jumper"
      :total="pagination.total">
    </el-pagination>
  </div>
</template>

<script>
// import lists from './config'
export default {
  name: 'task-list',
  data () {
    return {
      tasks: [],
      userInfo: {},
      pagination: {
        current: 1,
        size: 5,
        total: 0
      }
    }
  },
  mounted () {
    const userInfo = window.localStorage.getItem('userInfo')
    this.userInfo = JSON.parse(userInfo)
    this.getTasks()
  },
  methods: {
    getTasks () {
      this.$api.getTask({
        userId: this.userInfo.userId
      }).then(res => {
        let arr = res.data
        arr.forEach(v => {
          v.startDate = v.startDate.split('T')[0]
          v.endDate = v.endDate.split('T')[0]
        })
        const result = this.$setPagination(arr, this.pagination)
        this.tasks = result.list
        this.pagination.total = result.total
      }).catch(err => {
        this.$message({
          message: err.msg,
          type: 'error'
        })
      })
    },
    handleSizeChange (val) {
      console.log(val)
    },
    complete (id) {
      this.$api.completeTask({
        id
      }).then(() => {
        this.getTasks()
      }).catch(err => {
        this.$message({
          message: err.msg,
          type: 'error'
        })
      })
    },
    deleteTask (id) {
      this.$api.deleteTask({
        id
      }).then(() => {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.getTasks()
      }).catch(err => {
        this.$message({
          message: err.msg,
          type: 'error'
        })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.list {
  margin: 10px 0;
}
.task-header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .delete {
    margin-left: 10px;
    color: red;
  }
  .icon {
    color: green;
    background: #ffffff;
  }
}
.time {
  margin-bottom: 5px;
  color: #666666;
  font-size: 14px;
}
</style>
