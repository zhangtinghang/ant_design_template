import request from '@/utils/request'

export function getVideo (data) {
  return request({
    url: '/mini/video',
    method: 'get',
    data: data
  })
}

export function createVideo (data) {
  return request({
    url: '/mini/video',
    method: 'post',
    data: data
  })
}

export function updateVideo (data) {
 return request({
   url: '/mini/video',
   method: 'put',
   data: data
 })
}

export function deleteVideo (id) {
 return request({
   url: '/mini/video',
   method: 'delete',
   data: { id }
 })
}