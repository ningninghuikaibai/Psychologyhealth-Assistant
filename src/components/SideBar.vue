<template>
  <el-aside width="264px">
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
    >
      <el-menu-item index="2">
        <el-icon><icon-menu /></el-icon>
        <span>Navigator Two</span>
      </el-menu-item>
    </el-menu>
  </el-aside>
</template>
<script setup lang="ts">
const handleOpen = (key: string) => {
  console.log(key);
};
const handleClose = (key: string) => {
  console.log(key);
};
</script>
