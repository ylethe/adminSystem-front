// 引入封装好的方法
import * as api from '../../config'

// 获取员工列表
export const getStaffList = body => {
  return api.get('/api/staff/list', body)
}

// 获取员工详情
export const getStaffDetail = body => {
  return api.post('/api/staff/detail', body)
}

// 将员工设置为管理员
export const setAdmin = body => {
  return api.post('/api/staff/set-admin', body)
}

// 添加或更新员工信息
export const updateStaffInfo = body => {
  return api.post('/api/staff/update', body)
}

// 删除员工
export const deleteStaff = body => {
  return api.post('/api/staff/delete', body)
}
