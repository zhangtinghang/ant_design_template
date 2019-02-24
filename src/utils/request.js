import axios from 'axios'
import store from '@/store'
import qs from 'qs'
import _this from '../main'
import { removeToken } from '@/utils/auth'
// 创建axios实例
let BASEAPI = process.env.NODE_ENV === 'production'? 'https://laite.pathfinder666.cn/api':'https://laite.pathfinder666.cn/api'
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
  console.log(config)
  const token = store.state.user.token
  if (config.method === 'get') {
    if (config.data) {
      if (config.data.token) {
        config.data.token = token
      }
      config.url = config.url + '?' + qs.stringify(config.data)
    }
  } else {
    config.data.token = token
  }
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
    const res = response.data
    if (res && res.success === false) {
      _this.$message.error('操作失败，请检查相关信息！')
    }
      return res
  },
  error => {
    if (error.response && error.response.status === 401) {
      removeToken()
      _this.$message.error('登陆超时')
      _this.$router.replace({ path: '/login' })
    } else if (error.response && error.response.status === 500) {
      _this.$message.error('服务器出错，请联系开发人员！')
    } else {
      _this.$message.error('服务器出错，请联系开发人员！')
    }
    return Promise.reject(error)
  }
)

export default service
