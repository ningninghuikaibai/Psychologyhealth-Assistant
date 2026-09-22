<template>
  <el-aside class="layout-sidebar" :width="collapsed ? '64px' : '264px'">
    <!-- 顶部品牌区 -->
    <div class="brand">
      <el-image :src="logoUrl" alt="logo" class="brand-image" />
      <div v-show="!collapsed" class="info-card">
        <h1 class="brand-title">心理健康AI助手</h1>
        <p class="brand-subtitle">管理后台</p>
      </div>
    </div>

    <!-- 菜单区：使用 el-menu 内置 collapse -->
    <el-menu
      :default-active="route.path"
      router
      :collapse="collapsed"
      :collapse-transition="true"
      class="sidebar-menu"
    >
      <el-menu-item v-for="item in menuItems" :key="item.path" :index="item.path">
        <el-icon>
          <component :is="item.icon" />
        </el-icon>
        <template #title>
          <span>{{ item.title }}</span>
        </template>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>
<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import logoUrl from "@/assets/images/机器人.png";

defineProps<{ collapsed: boolean }>();

interface MenuItem {
  path: string;
  title: string;
  icon: string;
}

const route = useRoute();
const router = useRouter();

const menuItems = computed<MenuItem[]>(() => {
  const backendRoute = router.options.routes.find((r) => r.path === "/back");
  return (backendRoute?.children ?? []).map((child) => ({
    path: `/back/${child.path}`,
    title: String(child.meta?.title ?? ""),
    icon: String(child.meta?.icon ?? ""),
  }));
});
</script>

<style lang="scss" scoped>
.layout-sidebar {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #fff;
  border-right: 1px solid var(--el-border-color-light);
  transition: width 0.3s ease;
}

.brand {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 20px;
  border-bottom: 1px solid var(--el-border-color-light);
  overflow: hidden;

  .brand-image {
    width: 44px;
    height: 44px;
    flex-shrink: 0;
  }

  .info-card {
    display: flex;
    flex-direction: column;
    white-space: nowrap;
  }

  .brand-title {
    margin: 0;
    font-size: 18px;
    font-weight: 700;
    color: var(--el-text-color-primary);
    line-height: 1.4;
  }

  .brand-subtitle {
    margin: 2px 0 0;
    font-size: 12px;
    color: var(--el-text-color-secondary);
    line-height: 1.4;
  }
}

.sidebar-menu {
  flex: 1;
  border-right: none;
  padding: 8px 12px;
  overflow-y: auto;
  overflow-x: hidden;

  :deep(.el-menu-item) {
    height: 56px;
    margin-bottom: 12px;
    border-radius: 10px;
    color: var(--el-text-color-primary);
    font-size: 15px;
    font-weight: 500;

    .el-icon {
      font-size: 18px;
      color: var(--el-text-color-regular);
    }

    &:not(.is-active):hover {
      background-color: var(--el-fill-color-light);
      color: var(--el-text-color-primary);
      font-weight: 600;

      .el-icon {
        color: var(--el-text-color-regular);
      }
    }
  }

  :deep(.el-menu-item.is-active) {
    background-color: var(--el-color-primary-light-9);
    color: var(--el-color-primary);
    font-weight: 600;

    .el-icon {
      color: var(--el-color-primary);
    }
  }
}
</style>
