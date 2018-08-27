import * as api from '../../config'

export const getTask = body => {
  return api.get('/api/task/list', body)
}

export const addTask = body => {
  return api.post('/api/task/add', body)
}

export const completeTask = body => {
  return api.post('/api/task/complete', body)
}

export const deleteTask = body => {
  return api.post('/api/task/delete', body)
}
