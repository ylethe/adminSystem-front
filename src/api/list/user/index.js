import * as api from '../../config'

export const login = body => {
  return api.post('/api/user/login', body)
}

export const resetPassword = body => {
  return api.post('/api/user/reset-password', body)
}

export const token = body => {
  return api.get('/api/token', body)
}

export const upload = body => {
  return api.post('https://up-z1.qiniup.com', body)
}
