import request from '@/utils/request'

export function addCourse(data) {
  return request({
    url: '/api/course/add',
    method: 'post',
    data
  })
}

export function getCourse(params) {
  return request({
    // url: '/api/course/list',
    url: '/api/course/getCourseList',
    method: 'get',
    params
  })
}
