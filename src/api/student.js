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
