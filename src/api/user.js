import request from '@/utils/request'

export function getUser (data) {
  return request({
    url: '/staff_manage/staff',
    method: 'get',
    data
  })
}

export function upUser (data) {
  return request({
    url: '/user',
    method: 'put',
    data: data
  })
}

// export function getFollwup (data) {
//   return request({
//     url: '/market/followup',
//     method: 'get',
//     data: data
//   })
// }
