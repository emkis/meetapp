import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Registration',
    component: () =>
      import(/* webpackChunkName: "Registration" */ '@/pages/Registration'),
  },
  {
    path: '/trails',
    name: 'Trails',
    component: () => import(/* webpackChunkName: "Trails" */ '@/pages/Trails'),
  },
  {
    path: '*',
    name: 'NotFound',
    redirect: '/',
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
