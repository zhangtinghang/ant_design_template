const getters = {
  errorLogs: state => state.errorLog.logs,
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  device: state => state.app.device,
  user: state => state.user.user,
  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters,
  roles: state => state.user.roles
}
export default getters
