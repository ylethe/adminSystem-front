<template>
  <div class="login">
    <el-form>
      <el-form-item>
        <el-input placeholder="用户名" v-model="name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input placeholder="密码" v-model="password"></el-input>
      </el-form-item>
    </el-form>
    <el-button>登录</el-button>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      password: ''
    }
  },
  methods: {
    login () {
      console.log('登录')
    }
  }
}
</script>
