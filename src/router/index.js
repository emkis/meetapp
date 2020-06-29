import Vue from 'vue'
import VueRouter from 'vue-router'

import Registration from '@/pages/Registration'
const Trails = () => import(/* webpackChunkName: "trails" */ '@/pages/Trails')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Registration',
    component: Registration,
  },
  {
    path: '/trails',
    name: 'Trails',
    component: Trails,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
