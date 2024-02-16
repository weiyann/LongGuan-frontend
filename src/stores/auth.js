import { defineStore } from 'pinia';
import { ref } from 'vue';

export const useAuthStore = defineStore('auth', () => {
  const auth = JSON.parse(localStorage.getItem('auth')) || {};

  const token = ref(auth.token);

  const guest_name = ref(auth.guest_name);

  const clearLocalStorage = () => {
    localStorage.removeItem('auth');
    console.log('登出');
  };

  return {
    token,
    guest_name,
    clearLocalStorage
  };
});
