import request from '@/utils/request'

export function addStudent(data) {
  return request({
    url: '/api/student/add',
    method: 'post',
    data
  })
}

export function getStudentList(data) {
  return request({
    url: '/api/student/list',
    method: 'post',
    data
  })
}

export function getStudentSchoolInfos() {
  return request({
    url: '/api/student/studentSchoolInfos',
    method: 'get'
  })
}

export function updateFollowStatus(data) {
  return request({
    url: '/api/student/updateStatus',
    method: 'put',
    data
  })
}

/**
 *  新增沟通记录
 * @param {} data 
 */
export function addCommunicate(data) {
  return request({
    url: '/api/student/addCommunicate',
    method: 'post',
    data
  })
}

/**
 * 根据studentId 获取沟通记录 
 * @param {} id 
 */
export function getCommunicatesById(id) {
  return request({
    url: `/api/student/getCommunicatesById/${id}`,
    method: 'get',
  })
}
