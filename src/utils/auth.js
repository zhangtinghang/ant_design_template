const TokenKey = 'SPORTS-frontend-Token'
const UserKey = 'SPORTS-frontend-user'
export function getToken () {
  return window.localStorage.getItem(TokenKey)
}

export function setToken (token) {
  return window.localStorage.setItem(TokenKey, token)
}

export function removeToken () {
  return window.localStorage.removeItem(TokenKey)
}

export function getUser () {
  return JSON.parse(window.localStorage.getItem(UserKey))
}

export function setUser (user) {
  let use = JSON.stringify(user)
  return window.localStorage.setItem(UserKey, use)
}

export function removeUser () {
  return window.localStorage.removeItem(UserKey)
}
