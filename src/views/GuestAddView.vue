<script setup>
import { reactive } from 'vue';
import { GUEST_ADD } from '@/configs';
const guestAdd = reactive({
  guest_name: '',
  national_id: '',
  passport_id: '',
  phone: '',
  company_name: '',
  compiled: ''
});
// 送出資料的函式
const submitGuestData = async () => {
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
        <input type="text" class="form-control" v-model="guestAdd.guest_name" />
      </div>
      <div class="mb-3">
        <label for="national_id" class="form-label">*身分證字號/居留證號碼</label>
        <input type="text" class="form-control" v-model="guestAdd.national_id" />
      </div>
      <div class="mb-3">
        <label for="passport_id" class="form-label">護照號碼</label>
        <input type="text" class="form-control" v-model="guestAdd.passport_id" />
      </div>
      <div class="mb-3">
        <label for="phone" class="form-label">*聯絡電話</label>
        <input type="text" class="form-control" v-model="guestAdd.phone" />
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
