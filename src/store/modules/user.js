import { loginByUsername, getUserInfo } from '@/api/login'
import { getToken, setToken } from '@/utils/auth'

const user = {
  state: {
    token: getToken(),
    user: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USER: (state, user) => {
      state.user = user
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 用户名登录
    loginByUsername ({ commit }, userInfo) {
      return new Promise((resolve, reject) => {
        loginByUsername(userInfo).then(response => {
          const token = response.token
          commit('SET_TOKEN', token)
          commit('SET_USER', response)
          setToken(token)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 登出
    // LogOut({ commit, state }) {
    //   return new Promise((resolve, reject) => {
    //     logout(state.user, state.token).then(() => {
    //       commit('SET_TOKEN', '')
    //       commit('SET_ROLES', [])
    //       removeToken()
    //       resolve()
    //     }).catch(error => {
    //       reject(error)
    //     })
    //   })
    // },
  }
}

export default user
