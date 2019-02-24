import request from '@/utils/request'

export function getCourse (data) {
  return request({
    url: '/mini/course',
    method: 'get',
    params: data
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

export function deleteCourse (id) {
 return request({
   url: '/mini/course',
   method: 'delete',
   data: {id}
 })
}