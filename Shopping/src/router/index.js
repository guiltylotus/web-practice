import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import User from '@/components/User/User'

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
    }
  ],
  
  mode: "history",
})
