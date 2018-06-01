<template>
  <el-form :model="add" :rules="rules" ref="form" class="form" label-position="left" label-width="120px">
    <el-form-item label="客户姓名" prop="name">
      <el-input v-model="add.name"></el-input>
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
    <el-form-item label="家庭住址" prop="address">
      <el-input v-model="add.address"></el-input>
    </el-form-item>
    <el-form-item label="生日">
      <el-date-picker type="date" v-model="add.birthday" placeholder="选择日期" value-format="yyyy-MM-dd"></el-date-picker>
    </el-form-item>
    <el-form-item label="备注">
      <el-input type="textarea" v-model="add.comment" rows="5"></el-input>
    </el-form-item>
    <el-form-item label="生活照">
      <el-upload
        class="upload-content"
        action="uploadLink"
        :http-request=upqiniu
        multiple
        :limit="limit"
        :on-success="uploadSuccess">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
      <div class="img-lists">
        <img :src="add.lifePhoto"/>
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
        address: '',
        birthday: '',
        comment: '',
        lifePhoto: ''
      },
      submitText: '添加',
      uploadLink: 'https://upload-z1.qiniup.com',
      qiniuaddr: 'oia85104s.bkt.clouddn.com',
      limit: 1,
      rules: {
        name: [
          {required: true, message: '姓名不能为空'}
        ],
        sex: [
          {required: true, message: '性别不能为空'}
        ],
        tel: [
          {required: true, message: '联系方式不能为空'}
        ],
        address: [
          {required: true, message: '家庭住址不能为空'}
        ]
      }
    }
  },
  mounted () {
    if (this.$route.query.id) {
      this.submitText = '保存'
      this.getDetail()
    } else {
      this.$nextTick(() => {
        this.$refs.form.clearValidate()
      })
    }
  },
  methods: {
    getDetail () {
      this.$api.getCustomerDetail({
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
      this.$refs.form.validate(valid => {
        if (valid) {
          this.$api.updateCustomer(this.add).then(() => {
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
      })
    },
    upqiniu (req) {
      console.log(req)
      const config = {
        headers: {'Content-Type': 'multipart/form-data'}
      }
      let filetype = ''
      if (req.file.type === 'image/png') {
        filetype = 'png'
      } else {
        filetype = 'jpg'
      }
      // 重命名要上传的文件
      const keyname = 'lethe' + Math.floor(Math.random() * 100) + '.' + filetype
      // 从后端获取上传凭证token
      this.$api.token().then(res => {
        console.log(res)
        const formdata = new FormData()
        formdata.append('file', req.file)
        formdata.append('token', res.data)
        formdata.append('key', keyname)
        // 获取到凭证之后再将文件上传到七牛云空间
        this.$api.upload(formdata, config).then(res => {
          const imgUrl = 'http://' + this.qiniuaddr + '/' + res.key
          console.log(imgUrl, 111)
        }).catch(err => {
          console.log(err, 333)
          const imgUrl = 'http://' + this.qiniuaddr + '/' + err.key
          this.formData.lifePhoto = imgUrl
        })
      }).catch(err => {
        console.log(err, 222)
      })
    }
  }
}
</script>

<style lang="less" scoped>
.form {
  width: 700px;
}
</style>
