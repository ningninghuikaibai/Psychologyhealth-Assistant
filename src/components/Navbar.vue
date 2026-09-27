<template>
  <el-header class="nav-bar" height="64px">
    <!-- 左侧：折叠按钮 + 当前页面标题 -->
    <div class="nav-left">
      <el-icon class="collapse-btn" :size="24" @click="emit('toggle')">
        <Fold v-if="!collapsed" />
        <Expand v-else />
      </el-icon>
      <span class="page-title">{{ currentTitle }}</span>
    </div>

    <!-- trigger默认为hover -->
    <el-dropdown class="user-dropdown">
      <div class="user-info">
        <el-avatar :src="userAvatar" :size="36" />
        <span class="user-name">用户</span>
        <el-icon :size="14" class="arrow-icon">
          <ArrowDown />
        </el-icon>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item divided>退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-header>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import userAvatar from "@/assets/images/user.jpg";

defineProps<{ collapsed: boolean }>();
const emit = defineEmits<{ toggle: [] }>();

const route = useRoute();

// 从当前路由 meta 中读取页面标题
const currentTitle = computed(() => String(route.meta?.title ?? ""));
</script>

<style lang="scss" scoped>
.nav-bar {
  width: 100%;
  height: 64px !important;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 32px;
  background-color: #fff;
  border-bottom: 1px solid var(--el-border-color-light);
}

.nav-left {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: 14px;

  .collapse-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    border-radius: 8px;
    cursor: pointer;
    color: var(--el-text-color-regular);
    transition: all 0.2s;

    &:hover {
      background-color: var(--el-fill-color);
      color: var(--el-text-color-primary);
    }
  }

  .page-title {
    font-size: 18px;
    font-weight: 600;
    color: var(--el-text-color-primary);
  }
}

.user-dropdown {
  cursor: pointer;

  .user-info {
    display: flex;
    align-items: center;
    gap: 10px;

    .user-name {
      font-size: 14px;
      color: var(--el-text-color-primary);
    }

    .arrow-icon {
      color: var(--el-text-color-secondary);
    }
  }
}
</style>
