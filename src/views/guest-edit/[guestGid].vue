<script setup>
import { GUEST_EDIT, GUEST_EDIT_API } from '@/configs';
import { useRoute, useRouter } from 'vue-router';
import { onMounted, reactive, ref } from 'vue';
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
const guestData = reactive({
  guest: {}
});
const isSubmitted = ref(false);
const gid = +route.params.gid;
console.log(route);

const getGuestData = async () => {
  try {
    const res = await fetch(GUEST_EDIT + `/${gid}`);
    const data = await res.json();
    console.log(data);
    guestData.guest = data.row;
  } catch (ex) {
    console.log(ex);
  }
};

// 送出修改的表單
const submitGuestData = async () => {
  isSubmitted.value = true;
  // 必填欄位的驗證
  if (!guestData.guest.guest_name || !guestData.guest.national_id || !guestData.guest.phone) {
    return;
  }
  try {
    const res = await fetch(GUEST_EDIT_API + `/${gid}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(guestData.guest)
    });
    const data = await res.json();
    if (data.success) {
      confirm('修改成功');
      router.push('/guestlist');
    } else {
      alert('修改失敗');
    }
  } catch (ex) {
    console.log(ex);
  }
};

onMounted(() => {
  getGuestData();
});
</script>

<template>
  <div class="w-50">
    <h3>編輯客人資料</h3>
    <div class="text-secondary mb-3">(*必填)</div>
    <form>
      <div class="mb-3">
        <label for="guest_name" class="form-label">*姓名</label>
        <input
          type="text"
          :class="{
            'form-control': true,
            'border-danger': !guestData.guest.guest_name && isSubmitted
          }"
          v-model="guestData.guest.guest_name"
        />
      </div>
      <div class="mb-3">
        <label for="national_id" class="form-label">*身分證字號/居留證號碼</label>
        <input
          type="text"
          :class="{
            'form-control': true,
            'border-danger': !guestData.guest.national_id && isSubmitted
          }"
          v-model="guestData.guest.national_id"
        />
      </div>
      <div class="mb-3">
        <label for="passport_id" class="form-label">護照號碼</label>
        <input type="text" class="form-control" v-model="guestData.guest.passport_id" />
      </div>
      <div class="mb-3">
        <label for="phone" class="form-label">*聯絡電話</label>
        <input
          type="text"
          :class="{
            'form-control': true,
            'border-danger': !guestData.guest.phone && isSubmitted
          }"
          v-model="guestData.guest.phone"
        />
      </div>
      <div class="mb-3">
        <label for="company_name" class="form-label">公司名稱</label>
        <input type="text" class="form-control" v-model="guestData.guest.company_name" />
      </div>
      <div class="mb-3">
        <label for="compiled" class="form-label">統編</label>
        <input type="text" class="form-control" v-model="guestData.guest.compiled" />
      </div>

      <button type="button" class="btn btn-primary" @click="submitGuestData">Submit</button>
    </form>
  </div>
</template>

<style scoped></style>
