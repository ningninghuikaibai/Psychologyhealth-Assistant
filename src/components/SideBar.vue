<template>
  <el-aside width="264px">
    <el-menu :default-active="route.path" router class="sidebar-menu">
      <el-menu-item v-for="item in menuItems" :key="item.path" :index="item.path">
        <el-icon><component :is="item.icon" /></el-icon>
        <span>{{ item.title }}</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

interface MenuItem {
  path: string;
  title: string;
  icon: string;
}

const route = useRoute();
const router = useRouter();

// 从路由配置中读取 /back 的子路由，渲染菜单
const menuItems = computed<MenuItem[]>(() => {
  const backendRoute = router.options.routes.find((r) => r.path === "/back");
  return (backendRoute?.children ?? []).map((child) => ({
    path: `/back/${child.path}`,
    title: String(child.meta?.title ?? ""),
    icon: String(child.meta?.icon ?? ""),
  }));
});
// console.log(router.options.routes[0]?.children);
</script>

<style lang="scss" scoped>
.sidebar-menu {
  border-right: none;
  padding: 8px;

  :deep(.el-menu-item) {
    margin-bottom: 4px;
    border-radius: 8px;
  }

  // 激活态样式
  :deep(.el-menu-item.is-active) {
    background-color: var(--el-color-primary-light-9);
  }
}
</style>
