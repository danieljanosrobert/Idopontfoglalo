import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Pick from '@/components/Pick'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/timetable',
      name: 'pick',
      component: Pick
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})
