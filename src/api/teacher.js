import request from '@/utils/request'

export function addTeacher(data){
    return request({
        url: '/api/teacher/add',
        method: 'post',
        data
    })
}

export function getTeachers(params){
    return request({
        url: '/api/teacher/list',
        method: 'get',
        params
    })
}