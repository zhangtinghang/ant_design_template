import axios from 'axios'
import qs from 'qs'
// 创建axios实例
let BASEAPI = process.env.NODE_ENV === 'production'? '':'http://112.74.215.22:5000'
const service = axios.create({
  baseURL: BASEAPI, // api的base_url
  timeout: 15000, // 请求超时时间
  headers: {
    'Content-Type': 'application/json; charset=UTF-8'
  }
})

/**
 * reuqest拦截器
 * 可结合业务进行修改
 */
service.interceptors.request.use(config => {
  // if (config.method === 'post') {
  //   config.data = qs.stringify(config.data)
  // }
  return config
}, error => {
  // Do something with request error
  Promise.reject(error)
})

/**
 * response拦截器
 * 可结合业务进行修改
 */
service.interceptors.response.use(
  response => {
    console.log('请求返回===', response)
    if (response && response.status === 401) {
    } else {
      const res = response.data
      return res
    }
  },
  error => {
    return Promise.reject(error)
  }
)

export default service
