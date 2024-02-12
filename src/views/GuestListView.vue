<script setup>
import { GUEST_DATA } from '@/configs'
import { reactive, onMounted } from 'vue'
const guestData = reactive({
  guests: []
})

const getGuestData = async () => {
  try {
    const res = await fetch(GUEST_DATA)
    const data = await res.json()
    console.log(data)
    guestData.guests = data
  } catch (ex) {
    console.log(ex)
  }
}

onMounted(() => {
  getGuestData()
})
</script>

<template>
  <div>
    <h1 class="mb-4">顧客列表</h1>
    <div class="container-fluid">
      <div class="row">
        <div class="col-10">
          <table class="table table-striped table-bordered border-success-subtle table-hover">
            <thead>
              <tr class="table-success">
                <th scope="col">編號</th>
                <th scope="col">客人姓名</th>
                <th scope="col">身分證字號/居留證號碼</th>
                <th scope="col">護照號碼</th>
                <th scope="col">聯絡電話</th>
                <th scope="col">公司名稱</th>
                <th scope="col">統編</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="guest in guestData.guests.rows" :key="guest.guest_id">
                <th scope="row">{{ guest.guest_id }}</th>
                <td>{{ guest.guest_name }}</td>
                <td>{{ guest.national_id }}</td>
                <td>{{ guest.passport_id }}</td>
                <td>{{ guest.phone }}</td>
                <td>{{ guest.company_name }}</td>
                <td>{{ guest.compiled }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
