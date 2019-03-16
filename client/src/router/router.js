import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Logout from '@/components/Logout'
import Pick from '@/components/Pick'
// import store from '../store/store'

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
    },
    {
      path: '/logout',
      name: 'logout',
      component: Logout
    }
  ]
})

/* const openRoutes = ['Login', 'Register']

 this.beforeEach((to, from, next) => {
  if (openRoutes.includes(to.name)) {
    next()
  } else if (store.getters.isAuthenticated) {
    next()
  } else {
    next('/login')
  }
}) */
