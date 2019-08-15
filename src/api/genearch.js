import request from '@/utils/request'

export function addGenearch(data){
    return request({
        url:'/api/genearch/add',
        method:'post',
        data
    })
}

export function getGenearchList(params){
    return request({
        url:'/api/genearch/list',
        method:'post',
        params
    })
}