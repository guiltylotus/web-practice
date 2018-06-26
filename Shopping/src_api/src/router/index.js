import Vue from 'vue'
import Router from 'vue-router'
// import Login from '@/components/Login'
import User from '@/components/User/User'
import Admin from '@/components/Admin/Admin'
import Menu from '@/components/Menu'

import moment from 'moment'
import Login from '../components/authentication/Login'
// import Home from '../components/Home'

Vue.use(Router)

var isAuthenticated = (to, from, next) => {
  let user = JSON.parse(localStorage.getItem('user'))
  if (user) {
    let expiredTime = moment(user.expiredTime).valueOf()
    let currentTime = moment().valueOf()
    if (currentTime < expiredTime) {
      next()
    } else {
      next('/login')
    }
  } else {
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
      next()
    }
  } else {
    next()
  }
}

const router = new Router({
  scrollBehavior: () => ({ y: 0 }),
  routes: [
    {
      path: '/',
      // component: Login,
      beforeEnter: isAuthenticated
    },
    {
      path: '/User',
      component: User,
      beforeEnter: isAuthenticated
    },
    {
      path: '/Admin',
      component: Admin,
      beforeEnter: isAuthenticated
    },
    {
      path: '/Menu',
      component: Menu,
      name: 'Home',
      beforeEnter: isAuthenticated
    },
    {
      path: '/login',
      name: 'Login',
      component: Login,
      beforeEnter: isNotAuthenticated
    }
  ],
  mode: 'history'
})

export default router
