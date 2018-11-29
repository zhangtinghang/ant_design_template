import router from './router'
import store from './store'
import { getToken } from './utils/auth'

const whiteList = ['/login'] // 不重定向白名单

router.beforeEach((to, from, next) => {
  // 判断当前路由状态
  console.log('---luyou---', to)
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (store.getters.roles.length === 0) {
        // 获取用户数据
        store.dispatch('GetuserInfo').then(() => {
          // 重新计算动态路由
          const roles = store.getters.roles
          store.dispatch('GenerateRoutes', { roles }).then(() => { // 根据roles权限生成可访问的路由表
            // 动态添加可访问路由表
            router.addRoutes(store.getters.addRouters)
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
          })
        }).catch(() => {
        // 调用取消登录
        // store.dispatch('FedLogOut').then(() => {
        // Message.error(err || 'Verification failed, please login again')
        // next({ path: '/' })
        // })
        })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) { // 在免登录白名单，直接进入
      next()
    } else {
      next({ path: '/login' }) // 否则全部重定向到登录页
    }
  }
})

router.afterEach(() => {
})
