/*
 * http请求封装
 */

import axios from 'axios'
import qs from 'qs'

axios.defaults.baseURL = '//api.ylethe.cn'

axios.defaults.timeout = 60000

// 设置跨域头
axios.defaults.headers = {
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/x-www-form-urlencoded'
}

// GET 请求 params 序列化
axios.defaults.paramsSerializer = function (params) {
  return qs.stringify(params)
}

// 请求拦截
axios.interceptors.response.use(res => {
  if (res.status === 0) {
    return Promise.resolve(res.data)
  } else {
    return Promise.reject(res.data)
  }
}, err => {
  return Promise.reject(err)
})

const get = (url, params) => {
  return axios.get(url, { params })
}

const post = (url, params) => {
  return axios.post(url, params)
}

export {
  get,
  post
}
