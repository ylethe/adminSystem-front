<template>
<div class="login">
  <div class="login-items">
    <h1>药品存销管理系统</h1>
    <div class="form-item">
      <input type="text" placeholder="用户名" v-model="userInfo.userName"/>
    </div>
    <div class="form-item">
      <input type="password" placeholder="密码" v-model="userInfo.password"/>
    </div>
    <div class="form-item">
      <button @click="login">登&nbsp;&nbsp;录</button>
    </div>
    <div class="form-item">
      <div class="checkbox">
        <label><input type="checkbox" value="1" checked=""/> 记住密码</label>
      </div>
      <div class="forgetPass">忘记密码</div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data () {
    return {
      userInfo: {
        userName: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      if (!this.userInfo.userName) {
        this.$message({
          message: '请输入用户名',
          type: 'warning'
        })
        return
      }
      if (!this.userInfo.password) {
        this.$message({
          message: '请输入密码',
          type: 'warning'
        })
        return
      }
      this.$api.login(this.userInfo).then(res => {
        this.$message({
          message: res.msg,
          type: 'success'
        })
        window.localStorage.setItem('userInfo', JSON.stringify(res.data))
        this.$router.push('/me')
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
.login {
  width:100vw;
  height:100vh;
  overflow:hidden;
  background:url(./img/background.jpg) no-repeat;
  background-size:100%;
}
.login-items{
  width: 400px;
  height: 400px;
  margin: 150px auto 0;
}
.form-item{
  width: 380px;
  height:50px;
  margin: 10px auto;
  color: #fff;
}
.login-items h1{
  margin-bottom: 20px;
  color: #fff;
  text-align: center;
}
.form-item input{
  box-sizing: border-box;
  width: 350px;
  height: 40px;
  border: 1px solid #fff;
  border-radius: 12px;
  padding-left: 10px;
  outline: none;
  color: #fff;
  background-color:rgba(0,0,0,0);
}
input::-webkit-input-placeholder{
  color: #fff;
}
.form-item button{
  width: 350px;
  height: 40px;
  border: 1px solid #fff;
  border-radius: 12px;
  background: #fff;
  color: #33A1C9;
  font-size: 20px;
  outline: none;
}
.checkbox{
  width: 120px;
  height: 15px;
  line-height: 15px;
  font-size: 13px;
  float:left;
  text-align: center;
}
.checkbox input[type=checkbox]{
  width: 15px;
  height: 15px;
  vertical-align:text-bottom;
  -webkit-appearance: none;
  appearance: none;
  border-radius: 1px;
  cursor: pointer;
}
input[type=checkbox]:checked{
  border:none;
  background: url(./img/checkbox.png) no-repeat;
}
.forgetPass{
  width: 105px;
  height: 15px;
  font-size: 13px;
  float: right;
  text-align: left;
  cursor: pointer;
}
</style>
