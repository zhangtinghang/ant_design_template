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

export function updateVideo (token) {
 return request({
   url: '/mini/video',
   method: 'put',
   data: { token }
 })
}

export function deleteVideo (token) {
 return request({
   url: '/mini/video',
   method: 'delete',
   data: { token }
 })
}