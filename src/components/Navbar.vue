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
    <el-dropdown class="user-dropdown" @command="handleCommand">
      <div class="user-info">
        <el-avatar :src="userAvatar" :size="36" />
        <span class="user-name">{{ isLoggedIn ? "用户" : "未登录" }}</span>
        <el-icon :size="14" class="arrow-icon">
          <ArrowDown />
        </el-icon>
      </div>
      <template #dropdown>
        <el-dropdown-menu>
          <template v-if="isLoggedIn">
            <el-dropdown-item command="profile">个人中心</el-dropdown-item>
            <el-dropdown-item divided command="logout">退出登录</el-dropdown-item>
          </template>
          <el-dropdown-item v-else command="login">去登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-header>
</template>

<script setup lang="ts">
import { computed, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import userAvatar from "@/assets/images/user.jpg";
import { logout } from "@/api/auth";

defineProps<{ collapsed: boolean }>();
const emit = defineEmits<{ toggle: [] }>();

const route = useRoute();
const router = useRouter();

// 从当前路由 meta 中读取页面标题
const currentTitle = computed(() => String(route.meta?.title ?? ""));

// 登录状态：以 localStorage 中是否存在 token 为准
const isLoggedIn = ref(!!localStorage.getItem("token"));

/** 下拉菜单指令处理 */
async function handleCommand(command: string) {
  if (command === "login") {
    router.push("/auth/login");
    return;
  }
  if (command === "profile") {
    ElMessage.info("个人中心开发中");
    return;
  }
  if (command === "logout") {
    try {
      await ElMessageBox.confirm("确认退出登录吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      });
    } catch {
      return;
    }
    try {
      await logout();
    } catch {
      // 接口失败也继续清理本地登录态
    }
    localStorage.removeItem("token");
    localStorage.removeItem("userInfo");
    isLoggedIn.value = false;
    ElMessage.success("已退出登录");
    router.push("/auth/login");
  }
}
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
