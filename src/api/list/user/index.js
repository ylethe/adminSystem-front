import * as api from '../../config'

export const login = body => {
  return api.post('/api/user/login', body)
}

export const resetPassword = body => {
  return api.post('/api/user/reset-password', body)
}
