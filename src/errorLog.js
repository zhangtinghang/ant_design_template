import Vue from 'vue'
import store from './store'

// if env show the error-log
// if (process.env.NODE_ENV === 'production') {

Vue.config.errorHandler = function (err, vm, info) {
  // detail see https://forum.vuejs.org/t/dispatch-in-vue-config-errorhandler-has-some-problem/23500
  Vue.nextTick(() => {
    store.dispatch('addErrorLog', {
      err,
      vm,
      info,
      url: window.location.href
    })
    console.error(err, info)
  })
}
