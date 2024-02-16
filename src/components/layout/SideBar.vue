<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
const router = useRouter();
// const { clearLocalStorage, token, guest_name } = useAuthStore();
const authStore = useAuthStore();
const { clearLocalStorage } = authStore;
const { token, guest_name } = storeToRefs(authStore);

const toLogin = () => {
  router.push('/login');
};
const toGuestList = () => {
  if (!token.value || !guest_name.value) {
    alert('請先登入');
  } else {
    router.push('/guestlist');
  }
};
const logout = () => {
  token.value = '';
  guest_name.value = '';
  clearLocalStorage();
  alert('已登出');
  router.push('/login');
};
</script>

<template>
  <div
    class="d-flex flex-column flex-shrink-0 p-3 text-white bg-success bg-gradient"
    style="width: 200px; height: 100vh"
  >
    <a href="/" class="text-center text-white text-decoration-none">
      <span class="fs-4">LongGuan</span>
    </a>
    <hr />
    <div v-if="token && guest_name" class="text-center mb-3 fs-3">{{ guest_name }}</div>
    <button type="button" class="btn btn-light" @click="logout" v-if="token && guest_name">
      登出
    </button>
    <button type="button" class="btn btn-light" @click="toLogin" v-else>登入</button>

    <hr />
    <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item d-flex justify-content-center" id="guest-list-btn">
        <button class="nav-link text-center text-light" aria-current="page" @click="toGuestList">
          客人資料列表
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
#guest-list-btn:hover {
  background-color: rgb(7, 125, 107);
  border-radius: 0.375rem;
}
</style>
