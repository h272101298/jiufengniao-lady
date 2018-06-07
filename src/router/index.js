import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'

import Console from '@/components/index/Console'

import Goodlist from '@/components/Good/Goodlist'
import Goodtype from '@/components/Good/Goodtype'
import Goodformat from '@/components/Good/Goodformat'
import Goodnew from '@/components/Good/Goodnew'
import Goodrecycle from '@/components/Good/Goodrecycle'

import Orderlist from '@/components/Order/Orderlist'
import Teamwork from '@/components/Order/Teamwork'
import Ship from '@/components/Order/Ship'
import Refund from '@/components/Order/Refund'

import Userlist from '@/components/User/Userlist'
import Proxyapply from '@/components/User/Proxyapply'
import Proxylist from '@/components/User/Proxylist'
import Withdraw from '@/components/User/Withdraw'

import Reportlist from '@/components/Report/Reportlist'

import Marklist from '@/components/Mark/Marklist'

import Shoplist from '@/components/Shop/Shoplist'
import Selfshop from '@/components/Shop/Selfshop'
import Settleapply from '@/components/Shop/Settleapply'

import Adlist from '@/components/Advertise/Adlist'
import Adnew from '@/components/Advertise/Adnew'

import Adminlist from '@/components/Role/Adminlist'
import Rolelist from '@/components/Role/Rolelist'

import Baseset from '@/components/Setting/Baseset'
import Wechatset from '@/components/Setting/Wechatset'

import Delivelist from '@/components/Delivery/Delivelist'


// 懒加载方式，当路由被访问的时候才加载对应组件
const Login = resolve => require(['@/components/Login'], resolve)

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
  {
    path: '/Login',
    name: '登录',
    component: Login
  },
  {
    path: '/',
    name: '控制台',
    component: Home,
    redirect: '/index/Console',
    menuShow: true,
    iconCls: 'iconfont icon-home', 
    children: [
    {path: '/index/Console', component: Console, name: '控制台', menuShow: true}
    ]
  },
  {
    path: '/',
    name: '商品管理',
    component: Home,
    redirect: '/Good/Goodlist',
    menuShow: true,
    iconCls: 'iconfont icon-home',
    children: [
    {path: '/Good/Goodlist', component: Goodlist, name: '商品列表', menuShow: true},
    {path: '/Good/Goodtype', component: Goodtype, name: '商品分类', menuShow: true},
    {path: '/Good/Goodformat', component: Goodformat, name: '商品规格', menuShow: true},
    {path: '/Good/Goodnew', component: Goodnew, name: '添加商品', menuShow: false},
    {path: '/Good/Goodrecycle', component: Goodrecycle, name: '商品回收站', menuShow: true}
    ]
  },
  {
    path: '/',
    name: '订单管理',
    component: Home,
    redirect: '/Order/Orderlist',
    menuShow: true,
    iconCls: 'iconfont icon-home', 
    children: [
    {path: '/Order/Orderlist', component: Orderlist, name: '购物订单', menuShow: true},
    {path: '/Order/Teamwork', component: Teamwork, name: '拼团订单', menuShow: true},
    {path: '/Order/Ship', component: Ship, name: '发货', menuShow: true},
    {path: '/Order/Refund', component: Refund, name: '退款', menuShow: true}
    ]
  },
  {
    path: '/',
    name: '用户管理',
    component: Home,
    redirect: '/User/Userlist',
    menuShow: true,
    iconCls: 'iconfont icon-home', 
    children: [
    {path: '/User/Userlist', component: Userlist, name: '用户列表', menuShow: true},
    {path: '/User/Proxyapply', component: Proxyapply, name: '分销申请', menuShow: true},
    {path: '/User/Proxylist', component: Proxylist, name: '分销列表', menuShow: true},
    {path: '/User/Withdraw', component: Withdraw, name: '提现列表', menuShow: true}
    ]
  },
  {
    path: '/',
    name: '报表统计',
    component: Home,
    redirect: '/Report/Reportlist',
    menuShow: true,
    iconCls: 'iconfont icon-home', 
    children: [
    {path: '/Report/Reportlist', component: Reportlist, name: '统计图表', menuShow: true}
    ]
  },
  {
    path: '/',
    name: '营销活动',
    component: Home,
    redirect: '/Mark/Marklist',
    menuShow: true,
    iconCls: 'iconfont icon-home', 
    children: [
    {path: '/Mark/Marklist', component: Marklist, name: '活动列表', menuShow: true}
    ]
  },
  {
    path: '/',
    name: '商家管理',
    component: Home,
    redirect: '/Shop/Shoplist',
    menuShow: true,
    iconCls: 'iconfont icon-home',
    children: [
    {path: '/Shop/Shoplist', component: Shoplist, name: '商家列表', menuShow: true},
    {path: '/Shop/Selfshop', component: Selfshop, name: '自营商铺', menuShow: true},
    {path: '/Shop/Settleapply', component: Settleapply, name: '入驻申请', menuShow: true}
    ]
  },
  {
    path: '/',
    name: '广告管理',
    component: Home,
    redirect: '/Advertise/Adlist',
    menuShow: true,
    iconCls: 'iconfont icon-home', 
    children: [
    {path: '/Advertise/Adlist', component: Adlist, name: '广告列表', menuShow: true},
    {path: '/Advertise/Adnew', component: Adnew, name: '新增广告', menuShow: true}
    ]
  },
  {
    path: '/',
    name: '权限管理',
    component: Home,
    redirect: '/Role/Adminlist',
    menuShow: true,
    iconCls: 'iconfont icon-home', 
    children: [
    {path: '/Role/Adminlist', component: Adminlist, name: '管理员列表', menuShow: true},
    {path: '/Role/Rolelist', component: Rolelist, name: '角色列表', menuShow: true},
    ]
  },
  {
    path: '/',
    name: '系统设置',
    component: Home,
    redirect: '/Setting/Baseset',
    menuShow: true,
    iconCls: 'iconfont icon-home', 
    children: [
    {path: '/Setting/Baseset', component: Baseset, name: '基本设置', menuShow: true},
    {path: '/Setting/Wechatset', component: Wechatset, name: '微信设置', menuShow: true}
    ]
  },
  {
    path: '/',
    name: '快递配置',
    component: Home,
    redirect: '/Delivery/Delivelist',
    menuShow: true,
    iconCls: 'iconfont icon-home', 
    children: [
    {path: '/Delivery/Delivelist', component: Delivelist, name: '快递列表', menuShow: true}
    ]
  },
  ]
})







// router.beforeEach((to, from, next) => {

//   if (to.path.startsWith('/Login')) {
//     window.sessionStorage.removeItem('token')
//     next()
//   } else {
//     let token = JSON.parse(window.sessionStorage.getItem('token'))
//     if (!token) {
//       next({path: '/Login'})
//     } else {
//       next()
//     }
//   }
// })

export default router
