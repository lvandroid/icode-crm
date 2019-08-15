import request from '@/utils/request'

export function addStudent(data){
    return request({
        url: '/api/student/add',
        method: 'post',
        data
    })
}

export function getStudentList(params){
    return request({
        url:'/api/student/list',
        method:'post',
        params
    })
}