/*
 * http请求封装
 */

import axios from 'axios'
import qs from 'qs'

// 设置默认域名
// axios.defaults.baseURL = 'http://localhost:3000'

// 设置请求超时时间为60s
axios.defaults.timeout = 60000

// 设置跨域头
axios.defaults.headers = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json;charset=utf-8'
}

// GET 请求 params 序列化
axios.defaults.paramsSerializer = function (params) {
  return qs.stringify(params)
}

// 请求拦截
axios.interceptors.response.use(res => {
  if (res.data.code === 0) {
    return Promise.resolve(res.data)
  } else {
    return Promise.reject(res.data)
  }
}, err => {
  return Promise.reject(err)
})

// get请求封装
const get = (url, params) => {
  return axios.get(url, { params })
}

// post请求封装
const post = (url, params) => {
  return axios.post(url, params)
}

export {
  get,
  post
}
