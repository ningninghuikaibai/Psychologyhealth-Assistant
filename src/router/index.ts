import { createRouter, createWebHistory } from "vue-router";
const backendRoutes = [
  {
    path: "/back",
    component: () => import("@/components/BackendLayout.vue"),
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/Dashboard.vue"),
        meta: {
          title: "数据分析",
          icon: "PieChart",
        },
      },
      {
        path: "knowledge",
        component: () => import("@/views/Knowledge.vue"),
        meta: {
          title: "知识文章",
          icon: "ChatLineSquare",
        },
      },
      {
        path: "consultations",
        component: () => import("@/views/Consultations.vue"),
        meta: {
          title: "咨询记录",
          icon: "Message",
        },
      },
      {
        path: "emotional",
        component: () => import("@/views/Emotional.vue"),
        meta: {
          title: "情绪日志",
          icon: "User",
        },
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: backendRoutes,
});
export default router;
