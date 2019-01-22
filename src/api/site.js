import request from '@/utils/request'

export function getSite (data) {
  return request({
    url: '/mini/location',
    method: 'get',
    data: data
  })
}

export function createSite (data) {
  return request({
    url: '/mini/location',
    method: 'post',
    data: data
  })
}

export function updateSite (data) {
 return request({
   url: '/mini/location',
   method: 'put',
   data: data
 })
}

export function deleteSite (data) {
 return request({
   url: '/mini/location',
   method: 'delete',
   data: data
 })
}