<script setup>
import { RouterView } from 'vue-router';
import SideBar from '@/components/layout/SideBar.vue';
</script>

<template>
  <div class="container-fluid d-flex ps-0">
    <!-- 側邊欄 -->
    <aside>
      <SideBar></SideBar>
    </aside>
    <!-- <div id="aside"></div> -->
    <!-- 主要內容 -->
    <main class="mt-5">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
main {
  width: 100%;
  margin-left: 200px;
  display: flex;
  justify-content: center;
}
aside {
  position: fixed;
}
/* #aside {
  width: 250px;
} */
</style>
