import request from '@/utils/request'

export function getRoutes(roleId) {
  return request({
    url: `/api/router/list/${roleId}`,
    method: 'get'
  })
}

export function getRoles() {
  return request({
    url: '/api/role/list',
    method: 'get'
  })
}

export function addRole(data) {
  return request({
    url: '/api/role/add',
    method: 'post',
    data
  })
}

export function deleteRole(id) {
  return request({
    url: `/api/role/delete/${id}`,
    method: 'delete'
  })
}
