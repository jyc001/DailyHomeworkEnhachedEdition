import LoginViewVue from '@/views/LoginView.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },{
      path: '/work/list',
      name:'workList',
      component: () => import('../views/works/WorksBase.vue')
    },{
      path: '/work/:workId/detail',
      name:'workDetail',
      component: () => import('../views/works/WorkDetail.vue')
    },
  ]
})

export default router
