<template>
  <el-button type="primary" @click="handleClick">主要按钮</el-button>
  <el-input v-model="text" placeholder="请输入" />
</template>

<script setup lang="ts">
import { ref } from 'vue'

const text = ref('')
function handleClick() {
  ElMessage.success('点击成功！')
}
</script>
