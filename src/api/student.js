import request from '@/utils/request'

export function getStudent (data) {
  return request({
    url: '/mini/student_mien',
    method: 'get',
    params: data
  })
}

export function createStudent (data) {
  return request({
    url: '/mini/student_mien',
    method: 'post',
    data: data
  })
}

export function updateStudent (data) {
 return request({
   url: '/mini/student_mien',
   method: 'put',
   data: data
 })
}

export function deleteStudent (id) {
 return request({
   url: '/mini/student_mien',
   method: 'delete',
   data: {id}
 })
}