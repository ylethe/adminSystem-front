import * as api from '../../config'

export const getCustomerList = body => {
  return api.post('/api/customer/list', body)
}

export const getCustomerDetail = body => {
  return api.post('/api/customer/detail', body)
}

export const updateCustomer = body => {
  return api.post('/api/customer/update', body)
}
