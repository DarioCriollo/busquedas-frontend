import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Chart from '@/components/Inquiries/chart'
import ListInquiries from '@/components/Inquiries/ListInquiries'
import ListWords from '@/components/Searches/ListWords'

const routes = [
  {
    path: '/',
    name: 'searches',
    component: ListWords
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: function () {
  //     return import(/* webpackChunkName: "about" */ '../views/About.vue')
  //   }
  // },
  {
    path: '/inquiries',
    name: 'ListInquiries',
    component: ListInquiries,
  },
  // {
  //   path: '/searches',
  //   name: 'ListWords',
  //   component: ListWords
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
