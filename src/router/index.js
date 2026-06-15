import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import MainLayout from '@/layouts/MainLayout.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: () => import('@/views/LoginView.vue'),
      meta: { public: true, title: '로그인' },
    },
    {
      path: '/',
      component: MainLayout,
      meta: { requiresAuth: true },
      children: [
        { path: '', redirect: { name: 'Dashboard' } },
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: () => import('@/views/DashboardView.vue'),
          meta: { title: '대시보드' },
        },
        {
          path: 'members',
          name: 'MemberList',
          component: () => import('@/views/members/MemberListView.vue'),
          meta: { title: '단원 관리' },
        },
        {
          path: 'members/:id',
          name: 'MemberDetail',
          component: () => import('@/views/members/MemberDetailView.vue'),
          meta: { title: '단원 상세' },
        },
        {
          path: 'activity',
          name: 'ActivityLog',
          component: () => import('@/views/ActivityLogView.vue'),
          meta: { title: '활동 기록' },
        },
      ],
    },
    { path: '/:pathMatch(.*)*', redirect: '/dashboard' },
  ],
})

router.beforeEach((to) => {
  const auth = useAuthStore()
  if (to.meta.public) {
    if (auth.isAuthenticated && to.name === 'Login') {
      return { name: 'Dashboard' }
    }
    return true
  }
  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { name: 'Login', query: { redirect: to.fullPath } }
  }
  return true
})

export default router
