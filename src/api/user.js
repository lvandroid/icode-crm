import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/api/user/login',
    method: 'post',
    data
  })
}

export function getInfo(token) {
  return request({
    url: '/api/user/info',
    method: 'get',
    params: {
      token
    }
  })
}

export function logout() {
  return request({
    url: '/api/user/logout',
    method: 'post'
  })
}

export function addUser(data) {
  return request({
    url: '/api/user/add',
    method: 'post',
    data
  })
}

export function getUserList(data) {
  return request({
    url: '/api/user/list',
    method: 'post',
    data
  })
}

export function deleteUser(id) {
  return request({
    url: `/api/user/delete/${id}`,
    method: 'delete'
  })
}

export function updateUser(id, data) {
  return request({
    url: `/api/user/update/${id}`,
    method: 'put',
    data
  })
}

export function updatePwd(id, data) {
  return request({
    url: `/api/user/updatePwd/${id}`,
    method: 'put',
    data
  })
}
