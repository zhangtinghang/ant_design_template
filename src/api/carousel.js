import request from '@/utils/request'

export function getCarousel (data) {
  return request({
    url: '/mini/picture',
    method: 'get',
    params: data
  })
}

export function createCarousel (data) {
  return request({
    url: '/mini/picture',
    method: 'post',
    data: data
  })
}

export function updateCarousel (data) {
 return request({
   url: '/mini/picture',
   method: 'put',
   data: data
 })
}

export function deleteCarousel (token, id) {
 return request({
   url: '/mini/picture',
   method: 'delete',
   data: { token, id }
 })
}