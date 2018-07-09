import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'

import { MessageBox } from 'element-ui';

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

import Proxyapply from '@/components/Agent/Proxyapply'
import Proxylist from '@/components/Agent/Proxylist'
import Withdraw from '@/components/Agent/Withdraw'
import Commission from '@/components/Agent/Commission'

import Reportlist from '@/components/Report/Reportlist'

import Spike from '@/components/Mark/Spike'
import Card from '@/components/Mark/Card'
import Group from '@/components/Mark/Group'

// import MyShop from '@/components/Shop/MyShop'
import Shoplist from '@/components/Shop/Shoplist'
import Newshop from '@/components/Shop/Newshop'
import Selfshop from '@/components/Shop/Selfshop'
import Shoptype from '@/components/Shop/Shoptype'
import Settleapply from '@/components/Shop/Settleapply'

import Adlist from '@/components/Advertise/Adlist'

import Adminlist from '@/components/Role/Adminlist'
import Rolelist from '@/components/Role/Rolelist'
import Roleedit from '@/components/Role/Roleedit'

import Baseset from '@/components/Setting/Baseset'
import Wechatset from '@/components/Setting/Wechatset'
import Document from '@/components/Setting/Document'

import Delivelist from '@/components/Delivery/Delivelist'


// 懒加载方式，当路由被访问的时候才加载对应组件
const Login = resolve => require(['@/components/Login/Login'], resolve)

Vue.use(Router)

let router = new Router({
    mode: 'history', 
    routes: [{
        path: '/',
        name: '登录',
        component: Login,
        redirect: '/Login/Login',
        menuShow: false,
        iconCls: '',
        children: [
        {path: '/Login/Login',component: Console,name: '登录',menuShow: false,meta:{permission: ''}}
        ]
    }, {
        leaf: true,
        path: '/',
        name: '控制',
        component: Home,
        redirect: '/index/Console',
        menuShow: true,
        iconCls: 'iconfont menu-kongzhi',
        children: [
        {path: '/index/Console',component: Console,name: '控制台',menuShow: true,meta:{permission: ''}}
        ]
    }, {
        path: '/',
        name: '商家管理',
        component: Home,
        redirect: '/Shop/Shoplist',
        menuShow: true,
        iconCls: 'iconfont menu-shangjia',
        children: [
        {path: '/Shop/Newshop',component: Newshop,name: '我的店铺',menuShow: true,meta:{permission: 'myStore'}}, 
        {path: '/Shop/Shoplist',component: Shoplist,name: '商家列表',menuShow: true,meta:{permission: 'storeList'}}, 
        // {path: '/Shop/Newshop',component: Newshop,name: '新增商铺',menuShow: false}, 
        // {path: '/Shop/Selfshop',component: Selfshop,name: '自营商铺',menuShow: true}, 
        {path: '/Shop/Settleapply',component: Settleapply,name: '入驻申请',menuShow: true,meta:{permission: 'settleList'}},
        {path: '/Shop/Shoptype',component: Shoptype,name: '经营类目',menuShow: true,meta:{permission: 'storeCategoryList'}}
        ]
    }, {
        path: '/',
        name: '商品管理',
        component: Home,
        redirect: '/Good/Goodlist',
        menuShow: true,
        iconCls: 'iconfont menu-shangpin',
        children: [
        {path: '/Good/Goodnew',component: Goodnew,name: '添加商品',menuShow: false,meta:{permission: 'productAdd'}}, 
        {path: '/Good/Goodlist',component: Goodlist,name: '商品列表',menuShow: true,meta:{permission: ''}}, 
        {path: '/Good/Goodtype',component: Goodtype,name: '商品分类',menuShow: true,meta:{permission: 'productTypeList'}}, 
        {path: '/Good/Goodformat',component: Goodformat,name: '商品规格',menuShow: true,meta:{permission: 'productCategoryList'}}, 
        {path: '/Good/Goodrecycle',component: Goodrecycle,name: '商品回收站',menuShow: true,meta:{permission: ''}}
        ]
    }, {
        path: '/',
        name: '订单管理',
        component: Home,
        redirect: '/Order/Orderlist',
        menuShow: true,
        iconCls: 'iconfont menu-74wodedingdan',
        children: [
        {path: '/Order/Orderlist',component: Orderlist,name: '购物订单',menuShow: true,meta:{permission: ''}}, 
        // {path: '/Order/Teamwork',component: Teamwork,name: '拼团订单',menuShow: true},    
        {path: '/Order/Refund',component: Refund,name: '退款',menuShow: true,meta:{permission: ''}}
        ]
    },
    {
        leaf: true,
        path: '/',
        name: '快递配置',
        component: Home,
        redirect: '/Delivery/Delivelist',
        menuShow: true,
        iconCls: 'iconfont menu-truck',
        children: [
        {path: '/Delivery/Delivelist',component: Delivelist,name: '快递列表',menuShow: true,meta:{permission: 'expressList'}}
        ]
    }, {
        path: '/',
        name: '用户管理',
        component: Home,
        redirect: '/User/Userlist',
        menuShow: true,
        iconCls: 'iconfont menu-yonghu',
        children: [
        {path: '/User/Userlist',component: Userlist,name: '用户列表',menuShow: true,meta:{permission: 'userList'}}
        ]
    }, {
        path: '/',
        name: '代理管理',
        component: Home,
        redirect: '/Agent/Userlist',
        menuShow: true,
        iconCls: 'iconfont menu-yonghu',
        children: [
        {path: '/Agent/Proxyapply',component: Proxyapply,name: '分销申请',menuShow: true,meta:{permission: 'proxyApplyList'}}, 
        {path: '/Agent/Proxylist',component: Proxylist,name: '代理列表',menuShow: true,meta:{permission: 'proxyList'}}, 
        {path: '/Agent/Commission',component: Commission,name: '佣金管理',menuShow: true,meta:{permission: 'brokerageList'}}, 
        {path: '/Agent/Withdraw',component: Withdraw,name: '提现管理',menuShow: true,meta:{permission: 'withdrawList'}}
        ]
    }, 
// {
//     leaf: true,
//     path: '/',
//     name: '报表统计',
//     component: Home,
//     redirect: '/Report/Reportlist',
//     menuShow: true,
//     iconCls: 'iconfont menu-baobiaofenxi-copy',
//     children: [
//     {path: '/Report/Reportlist',component: Reportlist,name: '统计图表',menuShow: true}, 
//     ]
// }, {
//     path: '/',
//     name: '营销活动',
//     component: Home,
//     redirect: '/Mark/Spike',
//     menuShow: true,
//     iconCls: 'iconfont menu-yingxiao',
//     children: [
//     {path: '/Mark/Spike',component: Spike,name: '限时秒杀',menuShow: true}, 
//     {path: '/Mark/Card',component: Card,name: '集卡牌',menuShow: true}, 
//     {path: '/Mark/Group',component: Group,name: '团购',menuShow: true}    
//     ]
// }, 
{
    leaf: true,
    path: '/',
    name: '广告管理',
    component: Home,
    redirect: '/Advertise/Adlist',
    menuShow: true,
    iconCls: 'iconfont menu-guanggaogongguan',
    children: [
    {path: '/Advertise/Adlist',component: Adlist,name: '广告列表',menuShow: true,meta:{permission: 'advertList'}}
    ]
}, {
    path: '/',
    name: '权限管理',
    component: Home,
    redirect: '/Role/Adminlist',
    menuShow: true,
    iconCls: 'iconfont menu-yuechi',
    children: [
    {path: '/Role/Adminlist',component: Adminlist,name: '管理员列表',menuShow: true,            meta:{permission: 'adminList'}}, 
    {path: '/Role/Rolelist',component: Rolelist,name: '角色列表',menuShow: true,meta:{permission: 'roleList'}},
    {path: '/Role/Roleedit',component: Roleedit,name: '编辑角色',menuShow: false,meta:{permission: 'roleAdd'}} 
    ]
}, {
    path: '/',
    name: '系统设置',
    component: Home,
    redirect: '/Setting/Baseset',
    menuShow: true,
    iconCls: 'iconfont menu-xitong',
    children: [
    // {path: '/Setting/Baseset',component: Baseset,name: '基本设置',menuShow: true}, 
    {path: '/Setting/Wechatset',component: Wechatset,name: '微信设置',menuShow: true,meta:{permission: 'txConfig'}}, 
    {path: '/Setting/Document',component: Document,name: '关于我们',menuShow: true,meta:{permission: 'documentList'}}]
}, ]
})







router.beforeEach((to, from, next) => {
    if (to.path.startsWith('/Login')) {
        next()
    } else {

        let permissions = window.sessionStorage.getItem('permissions')

        // console.log(permissions.indexOf(to.meta.permission))
        if (to.meta.permission && permissions) {
            if (permissions.indexOf(to.meta.permission)>-1) {
              next()
          } else {
             MessageBox.alert('没有访问权限', '提示', {
                confirmButtonText: '确定',
                closeOnPressEscape:false,
                showClose:false,
                callback: action => {

                }
            });
         }
     }else{
       next() 
   }
}
})

router.afterEach((transition) => {


})

export default router