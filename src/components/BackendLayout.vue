<template>
    <div class="backend-layout">
        <el-container>
            <SideBar :collapsed="collapsed" />
            <el-container class="main-container">
                <NavBar :collapsed="collapsed" @toggle="collapsed = !collapsed" />
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script setup lang="ts">
import { ref } from 'vue'
import SideBar from '@/components/SideBar.vue'
import NavBar from '@/components/NavBar.vue'

const collapsed = ref(false)
</script>
<style lang="scss" scoped>
.backend-layout {
    height: 100vh;

    // 强制内层 container 纵向排列，不依赖 el-header 自动检测
    :deep(.main-container) {
        flex-direction: column;
    }
}
</style>
