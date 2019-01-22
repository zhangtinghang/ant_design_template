import request from '@/utils/request'

export function getCoach (data) {
  return request({
    url: '/mini/teacher_mien',
    method: 'get',
    data: data
  })
}

export function createCoach (data) {
  return request({
    url: '/mini/teacher_mien',
    method: 'post',
    data: data
  })
}

export function updateCoach (data) {
 return request({
   url: '/mini/teacher_mien',
   method: 'put',
   data: data
 })
}

export function deleteCoach (data) {
 return request({
   url: '/mini/teacher_mien',
   method: 'delete',
   data: data
 })
}