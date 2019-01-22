import Vue from 'vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import './styles/index.scss' // global css
import App from './App.vue'
import VueLazyload from 'vue-lazyload'  //图片懒加载插件

import router from './router'
import store from './store'

import './permission' // permission control

Vue.use(Antd)

Vue.use(VueLazyload)

Vue.use(VueLazyload, {
  error: './assets/images.png',
  loading: './assets/images.png'
})

Vue.use(require('vue-moment'))

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
