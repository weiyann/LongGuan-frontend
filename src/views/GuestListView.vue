<script setup>
import { GUEST_DATA } from '@/configs'
import { reactive, onMounted, watch } from 'vue'
import { useRoute, RouterLink } from 'vue-router'

// 客人資料的狀態
const guestData = reactive({
  guests: []
})
// qs 的狀態
const route = useRoute()
const queryString = reactive({
  page: +route.query.page || 1
})
const getGuestData = async () => {
  console.log(route.query)
  try {
    const res = await fetch(GUEST_DATA + `?page=${queryString.page}`)
    const data = await res.json()
    console.log(data)
    guestData.guests = data
  } catch (ex) {
    console.log(ex)
  }
}
const setPage = (page) => {
  queryString.page = page
}

onMounted(() => {
  getGuestData()
})
watch(queryString, () => {
  getGuestData()
})
</script>

<template>
  <div>
    <h1 class="mb-4">顧客列表</h1>
    <ul class="pagination">
      <li class="page-item" v-for="page in guestData.guests.totalPages" :key="page">
        <RouterLink
          :class="{ 'page-link': true, active: page == queryString.page }"
          :to="`?page=${page}`"
          @click="setPage(page)"
          >{{ page }}</RouterLink
        >
      </li>
    </ul>
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
