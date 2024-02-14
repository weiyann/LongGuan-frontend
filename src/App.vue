<script setup>
import { RouterView } from 'vue-router'
import SideBar from '@/components/layout/Sidebar.vue'
</script>

<template>
  <div class="container-fluid d-flex ps-0">
    <!-- 側邊欄 -->
    <aside>
      <SideBar></SideBar>
    </aside>
    <!-- 主要內容 -->
    <main class="mt-5">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
main {
  width: 100%;
  margin-left: 300px;
}
aside {
  position: fixed;
}
</style>
