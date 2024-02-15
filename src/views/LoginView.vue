<script setup>
import { reactive } from 'vue';
import { LOGIN } from '@/configs';
import { useRouter } from 'vue-router';

const router = useRouter();

const loginData = reactive({
  account: '',
  password: ''
});

const handleLogin = async () => {
  try {
    const res = await fetch(LOGIN, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        loginData
      })
    });
    const data = await res.json();
    console.log(data);
    if (data.success) {
      const { token } = data;
      // 成功登入時, 寫入 localStorage 做長時間的狀態保存
      localStorage.setItem('auth', JSON.stringify({ token }));
      router.push('/guestlist');
    }
  } catch (ex) {
    console.log(ex);
  }
};
</script>

<template>
  <div class="card w-50">
    <div class="card-body">
      <h5 class="card-title mb-4 text-center">登入</h5>
      <form>
        <div class="mb-3">
          <label for="account" class="form-label">帳號</label>
          <input type="text" class="form-control" id="account" v-model="loginData.account" />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">密碼</label>
          <input type="password" class="form-control" id="password" v-model="loginData.password" />
        </div>

        <button type="button" class="btn btn-primary" @click="handleLogin">登入</button>
      </form>
    </div>
  </div>
</template>

<style scoped></style>
