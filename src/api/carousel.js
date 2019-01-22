import request from '@/utils/request'

export function getCarousel (data) {
  return request({
    url: '/mini/picture',
    method: 'get',
    data: data
  })
}

export function createCarousel (data) {
  return request({
    url: '/mini/picture',
    method: 'post',
    data: data
  })
}

export function updateCarousel (token) {
 return request({
   url: '/mini/picture',
   method: 'put',
   data: { token }
 })
}

export function deleteCarousel (token) {
 return request({
   url: '/mini/picture',
   method: 'delete',
   data: { token }
 })
}