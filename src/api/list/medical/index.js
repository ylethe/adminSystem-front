import * as api from '../../config'

export const getMedicalList = body => {
  return api.get('/api/medical/list', body)
}

export const getMedicalDetail = body => {
  return api.post('/api/medical/detail', body)
}

export const getOutList = body => {
  return api.get('/api/medical/out-list', body)
}

export const medicalOut = body => {
  return api.post('/api/medical/out', body)
}

export const deleteMedical = body => {
  return api.post('/api/medical/delete', body)
}

export const updateMedical = body => {
  return api.post('/api/medical/update', body)
}
