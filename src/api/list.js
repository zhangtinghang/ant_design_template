import request from '@/utils/request'

export function getCourse () {
  return request({
    url: '/mini/course',
    method: 'get'
  })
}

export function createCourse (data) {
  return request({
    url: '/mini/course',
    method: 'post',
    data: data
  })
}

export function updateCourse (data) {
 return request({
   url: '/mini/course',
   method: 'put',
   data: data
 })
}

export function deleteCourse (data) {
 return request({
   url: '/mini/course',
   method: 'delete',
   data: data
 })
}