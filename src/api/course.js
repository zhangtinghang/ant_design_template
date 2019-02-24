import request from '@/utils/request'

export function getCourse (data) {
  return request({
    url: '/class/order',
    method: 'get',
    data: data
  })
}

export function selectCourse (data) {
  return request({
    url: '/search/class_user',
    method: 'get',
    data: data
  })
}

export function createCourse (data) {
  return request({
    url: '/class/order',
    method: 'post',
    data: data
  })
}

export function updateCourse (data) {
 return request({
   url: '/class/order',
   method: 'put',
   data: data
 })
}

export function deleteCourse (token, id) {
 return request({
   url: '/class/order',
   method: 'delete',
   data: { token, id }
 })
}

export function getCourseUser (data) {
 return request({
   url: '/class/user',
   method: 'get',
   data: data
 })
}

export function getUserCourse (data) {
  return request({
    url: '/class/user_courses',
    method: 'get',
    data: data
  })
}

export function updateUserCourse (data) {
  return request({
    url: '/class/user_courses',
    method: 'put',
    data: data
  })
}

export function getUserComment (data) {
  return request({
    url: '/class/comment',
    method: 'get',
    params: data
  })
}

export function updateUserComment (data) {
  return request({
    url: '/class/comment',
    method: 'post',
    data: data
  })
}
export function addBatchCourse (data) {
  return request({
    url: '/batch/class_user',
    method: 'post',
    data: data
  })
}