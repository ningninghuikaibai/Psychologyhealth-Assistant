import { createRouter, createWebHistory } from 'vue-router'
const backendRoutes = [
  {
    path: '/backend',
    component: () => import('@/components/BackendLayout.vue'),
    children: [
      {
        path: "dashboard",
        component: () => import('@/views/dashboard.vue')
      }
    ],
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: backendRoutes,
})
export default router
