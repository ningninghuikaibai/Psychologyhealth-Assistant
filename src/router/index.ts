import { createRouter, createWebHistory } from "vue-router";

// 登录 / 注册（BrandPanel 为 auth 布局：左侧品牌区 + 右侧表单 router-view）
const authRoutes = [
  {
    path: "/auth",
    component: () => import("@/components/BrandPanel.vue"),
    redirect: "/auth/login",
    children: [
      {
        path: "login",
        component: () => import("@/views/auth/Login.vue"),
        meta: { title: "登录" },
      },
      {
        path: "register",
        component: () => import("@/views/auth/Register.vue"),
        meta: { title: "注册" },
      },
    ],
  },
];

const backendRoutes = [
  {
    path: "/back",
    component: () => import("@/components/BackendLayout.vue"),
    children: [
      {
        path: "dashboard",
        component: () => import("@/views/admin/Dashboard.vue"),
        meta: {
          title: "数据分析",
          icon: "PieChart",
        },
      },
      {
        path: "knowledge",
        component: () => import("@/views/admin/Knowledge.vue"),
        meta: {
          title: "知识文章",
          icon: "ChatLineSquare",
        },
      },
      {
        path: "consultations",
        component: () => import("@/views/admin/Consultations.vue"),
        meta: {
          title: "咨询记录",
          icon: "Message",
        },
      },
      {
        path: "emotional",
        component: () => import("@/views/admin/Emotional.vue"),
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
  routes: [...authRoutes, ...backendRoutes],
});
export default router;
