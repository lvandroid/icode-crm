import request from '@/utils/request'

export function addCourse(data) {
  return request({
    url: '/api/course/add',
    method: 'post',
    data
  })
}

export function getCourse(data) {
  return request({
    // url: '/api/course/list',
    url: '/api/course/getCourseList',
    method: 'post',
    data
  })
}

export function getAllCourseType(){
  return request(
    {
      url: '/api/courseType/list',
      method: 'get',
    }
  )
}

export function getCourseTypeByName(data){
  return request(
    {
      url: '/api/courseType/findByName',
      'method': 'post',
      data
    }
  )
}
