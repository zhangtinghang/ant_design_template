import Vue from 'vue'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'
import './styles/index.scss' // global css
import App from './App.vue'
import VueLazyload from 'vue-lazyload'  //图片懒加载插件
import router from './router'
import store from './store'
import './permission' // permission control
// import '@/font/csanty/csanty.css'

Vue.use(Antd)

Vue.use(VueLazyload, {
  error: './assets/images.png',
  loading: './assets/images.png'
})

Vue.use(require('vue-moment'))

Vue.config.productionTip = false

const _this = new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
export default _this
