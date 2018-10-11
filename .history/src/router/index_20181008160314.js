import Vue from 'vue'
import Router from 'vue-router'
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading
Vue.use(Router)
/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
**/
export const constantRouterMap = [
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: '乐源云数据',
    meta: { title: '乐源云数据', icon: 'example' },
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },
  {
    path: '/dashboard',
    component: Layout,
    children: [{
      path: 'index',
      name: '乐源云数据中心',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '{{$t('你好')}}', icon: 'gen2', noCache: true }
    }]
  {
    path: '/error',
    component: Layout,
    redirect: 'noredirect',
    hidden: true,
    name: '错误信息',
    meta: {
      title: '错误信息',
      icon: '404'
    },
    children: [
      {
        path: '401',
        component: () => import('@/views/errorPage/401'),
        name: 'Page401',
        meta: { title: 'page401', noCache: true }
      },
      {
        path: '404',
        component: () => import('@/views/errorPage/404'),
        name: 'Page404',
        meta: { title: 'page404', noCache: true }
      }
    ]
  },
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  // { path: '*', redirect: '/404', hidden: true },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  }
]

export default new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

// 动态路由控制
export const asyncRouterMap = [
  {
    path: '/manage',
    component: Layout,
    redirect: '/manage/account',
    name: '超级管理员',
    alwaysShow: true,
    meta: { title: '超级管理员', icon: 'example' },
    children: [
      {
        path: 'account',
        name: '账户管理',
        component: () => import('@/views/manager/account'),
        meta: { title: '账户管理', icon: '', roles: ['1'], noCache: true }
      },
      {
        path: 'firmware',
        name: '固件管理',
        component: () => import('@/views/manager/firmware'),
        meta: { title: '固件管理', icon: '', roles: ['4'], noCache: true }
      },
      {
        path: 'app',
        name: 'APP管理',
        component: () => import('@/views/manager/app'),
        meta: { title: 'APP管理', icon: '', roles: ['3'], noCache: true }
      },
      {
        path: 'email',
        name: '邮件模板',
        component: () => import('@/views/manager/template'),
        meta: { title: '邮件模板', icon: '', roles: ['21'], noCache: true }
      },
      {
        path: 'tickling',
        name: '意见反馈',
        component: () => import('@/views/manager/feedback'),
        meta: { title: '意见反馈', icon: '', roles: ['2'], noCache: true }
      },
      {
        path: 'chart',
        name: '用户图表',
        component: () => import('@/views/manager/chartUser'),
        meta: { title: '用户图表', icon: '', roles: ['5'], noCache: true }
      },
      {
        path: 'user',
        name: '用户列表',
        component: () => import('@/views/manager/user'),
        meta: { title: '用户列表', icon: '', roles: ['6'], noCache: true }
      },
      {
        path: 'history',
        name: '操作历史',
        component: () => import('@/views/manager/history'),
        meta: { title: '操作历史', icon: '', roles: ['7'], noCache: true }
      },
      {
        path: 'dial',
        name: '表盘管理',
        component: () => import('@/views/manager/dial'),
        meta: { title: '表盘管理', icon: '', roles: ['23'], noCache: true }
      }
    ]
  },
  {
    path: '/datas',
    component: Layout,
    redirect: '/viewData/user/index',
    name: '查看数据',
    alwaysShow: true,
    meta: {
      title: '查看数据',
      icon: 'table'
    },
    children: [
      {
        path: 'user',
        component: () => import('@/views/viewData/user/index'),
        name: '用户注册数',
        meta: { title: '用户注册数', roles: ['8'], noCache: true },
        children: [
          {
            path: 'chartDay',
            component: () => import('@/views/viewData/user/chartDay'),
            name: '每月注册数',
            meta: { title: '每月注册数', icon: '', noCache: true }
          },
          {
            path: 'chartYear',
            component: () => import('@/views/viewData/user/chartYear'),
            name: '每年注册数',
            meta: { title: '每年注册数', noCache: true }
          }
        ]
      },
      {
        path: 'bind',
        component: () => import('@/views/viewData/bind/index'), // Parent router-view
        name: '设备激活数',
        meta: { title: '设备激活数', icon: '', roles: ['9'], noCache: true },
        children: [
          {
            path: 'chartDay',
            component: () => import('@/views/viewData/bind/chartDay'),
            name: '每月激活数',
            meta: { title: '每月激活数', icon: '', noCache: true }
          },
          {
            path: 'chartYear',
            component: () => import('@/views/viewData/bind/chartYear'),
            name: '每年激活数',
            meta: { title: '每年激活数', noCache: true }
          }
        ]
      },
      {
        path: 'ctivityUser',
        component: () => import('@/views/viewData/ctivityUser/index'),
        name: '用户群体分析',
        meta: { title: '用户群体分析', icon: '', roles: ['10'], noCache: true },
        children: [
          {
            path: 'chartDay',
            component: () => import('@/views/viewData/ctivityUser/chartDay'),
            name: '每月活跃数',
            meta: { title: '每月活跃数', icon: '', noCache: true }
          },
          {
            path: 'chartYear',
            component: () => import('@/views/viewData/ctivityUser/chartYear'),
            name: '每年活跃数',
            meta: { title: '每年活跃数', noCache: true }
          }
        ]
      },
      {
        path: 'user1',
        component: () => import('@/views/manager/user'),
        name: '用户列表1',
        meta: { title: '用户列表', icon: '', roles: ['11'], noCache: true }
      },
      {
        path: 'chartSport',
        component: () => import('@/views/viewData/chartSport'),
        name: '运动数据分析',
        meta: { title: '运动数据分析', icon: '', roles: ['12'], noCache: true }
      },
      {
        path: 'list6',
        component: () => import('@/views/errorPage/404'),
        name: '重置用户密码',
        meta: { title: '重置用户密码', icon: '', roles: ['22'], noCache: true }
      }
    ]
  },
  {
    path: '/service',
    component: Layout,
    redirect: '/service/email',
    name: '推广服务',
    alwaysShow: true,
    meta: {
      title: '推广服务',
      icon: 'guide'
    },
    children: [
      {
        path: 'email',
        component: () => import('@/views/service/email'),
        name: '邮件推广',
        meta: { title: '邮件推广', icon: '', roles: ['13'], noCache: true }
      },
      {
        path: 'note',
        component: () => import('@/views/service/note'),
        name: '短信邮件推广',
        meta: { title: '短信邮件推广', icon: '', roles: ['14'], noCache: true }
      },
      {
        path: 'list3',
        component: () => import('@/views/service/push'),
        name: 'APP消息推送',
        meta: { title: 'APP消息推送', icon: '', roles: ['15'], noCache: true }
      }
    ]
  },
  {
    path: '/setting',
    component: Layout,
    redirect: '/setting/list',
    name: '设置',
    alwaysShow: true,
    meta: {
      title: '设置',
      icon: 'component'
    },
    children: [
      {
        path: 'list1',
        component: () => import('@/views/errorPage/404'),
        name: 'APP设置',
        meta: { title: 'APP设置', icon: '', roles: ['16'], noCache: true }
      },
      {
        path: 'list2',
        component: () => import('@/views/errorPage/404'),
        name: '固件设置',
        meta: { title: '固件设置', icon: '', roles: ['17'], noCache: true }
      },
      {
        path: 'list3',
        component: () => import('@/views/errorPage/404'),
        name: '常见问题设置',
        meta: { title: '常见问题设置', icon: '', roles: ['18'], noCache: true }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]
