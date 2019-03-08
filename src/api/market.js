import request from '@/utils/request'

export function getMarket (data) {
  return request({
    url: '/market/user',
    method: 'get',
    data: data
  })
}

export function selectMarket (data) {
  return request({
    url: '/search/market_user',
    method: 'get',
    data: data
  })
}

export function selectNote (data) {
  return request({
    url: '/search/class_user_note',
    method: 'get',
    data: data
  })
}

export function createMarket (data) {
  return request({
    url: '/market/user',
    method: 'post',
    data: data
  })
}

export function updateMarket (data) {
 return request({
   url: '/market/user',
   method: 'put',
   data: data
 })
}

export function deleteMarket (data) {
 return request({
   url: '/market/user',
   method: 'delete',
   data: data
 })
}

export function getFollow (data) {
 return request({
   url: '/market/followup',
   method: 'get',
   data: data
 })
}

export function addBatchMarket (data) {
  return request({
    url: '/batch/market_user',
    method: 'post',
    data: data
  })
}
