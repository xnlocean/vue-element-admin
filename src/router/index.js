import Vue from 'vue'
import Router from 'vue-router'
const _import = require('./_import_' + process.env.NODE_ENV)
// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    role: ['admin','editor']     will control the page role (you can set multiple roles)
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
    noCache: true                if fasle ,the page will no be cached(default is false)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: _import('login/index'), hidden: true },
  { path: '/authredirect', component: _import('login/authredirect'), hidden: true },
  { path: '/404', component: _import('errorPage/404'), hidden: true },
  { path: '/401', component: _import('errorPage/401'), hidden: true },
  {
    path: '',
    component: Layout,
    redirect: 'dashboard',
    children: [{
      path: 'dashboard',
      component: _import('dashboard/index'),
      name: 'dashboard',
      meta: { title: 'dashboard', icon: 'dashboard', noCache: true }
    }]
  }
]

export default new Router({
  mode: 'history', // 后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

export const asyncRouterMap = [
  {
    path: '/userManagement',
    component: Layout,
    children: [{
      path: 'index',
      component: _import('userManagement/index'),
      name: 'userManagement',
      meta: { title: 'userManagement', icon: 'icon', noCache: true }
    }]
  },
  {
    path: '/commodityManagement',
    component: Layout,
    redirect: 'noredirect',
    name: 'commodityManagement',
    meta: {
      title: 'commodityManagement',
      icon: 'icon'
    },
    children: [
      { path: 'classManagement', component: _import('commodityManagement/classManagement/index'), name: 'classManagement', meta: { title: 'classManagement', icon: 'table' }},
      { path: 'commodityListManagement', component: _import('commodityManagement/commodityManagement/index'), name: 'commodityListManagement', meta: { title: 'commodityListManagement', icon: 'table' }}
    ]
  },
  {
    path: '/activityManagement',
    component: Layout,
    children: [{
      path: 'index',
      component: _import('activityManagement/index'),
      name: 'activityManagement',
      meta: { title: 'activityManagement', icon: 'icon', noCache: true }
    }]
  },
  {
    path: '/add',
    component: Layout,
    children: [{
      path: 'changeActivit',
      component: _import('activityManagement/changeActivit'),
      name: 'changeActivit',
      meta: { title: 'changeActivit', icon: 'icon' }
    }],
    hidden: true

  },
  {
    path: '/resourceManagement',
    component: Layout,
    redirect: 'noredirect',
    name: 'resourceManagement',
    meta: {
      title: 'resourceManagement',
      icon: 'icon'
    },
    children: [
      { path: 'appManagement', component: _import('resourceManagement/appManagement/index'), name: 'appManagement', meta: { title: 'appManagement', icon: 'table' }},
      { path: 'addManagement', component: _import('resourceManagement/appManagement/addManagement'), name: 'addManagement', meta: { title: 'addManagement', icon: 'table' }, hidden: true },
      { path: 'pageManagement', component: _import('resourceManagement/pageManagement/index'), name: 'pageManagement', meta: { title: 'pageManagement', icon: 'table' }},
      { path: 'changePage', component: _import('resourceManagement/pageManagement/changePage'), name: 'changePage', meta: { title: 'changePage', icon: 'table' }, hidden: true },
      { path: 'pushManagement', component: _import('resourceManagement/pushManagement/index'), name: 'pushManagement', meta: { title: 'pushManagement', icon: 'table' }},
      { path: 'SMSManagement', component: _import('resourceManagement/SMSManagement/index'), name: 'SMSManagement', meta: { title: 'SMSManagement', icon: 'table' }},
      { path: 'versionManagement', component: _import('resourceManagement/versionManagement/index'), name: 'versionManagement', meta: { title: 'versionManagement', icon: 'table' }}
    ]
  },
  {
    path: '/example',
    component: Layout,
    redirect: '/example/table/complex-table',
    name: 'example',
    meta: {
      title: 'example',
      icon: 'example'
    },
    children: [
      {
        path: '/example/table',
        component: _import('example/table/index'),
        redirect: '/example/table/complex-table',
        name: 'Table',
        meta: {
          title: 'Table',
          icon: 'table'
        },
        children: [
          { path: 'dynamic-table', component: _import('example/table/dynamicTable/index'), name: 'dynamicTable', meta: { title: 'dynamicTable' }},
          { path: 'drag-table', component: _import('example/table/dragTable'), name: 'dragTable', meta: { title: 'dragTable' }},
          { path: 'inline-edit-table', component: _import('example/table/inlineEditTable'), name: 'inlineEditTable', meta: { title: 'inlineEditTable' }},
          { path: 'complex-table', component: _import('example/table/complexTable'), name: 'complexTable', meta: { title: 'complexTable' }}
        ]
      },
      { path: 'tab/index', icon: 'tab', component: _import('example/tab/index'), name: 'tab', meta: { title: 'tab' }}
    ]
  },

  {
    path: '/form',
    component: Layout,
    redirect: 'noredirect',
    name: 'form',
    meta: {
      title: 'form',
      icon: 'form'
    },
    children: [
      { path: 'create-form', component: _import('form/create'), name: 'createForm', meta: { title: 'createForm', icon: 'table' }},
      { path: 'edit-form', component: _import('form/edit'), name: 'editForm', meta: { title: 'editForm', icon: 'table' }}
    ]
  },

  { path: '*', redirect: '/404', hidden: true }
]
