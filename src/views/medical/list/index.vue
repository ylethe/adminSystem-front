<template>
  <div>
    <el-table :data="lists">
      <el-table-column label="id" prop="id"></el-table-column>
      <el-table-column label="药品编号" prop="medicalNo"></el-table-column>
      <el-table-column label="药品名称" prop="name"></el-table-column>
      <el-table-column label="药品类型" prop="medicalType"></el-table-column>
      <el-table-column label="生产厂家" prop="producotor"></el-table-column>
      <el-table-column label="生产日期" prop="productionDate"></el-table-column>
      <el-table-column label="库存数量" prop="count"></el-table-column>
      <el-table-column label="销售情况" prop="outCount"></el-table-column>
      <el-table-column label="查看详情">
        <template slot-scope="scope">
          <router-link class="link" :to="`/medical/add?id=${scope.row.id}`">查看</router-link>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <span class="link" @click="medicalOut(scope.row)">出库</span>
          <span class="delete" @click="deleteMedical(scope.row.id)">删除</span>
        </template>
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
    <el-dialog title="药品出库" :visible.sync="dialogFormVisible" width="40%">
      <el-form :model="form" label-width="100px">
        <el-form-item label="id" >
          <span>{{form.id}}</span>
        </el-form-item>
        <el-form-item label="出库日期" >
          <el-input class="form-item__input" v-model="form.date" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="出库数量">
          <el-input class="form-item__input" v-model.number="form.count" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmOut">确 定</el-button>
      </div>
    </el-dialog>
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
      },
      form: {
        id: null,
        date: '',
        count: null
      },
      outData: {},
      dialogFormVisible: false
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    getList () {
      this.$api.getMedicalList().then(res => {
        let arr = res.data
        arr.forEach(v => {
          v.productionDate = v.productionDate.split('T')[0]
        })
        const result = this.$setPagination(arr, this.pagination)
        this.lists = result.list
        this.pagination.total = result.total
      })
    },
    medicalOut (data) {
      this.form.id = data.id
      this.outData = data
      this.dialogFormVisible = true
    },
    confirmOut () {
      if (!this.form.date) {
        this.$message({
          message: '请输入出库日期',
          type: 'error'
        })
        return
      }
      if (!this.form.count) {
        this.$message({
          message: '请输入出库数量',
          type: 'error'
        })
        return
      }
      if (this.outData.count - this.form.count < 0) {
        this.$message({
          message: '库存量不足',
          type: 'error'
        })
        return
      }
      this.$api.medicalOut({
        medicalId: this.outData.id,
        medicalNo: this.outData.medicalNo,
        name: this.outData.name,
        productor: this.outData.producotor,
        productionDate: this.outData.productionDate,
        medicalType: this.outData.medicalType,
        outDate: this.form.date,
        outCount: this.form.count,
        count: this.outData.count - this.form.count
      }).then(() => {
        this.$message({
          message: '药品出库成功',
          type: 'success'
        })
        this.getList()
        this.dialogFormVisible = false
      })
    },
    deleteMedical (id) {
      this.$api.deleteMedical({
        id
      }).then(() => {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        this.getList()
      })
    },
    handleSizeChange (val) {
      this.pagination.size = val
      this.getList()
    }
  }
}
</script>

<style scoped lang="less">
.form-item__input {
  width: 220px;
}
</style>
