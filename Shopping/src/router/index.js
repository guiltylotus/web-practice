import Vue from 'vue'
import Router from 'vue-router'
// import Login from '@/components/Login'
// import User from '@/components/User/User'
// import Admin from '@/components/Admin/Admin'
// import Menu from '@/components/Menu'

import moment from 'moment'
import Login from '../components/authentication/Login'
import UserHome from '../components/User/Home'
import Bag from '../components/User/Bag'
import Home from '../components/Home'
import UserOrder from '../components/User/Order'
import AdminHome from '../components/Admin/Home'
import AdminOrder from '../components/Admin/Order'

Vue.use(Router)

var isAuthenticated = (to, from, next) => {
  let user = JSON.parse(localStorage.getItem('user'))
  if (user) {
    let expiredTime = moment(user.expiredTime).valueOf()
    let currentTime = moment().valueOf()
    if (currentTime < expiredTime) {
      next()
    } else {
      window.localStorage.clear()
      next('/login')
    }
  } else {
    window.localStorage.clear()
    next('/login')
  }
}

var isNotAuthenticated = (to, from, next) => {
  let user = JSON.parse(localStorage.getItem('user'))
  if (user) {
    let expiredTime = moment(user.expiredTime).valueOf()
    let currentTime = moment().valueOf()
    if (currentTime < expiredTime) {
      next('/')
    } else {
      window.localStorage.clear()
      next()
    }
  } else {
    window.localStorage.clear()
    next()
  }
}

const router = new Router({
  // hiện tại thì thôi ko để mode history nhé, cứ để mặc định cũng ok
  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    // component test api + một số ghi chú
    {
      path: '/testHome',
      name: 'Home',
      component: Home,
      beforeEnter: isAuthenticated
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter: isNotAuthenticated
    },
    // path for User, tự thêm component
    {
      path: '/user/home',
      name: 'User Home',
      component: UserHome,
      beforeEnter: isAuthenticated
    },
    {
      path: '/user/order-list',
      name: 'User Orders',
      component: Bag,
      beforeEnter: isAuthenticated
    },
    {
      path: '/user/order',
      name: 'Current Order',
      component: UserOrder,
      beforeEnter: isAuthenticated
    },
    // path for Admin, tự thêm component
    {
      path: '/admin/home',
      name: 'Admin Home',
      component: AdminHome,
      beforeEnter: isAuthenticated
    },
    {
      path: '/admin/order-list',
      name: 'Admin Orders',
      component: AdminOrder,
      beforeEnter: isAuthenticated
    },
    {
      path: '/admin/today',
      name: 'Order Today',
      beforeEnter: isAuthenticated
    }
  ]
})

export default router
