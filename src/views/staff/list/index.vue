<template>
<div>
  <div class="search-content"></div>
  <!-- 列表 -->
  <el-table :data="lists">
    <el-table-column label="id" prop="id"></el-table-column>
    <el-table-column label="员工姓名" prop="userName"></el-table-column>
    <el-table-column label="性别" prop="sex"></el-table-column>
    <el-table-column label="身份证号" prop="idCard"></el-table-column>
    <el-table-column label="联系电话" prop="tel"></el-table-column>
    <el-table-column label="入职日期" prop="joinDate"></el-table-column>
    <el-table-column label="职务" prop="post"></el-table-column>
    <el-table-column label="查看详情">
      <template slot-scope="scope">
        <router-link class="link" :to="`/staff/add?id=${scope.row.id}`">查看</router-link>
      </template>
    </el-table-column>
    <el-table-column label="操作" width="180px">
      <template slot-scope="scope">
        <span class="link" @click="setAdmin(scope.row.id)">设为管理员</span>
        <span class="delete" @click="deleteStaff(scope.row.id)">删除</span>
      </template>
    </el-table-column>
  </el-table>
  <!-- 分页 -->
  <el-pagination
    class="pagination"
    @size-change="handleSizeChange"
    @current-change="getList"
    :current-page.sync="pagination.current"
    :page-sizes="[10, 20, 30, 40]"
    :page-size="pagination.size"
    layout="total, sizes, prev, pager, next, jumper"
    :total="pagination.total">
  </el-pagination>
</div>
</template>

<script>
export default {
  name: 'staff-list',
  data () {
    return {
      lists: [],
      pagination: {
        current: 1,
        size: 10,
        total: 0
      }
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    // 获取员工列表
    getList () {
      this.$api.getStaffList().then(res => {
        let arr = res.data
        arr.forEach(v => {
          v.joinDate = v.joinDate.split('T')[0]
        })
        const result = this.$setPagination(arr, this.pagination)
        this.lists = result.list
        this.pagination.total = result.total
      }).catch(err => {
        console.log(err)
      })
    },
    // 设为管理员
    setAdmin (id) {
      this.$api.setAdmin({
        id
      }).then(() => {
        this.$message({
          message: '设为管理员成功',
          type: 'success'
        })
      }).catch(err => {
        this.$message({
          message: err.msg,
          type: 'error'
        })
      })
    },
    // 删除员工
    deleteStaff (id) {
      this.$api.deleteStaff({
        id
      }).then(() => {
        this.$message({
          message: '删除员工成功',
          type: 'success'
        })
      }).catch(err => {
        this.$message({
          message: err.msg,
          type: 'error'
        })
      })
    },
    handleSizeChange (val) {
      this.pagination.size = val
      this.getList()
    }
  }
}
</script>
<style scoped lang="less"></style>
