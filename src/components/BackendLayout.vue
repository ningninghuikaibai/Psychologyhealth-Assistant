<template>
    <div class="backend-layout">
        <el-container>
             <SideBar />
            <el-container>
                <NavBar />
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>
<script setup lang="ts">
import SideBar from '@/components/SideBar.vue'
import NavBar from '@/components/NavBar.vue'
</script>
<style lang="scss" scoped>
.backend-layout {
    height: 100vh;
}
</style>
