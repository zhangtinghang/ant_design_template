import request from '@/utils/request'

export function loginByUsername (data) {
  return request({
    url: '/login',
    method: 'post',
    data: data
  })
}
