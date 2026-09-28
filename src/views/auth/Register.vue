<template>
  <!-- 本页作为 BrandPanel 布局右侧 router-view 的子路由，只渲染表单卡片 -->
  <div class="form-card">
    <router-link to="/auth/login" class="back-link">
      <el-icon><ArrowLeft /></el-icon>
      <span>返回登录</span>
    </router-link>
    <h2 class="form-title">创建您的账户</h2>
    <p class="form-subtitle">请填写注册信息</p>

    <el-form ref="formRef" :model="form" :rules="rules" label-position="top" size="large">
      <el-form-item label="用户名" prop="username">
        <el-input v-model="form.username" placeholder="请输入用户名" />
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email" placeholder="请输入邮箱" />
      </el-form-item>
      <el-form-item label="昵称" prop="nickname">
        <el-input v-model="form.nickname" placeholder="请输入昵称（可选）" />
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone" placeholder="请输入手机号（可选）" />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password" type="password" placeholder="请输入密码" show-password />
      </el-form-item>
      <el-form-item label="确认密码" prop="confirmPassword">
        <el-input
          v-model="form.confirmPassword"
          type="password"
          placeholder="请再次输入密码"
          show-password
          @keyup.enter="handleRegister"
        />
      </el-form-item>
      <el-button type="primary" class="submit-btn" :loading="loading" @click="handleRegister">
        注 册
      </el-button>
    </el-form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import type { FormInstance, FormRules } from "element-plus";
import { register } from "@/api/auth";

const router = useRouter();
const formRef = ref<FormInstance>();
const loading = ref(false);

const form = reactive({
  username: "",
  email: "",
  nickname: "",
  phone: "",
  password: "",
  confirmPassword: "",
});

const rules: FormRules = {
  username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
  email: [
    { required: true, message: "请输入邮箱", trigger: "blur" },
    { type: "email", message: "邮箱格式不正确", trigger: "blur" },
  ],
  phone: [{ pattern: /^1\d{10}$/, message: "手机号格式不正确", trigger: "blur" }],
  password: [{ required: true, message: "请输入密码", trigger: "blur" }],
  confirmPassword: [
    { required: true, message: "请再次输入密码", trigger: "blur" },
    {
      validator: (_rule, value, callback) => {
        if (value !== form.password) {
          callback(new Error("两次输入的密码不一致"));
        } else {
          callback();
        }
      },
      trigger: "blur",
    },
  ],
};

async function handleRegister() {
  const valid = await formRef.value?.validate().catch(() => false);
  if (!valid || loading.value) return;

  loading.value = true;
  try {
    await register({
      username: form.username,
      email: form.email,
      nickname: form.nickname || undefined,
      phone: form.phone || undefined,
      password: form.password,
      confirmPassword: form.confirmPassword,
      // 接口必填但注册页暂未提供选择项，默认值
      gender: 1,
      userType: 1,
    });
    ElMessage.success("注册成功");
    // 延时跳转，给用户留出看到提示的时间；期间保持 loading 防止重复提交
    setTimeout(() => {
      router.push("/auth/login");
    }, 1000);
  } catch {
    // 失败提示由 request 拦截器统一弹出（后端 msg / 网络异常）
    loading.value = false;
  }
}
</script>

<style lang="scss" scoped>
.form-card {
  width: 384px;
  max-height: 92vh;
  overflow-y: auto;
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
