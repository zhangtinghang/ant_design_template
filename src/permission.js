import router from './router'
import store from './store'
import { getToken } from './utils/auth'

const whiteList = ['/login'] // 不重定向白名单

router.beforeEach((to, from, next) => {
  // 判断当前路由状态
  if (getToken()) {
    if (to.path === '/login') {
      next({ path: '/' })
    } else {
      if (store.getters.roles.length === 0) {
        let roles = []
        try {
          let perm = null
          if(store.getters.user && store.getters.user.staff_info && store.getters.user.staff_info.perm) {
            perm = store.getters.user.staff_info.perm
          }
          // hack 当前只有一个角色
          roles.push(perm)
        } catch (error) {}
        store.dispatch('GenerateRoutes', { roles }).then(() => { // 根据roles权限生成可访问的路由表
          // 添加路由
          store.dispatch('setRoles', roles)
          console.log('解析出路由', roles)
          // 动态添加可访问路由表
          router.addRoutes(store.getters.addRouters)
          next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 ,set the replace: true so the navigation will not leave a history record
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
