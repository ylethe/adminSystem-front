<template>
<div>
  <div class="search-content">
    <el-input class="search-content-item" v-model="search.name" placeholder="输入客户姓名" @keyup.enter.native="getList"></el-input>
    <el-input class="search-content-item" v-model="search.tel" placeholder="输入手机号码" @keyup.enter.native="getList"></el-input>
  </div>
  <el-table :data="lists">
    <el-table-column label="id" prop="id"></el-table-column>
    <el-table-column label="客户姓名" prop="name"></el-table-column>
    <el-table-column label="性别" prop="sex"></el-table-column>
    <el-table-column label="联系方式" prop="tel"></el-table-column>
    <el-table-column label="家庭住址" prop="address"></el-table-column>
    <el-table-column label="查看详情">
      <div slot-scope="scope">
        <router-link class="link" :to="`/customer/add?id=${scope.row.id}`">查看</router-link>
      </div>
    </el-table-column>
  </el-table>
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
  name: 'customer-list',
  data () {
    return {
      search: {
        name: '',
        tel: ''
      },
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
    getList () {
      this.$api.getCustomerList({
        search: this.search,
        pagination: this.pagination
      }).then(res => {
        console.log(this.search.name, this.search.tel)
        const arr = res.data.filter(v => {
          if (!this.search.name && !this.search.tel) {
            return v
          }
          if (!this.search.tel && this.search.name) {
            return v.name === this.search.name
          }
          if (this.search.tel && !this.search.name) {
            return v.tel === this.search.tel
          }
          return (v.name === this.search.name) && (v.tel === this.search.tel)
        })
        const result = this.$setPagination(arr, this.pagination)
        this.lists = result.list
        this.pagination.total = result.total
      })
    },
    handleSizeChange (val) {
      this.pagination.size = val
      this.getList()
    }
  }
}
</script>

<style lang="less" scope>
.search-content {
  display: flex;
  margin: 20px 0;
  &-item {
    width: 200px;
    margin-right: 14px;
  }
}
</style>
