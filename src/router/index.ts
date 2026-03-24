import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/LoginPage.vue'),
    },
    {
      path: '/',
      component: () => import('@/components/templates/LayoutMain.vue'),
      redirect: '/realtime',
      children: [
        {
          path: 'realtime',
          name: 'realtime',
          component: () => import('@/pages/RealTimePage.vue'),
        },
        {
          path: 'history',
          name: 'history',
          component: () => import('@/pages/HistoryRecordPage.vue'),
        },
        {
          path: 'analysis',
          name: 'analysis',
          component: () => import('@/pages/AnalyseCenterPage.vue'),
        },
        {
          path: 'settings',
          name: 'settings',
          component: () => import('@/pages/SettingsPage.vue'),
        },
      ],
    },
    {
      path: '/screen',
      name: 'screen',
      component: () => import('@/pages/ScreenPage.vue'),
    },
  ],
})

export default router
