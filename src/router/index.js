import Vue from 'vue'
import VueRouter from 'vue-router'

import Registration from '@/pages/Registration'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Registration',
    component: Registration,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
