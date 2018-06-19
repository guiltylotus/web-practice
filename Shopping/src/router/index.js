import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import User from '@/components/User/User'
import Admin from '@/components/Admin/Admin'
import Menu from '@/components/Menu'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Login
    },
    {
      path: '/User',
      component: User
    },
    {
      path: '/Admin',
      component: Admin
    },
    {
      path: '/Menu',
      component: Menu
    }

  ],
  
  mode: "history",
})
