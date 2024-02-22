import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('@/views/DashboardView.vue')
    },
    {
      path: '/modern',
      name: 'modern',
      component: () => import('@/views/ModernPomodoroView.vue')
    }
  ]
})

export default router
