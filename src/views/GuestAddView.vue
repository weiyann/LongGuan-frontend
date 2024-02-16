<script setup>
import { reactive, ref } from 'vue';
import { GUEST_ADD } from '@/configs';
import { useRouter, useRoute } from 'vue-router';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';

const authStore = useAuthStore();
const { token } = storeToRefs(authStore);

const route = useRoute();
const router = useRouter();

// 如果沒登入就導回登入頁面
if (!token.value && route.path !== '/login') {
  router.push('/login');
}

const guestAdd = reactive({
  guest_name: '',
  national_id: '',
  passport_id: '',
  phone: '',
  company_name: '',
  compiled: ''
});
let isSubmitted = ref(false);
// 送出資料的函式
const submitGuestData = async () => {
  isSubmitted.value = true;
  // 必填欄位的驗證
  if (!guestAdd.guest_name || !guestAdd.national_id || !guestAdd.phone) {
    // alert('请填写必填字段！');
    return;
  }
  try {
    const res = await fetch(GUEST_ADD, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        guestAdd
      })
    });
    const data = await res.json();
    console.log(data);
    if (data.success) {
      confirm('新增成功');
      router.push('/guestlist');
    } else {
      alert('新增失敗');
    }
  } catch (ex) {
    console.log(ex);
  }
};
</script>

<template>
  <div class="w-50">
    <h3>新增客人資料</h3>
    <div class="text-secondary mb-3">(*必填)</div>
    <form>
      <div class="mb-3">
        <label for="guest_name" class="form-label">*姓名</label>
        <input
          type="text"
          :class="{
            'form-control': true,
            'border-danger': !guestAdd.guest_name && isSubmitted
          }"
          v-model="guestAdd.guest_name"
        />
      </div>
      <div class="mb-3">
        <label for="national_id" class="form-label">*身分證字號/居留證號碼</label>
        <input
          type="text"
          :class="{
            'form-control': true,
            'border-danger': !guestAdd.national_id && isSubmitted
          }"
          v-model="guestAdd.national_id"
        />
      </div>
      <div class="mb-3">
        <label for="passport_id" class="form-label">護照號碼</label>
        <input type="text" class="form-control" v-model="guestAdd.passport_id" />
      </div>
      <div class="mb-3">
        <label for="phone" class="form-label">*聯絡電話</label>
        <input
          type="text"
          :class="{
            'form-control': true,
            'border-danger': !guestAdd.phone && isSubmitted
          }"
          v-model="guestAdd.phone"
        />
      </div>
      <div class="mb-3">
        <label for="company_name" class="form-label">公司名稱</label>
        <input type="text" class="form-control" v-model="guestAdd.company_name" />
      </div>
      <div class="mb-3">
        <label for="compiled" class="form-label">統編</label>
        <input type="text" class="form-control" v-model="guestAdd.compiled" />
      </div>

      <button type="button" class="btn btn-primary" @click="submitGuestData">Submit</button>
    </form>
  </div>
</template>

<style scoped></style>
