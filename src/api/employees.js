import request from '@/utils/request'

export function getEmployees (data) {
  return request({
    url: '/staff_manage/staff',
    method: 'get',
    data
  })
}

export function selectEmployees (data) {
  return request({
    url: '/search/staff_user',
    method: 'get',
    data
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

export function deleteEmployees (id) {
 return request({
   url: '/staff_manage/staff',
   method: 'delete',
   data: {id}
 })
}

export function addBatchEmployees (data) {
  return request({
    url: '/batch/staff_user',
    method: 'post',
    data: data
  })
}