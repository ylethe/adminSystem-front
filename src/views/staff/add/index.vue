<template>
  <el-form :model="add" :rules="rules" ref="form" class="form" label-position="left" label-width="120px">
    <el-form-item label="员工姓名" prop="userName">
      <el-input v-model="add.userName"></el-input>
    </el-form-item>
    <el-form-item label="性别" prop="sex">
      <el-select v-model="add.sex">
        <el-option label="男" value="男"></el-option>
        <el-option label="女" value="女"></el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="联系方式" prop="tel">
      <el-input v-model="add.tel"></el-input>
    </el-form-item>
    <el-form-item label="身份证号" prop="idCard">
      <el-input v-model="add.idCard"></el-input>
    </el-form-item>
    <el-form-item label="职务" prop="post">
      <el-input v-model="add.post"></el-input>
    </el-form-item>
    <el-form-item label="入职日期" prop="joinDate">
      <el-date-picker v-model="add.joinDate" type="date" value-format="yyyy-MM-dd" placeholder="选择日期">
      </el-date-picker>
    </el-form-item>
    <el-form-item label="备注">
      <el-input type="textarea" v-model="add.comment" rows="5"></el-input>
    </el-form-item>
    <el-form-item label="生活照">
      <el-upload
        class="upload-content"
        action="uploadLink"
        multiple
        :limit="limit"
        :on-success="uploadSuccess">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
      <div class="img-lists">
        <img :src="l" v-for="(l, index) in add.lifePhoto" :key="index"/>
      </div>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submit">{{submitText}}</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  name: 'customer-add',
  data () {
    return {
      add: {
        name: '',
        sex: '',
        tel: '',
        idCard: '',
        post: '',
        joinDate: '',
        comment: '',
        lifePhoto: []
      },
      submitText: '添加',
      uploadLink: '',
      limit: 5,
      rules: {
        userName: [
          {required: true, message: '姓名不能为空'}
        ],
        sex: [
          {required: true, message: '性别不能为空'}
        ],
        tel: [
          {required: true, message: '联系方式不能为空'}
        ],
        post: [
          {required: true, message: '职务不能为空'}
        ],
        idCard: [
          {required: true, message: '身份证不能为空'}
        ],
        joinDate: [
          {required: true, message: '请选择日期'}
        ]
      }
    }
  },
  mounted () {
    if (this.$route.query.id) {
      this.getStaffDetail()
      this.submitText = '保存'
    } else {
      this.$nextTick(() => {
        this.$refs.form.clearValidate()
      })
    }
  },
  methods: {
    getStaffDetail () {
      this.$api.getStaffDetail({
        id: this.$route.query.id
      }).then(res => {
        this.add = res.data
      }).catch(err => {
        this.$message({
          message: err.msg,
          type: 'error'
        })
      })
    },
    uploadSuccess (file) {
      console.log(file)
    },
    submit () {
      this.$api.updateStaffInfo(this.add).then(() => {
        this.$message({
          message: '请求成功',
          type: 'success'
        })
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
.form {
  width: 400px;
}
</style>
