import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./' + process.env.NODE_ENV) // router layout

Vue.use(Router)

export const constantRouterMap = [
  {
    path: '/login',
    component: _import('login/index'),
    name: 'Login',
    invisible: true,
  },
  {
    path: '/',
    name: '首页',
    icon: 'appstore',
    component: _import('layout/Layout'),
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      component: _import('home/index'),
      name: 'dashboard'
    }]
  },
  // {
  //   path: '/404',
  //   component: _import('errorPage/404'),
  //   hidden: true
  // },
  // {
  //   path: '/401',
  //   component: _import('errorPage/401'),
  //   hidden: true
  // },
  { path: '*', redirect: '/404', invisible: true }
]

export default new Router({
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/market',
    component: _import('layout/Layout'),
    name: '市场管理',
    icon: 'dashboard',
    meta: {roles: ['market', 'admin']},
    children: [{
      path: '/market/user',
      component: _import('market/user/index'),
      name: '用户管理',
      meta: {roles: ['market', 'admin']}
    },{
      path: '/market/add',
      component: _import('market/add/index'),
      name: '新增用户',
      meta: {roles: ['market', 'admin']}
    },{
      path: '/market/batch',
      component: _import('market/batch/index'),
      name: '批量新增',
      meta: {roles: ['market', 'admin']}
    }]
  },{
    path: '/course',
    component: _import('layout/Layout'),
    name: '课程顾问',
    icon: 'schedule',
    meta: {roles: ['course', 'admin']},
    children: [{
      path: '/course/list',
      component: _import('course/list/index'),
      name: '报课订单',
      meta: {roles: ['course', 'admin']}
    },{
      path: '/course/user',
      component: _import('course/user/index'),
      name: '用户管理',
      meta: {roles: ['course', 'admin']}
    },
    // {
    //   path: '/course/add',
    //   component: _import('course/add/index'),
    //   name: '新增用户',
    //   meta: {roles: ['course', 'admin']}
    // },
    {
      path: '/course/batch',
      component: _import('course/batch/index'),
      name: '批量新增',
      meta: {roles: ['course', 'admin']}      
    }]
  },
  {
    path: '/program',
    component: _import('layout/Layout'),
    name: '小程序管理',
    icon: 'qrcode',
    children: [{
      path: '/program/carousel',
      component: _import('program/carousel/index'),
      name: '轮播图管理',
      meta: {roles: ['admin']}
    },{
      path: '/program/student',
      component: _import('program/student/index'),
      name: '学员风采',
      meta: {roles: ['admin']}
    },{
      path: '/program/list',
      component: _import('program/list/index'),
      name: '课程列表',
      meta: {roles: ['admin']}
    },{
      path: '/program/site',
      component: _import('program/site/index'),
      name: '地点管理',
      meta: {roles: ['admin']}
    },{
      path: '/program/coach',
      component: _import('program/coach/index'),
      name: '教练风采',
      meta: {roles: ['admin']}
    },{
      path: '/program/video',
      component: _import('program/video/index'),
      name: '视频管理',
      meta: {roles: ['admin']}
    }]
  },
  {
    path: '/employees',
    component: _import('layout/Layout'),
    name: '员工管理',
    icon: 'idcard',
    children: [{
      path: '/employees/user',
      component: _import('employees/user/index'),
      name: '用户管理',
      meta: {roles: ['admin']}
    },{
      path: '/employees/add',
      component: _import('employees/add/index'),
      name: '新增用户',
      meta: {roles: ['admin']}
    },{
      path: '/employees/batch',
      component: _import('employees/batch/index'),
      name: '批量新增',
      meta: {roles: ['admin']}
    },{
      path: '/employees/changePwd',
      component: _import('employees/changePwd/index'),
      name: '修改密码',
      meta: {roles: ['admin', 'course', 'market']}
    }]
  }
]
