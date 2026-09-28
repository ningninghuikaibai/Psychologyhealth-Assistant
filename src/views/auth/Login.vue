<template>
  <div class="auth-page">
    <!-- 左侧品牌区（共用组件） -->
    <BrandPanel />

    <!-- 右侧登录表单 -->
    <div class="form-panel">
      <div class="form-card">
        <router-link to="/" class="back-link">
          <el-icon><ArrowLeft /></el-icon>
          <span>返回首页</span>
        </router-link>
        <h2 class="form-title">登录您的账户</h2>
        <p class="form-subtitle">输入您的登录信息</p>

        <el-form ref="formRef" :model="form" :rules="rules" label-position="top" size="large">
          <el-form-item label="用户名或邮箱" prop="username">
            <el-input v-model="form.username" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              v-model="form.password"
              type="password"
              placeholder="请输入密码"
              show-password
              @keyup.enter="handleLogin"
            />
          </el-form-item>
          <el-button type="primary" class="submit-btn" :loading="loading" @click="handleLogin">
            登录账户
          </el-button>
        </el-form>

        <p class="form-footer">
          还没有账户？
          <router-link to="/auth/register" class="footer-link">去注册</router-link>
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import type { FormInstance, FormRules } from "element-plus";
import BrandPanel from "@/components/BrandPanel.vue";
import { login } from "@/api/auth";

const router = useRouter();
const formRef = ref<FormInstance>();
const loading = ref(false);

const form = reactive({
  username: "",
  password: "",
});

const rules: FormRules = {
  username: [{ required: true, message: "请输入用户名或邮箱", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
};

async function handleLogin() {
  const valid = await formRef.value?.validate().catch(() => false);
  if (!valid || loading.value) return;

  loading.value = true;
  try {
    const data = await login(form.username, form.password);
    localStorage.setItem("token", data.token);
    localStorage.setItem("userInfo", JSON.stringify(data.userInfo));
    ElMessage.success("登录成功");
    router.push("/back/dashboard");
  } catch {
    // 失败提示由 request 拦截器统一弹出（后端 msg / 网络异常）
  } finally {
    loading.value = false;
  }
}
</script>

<style lang="scss" scoped>
.auth-page {
  display: flex;
  min-height: 100vh;
}

.form-panel {
  flex: 1;
  background:
    radial-gradient(circle at 20% 20%, rgb(252 213 226 / 55%), transparent 50%),
    radial-gradient(circle at 80% 80%, rgb(191 219 254 / 55%), transparent 55%),
    linear-gradient(135deg, #fdf3f6 0%, #f3f0fa 50%, #eef5fc 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px 24px;
}

.form-card {
  width: 384px;
  padding: 34px 32px 28px;
  border: 1px solid rgba(255, 255, 255, 0.8);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.82);
  box-shadow:
    0 22px 48px rgba(74, 114, 107, 0.14),
    inset 0 1px 0 rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  position: relative;

  .back-link {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-bottom: 36px;
    font-size: 14px;
    font-weight: 600;
    color: #4d6963;
    text-decoration: none;
    transition:
      color 0.25s ease,
      transform 0.25s ease;

    &:hover {
      color: var(--app-primary-dark);
      transform: translateX(2px);
    }
  }

  .form-title {
    margin: 0 0 10px;
    font-size: 31px;
    font-weight: 700;
    color: var(--app-text);
    line-height: 1.25;
    text-align: center;
  }

  .form-subtitle {
    margin: 0;
    font-size: 16px;
    color: var(--app-muted);
    text-align: center;
  }

  :deep(.el-form) {
    margin-top: 44px;
  }

  :deep(.el-form-item__label) {
    color: #405651;
    font-weight: 600;
  }

  :deep(.el-input__wrapper) {
    border-radius: 8px;
    background: rgba(248, 252, 250, 0.88);
    box-shadow: inset 0 0 0 1px rgba(190, 216, 211, 0.9) !important;
    transition:
      box-shadow 0.28s ease,
      background-color 0.28s ease,
      transform 0.28s ease;
  }

  :deep(.el-input__wrapper:hover) {
    background: rgba(255, 255, 255, 0.96);
    box-shadow: inset 0 0 0 1px rgba(128, 180, 170, 0.95) !important;
  }

  :deep(.el-input__wrapper.is-focus) {
    background: rgba(255, 255, 255, 0.98);
    box-shadow:
      inset 0 0 0 1px rgba(47, 143, 131, 0.95),
      0 0 0 4px rgba(47, 143, 131, 0.12) !important;
    transform: translateY(-1px);
  }

  .submit-btn {
    width: 100%;
    margin-top: 18px;
    height: 52px;
    border: none;
    border-radius: 8px;
    background: linear-gradient(135deg, var(--app-primary) 0%, var(--app-primary-dark) 100%);
    box-shadow: 0 14px 28px rgba(47, 143, 131, 0.22);
    font-size: 17px;
    font-weight: 600;
    transition:
      transform 0.28s ease,
      box-shadow 0.28s ease,
      filter 0.28s ease;

    &:hover,
    &:focus {
      background: linear-gradient(135deg, var(--app-primary) 0%, var(--app-primary-dark) 100%);
      transform: translateY(-2px);
      box-shadow: 0 18px 34px rgba(47, 143, 131, 0.28);
      filter: brightness(1.03);
    }

    &:active {
      transform: translateY(-1px);
    }
  }

  .form-footer {
    margin: 0;
    padding: 24px 0 0;
    text-align: center;
    color: #4d625d;

    .footer-link {
      margin-left: 6px;
      color: var(--app-primary-dark);
      font-weight: 600;
      text-decoration: none;
      transition: color 0.25s ease;

      &:hover {
        color: var(--app-primary);
      }
    }
  }
}

@media (max-width: 640px) {
  .form-card {
    width: min(100%, 384px);
    padding: 28px 22px 24px;

    .form-title {
      font-size: 30px;
    }

    .form-subtitle {
      font-size: 18px;
    }

    :deep(.el-form) {
      margin-top: 36px;
    }
  }
}
</style>
