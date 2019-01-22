import request from '@/utils/request'

export function getEmployees () {
  return request({
    url: '/staff_manage/staff',
    method: 'get'
  })
}

export function createEmployees (data) {
  return request({
    url: '/staff_manage/staff',
    method: 'post',
    data: data
  })
}

export function updateEmployees (data) {
 return request({
   url: '/staff_manage/staff',
   method: 'put',
   data: data
 })
}

export function deleteEmployees (data) {
 return request({
   url: '/staff_manage/staff',
   method: 'delete',
   data: data
 })
}