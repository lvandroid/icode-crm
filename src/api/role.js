import request from '@/utils/request'

export function getRoutes(roleId){
    return request({
            url:`/api/router/list/${roleId}`,
            method:'get',
          })
}