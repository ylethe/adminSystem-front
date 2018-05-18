<template>
  <div>
    <el-table :data="lists">
      <el-table-column label="id" prop="id"></el-table-column>
      <el-table-column label="药品编号" prop="medicalNo"></el-table-column>
      <el-table-column label="药品名称" prop="name"></el-table-column>
      <el-table-column label="药品类型" prop="medicalType"></el-table-column>
      <el-table-column label="生产产家" prop="productor"></el-table-column>
      <el-table-column label="生产日期" prop="productionDate"></el-table-column>
      <el-table-column label="出库日期" prop="outDate"></el-table-column>
      <el-table-column label="出库数量" prop="outCount"></el-table-column>
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
  name: 'medical-list',
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
    getList () {
      this.$api.getOutList().then(res => {
        this.lists = res.data
        this.lists.forEach(v => {
          v.productionDate = v.productionDate.split('T')[0]
          v.outDate = v.outDate.split('T')[0]
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
