import Vue from 'vue'
import VueRouter from 'vue-router'

import uuid from '@/utils/uuid'

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
    props: () => {
      return {
        trails: [
          {
            id: uuid(),
            meets: [
              {
                id: uuid(),
                title: 'CSS Tips & Tricks',
                category: 'Test',
                schedule: { startTime: '10:00', endTime: '11:25' },
              },
              {
                id: uuid(),
                title: 'Frontend for dummmies',
                category: 'Frontend',
                schedule: { startTime: '14:00', endTime: '15:30' },
              },
              {
                id: uuid(),
                title: 'Vue.js Pro Tips',
                category: 'Advanced Topics',
                schedule: { startTime: '16:00', endTime: '16:45' },
              },
            ],
          },
          {
            id: uuid(),
            meets: [
              {
                id: uuid(),
                title: 'Build an API in five minutes with Deno',
                category: 'Backend',
                duration: 65,
              },
            ],
          },
        ],
      }
    },
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
