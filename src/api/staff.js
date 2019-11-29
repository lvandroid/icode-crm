import request from '@/utils/request'

export function addStaff(data) {
  return request({
    url: '/api/staff/add',
    method: 'post',
    data
  })
}

export function getAll() {
  return request({
    url: '/api/staff/getAll',
    method: 'get'
  })
}

export function getStaffList(data) {
  return request({
    url: '/api/staff/list',
    method: 'post',
    data
  })
}
