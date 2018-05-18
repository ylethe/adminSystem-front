<template>
  <div>
    <el-form ref="form" :rules="rules" :model="add" class="form" label-position="left" label-width="120px">
      <el-form-item label="药品编号" prop="medicalNo">
        <el-input v-model="add.medicalNo"></el-input>
      </el-form-item>
      <el-form-item label="药品名称" prop="name">
        <el-input v-model="add.name"></el-input>
      </el-form-item>
      <el-form-item label="生产产家" prop="producotor">
        <el-input v-model="add.producotor"></el-input>
      </el-form-item>
      <el-form-item label="生产日期" prop="productionDate">
        <el-date-picker type="date" v-model="add.productionDate" value-format="yyyy-MM-dd"></el-date-picker>
      </el-form-item>
      <el-form-item label="药品类型" prop="medicalType">
        <el-input v-model="add.medicalType"></el-input>
      </el-form-item>
      <el-form-item label="入库数量" prop="count">
        <el-input v-model="add.count"></el-input>
      </el-form-item>
      <el-form-item label="备注">
        <el-input type="textarea" v-model="add.comment" rows="4"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">{{submitText}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'medical-add',
  data () {
    return {
      add: {
        name: '',
        medicalNo: '',
        producotor: '',
        productionDate: '',
        medicalType: null,
        count: null,
        comment: ''
      },
      rules: {
        name: [{required: true, message: '药品名称不能为空'}],
        medicalNo: [{required: true, message: '药品编号不能为空'}],
        producotor: [{required: true, message: '生产厂家不能为空'}],
        productionDate: [{required: true, message: '生产日期不能为空'}],
        medicalType: [{required: true, message: '药品类型不能为空'}],
        count: [{required: true, message: '入库数量不能为空'}]
      },
      submitText: '入库'
    }
  },
  mounted () {
    if (this.$route.query.id) {
      this.submitText = '保存'
      this.getMedical()
    } else {
      this.$nextTick(() => {
        this.$refs.form.clearValidate()
      })
    }
  },
  methods: {
    getMedical () {
      this.$api.getMedicalDetail({
        id: this.$route.query.id
      }).then(res => {
        this.add = res.data
        this.add.productionDate = res.data.productionDate.split('T')[0]
      })
    },
    submit () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$api.updateMedical(this.add).then(() => {
            this.$message({
              message: '请求成功',
              type: 'success'
            })
            this.$router.push('/medical/list')
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

<style>
.form {
  width: 400px;
}
</style>
