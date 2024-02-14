<script setup>
import { GUEST_DATA } from '@/configs'
import { reactive, onMounted, watch, computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import dayjs from 'dayjs'

// 客人資料的狀態
const guestData = reactive({
  guests: []
})
// qs 的狀態
const route = useRoute()
const queryString = reactive({
  page: +route.query.page || 1,
  keyword: route.query.keyword || ''
})
const setPage = (page) => {
  queryString.page = page
}
// 獲得客人資料的函式

const getGuestData = async () => {
  try {
    const res = await fetch(GUEST_DATA + `?page=${queryString.page}&keyword=${queryString.keyword}`)
    const data = await res.json()
    guestData.guests = data
  } catch (ex) {
    console.log(ex)
  }
}
// 分頁顯示前三比與後三筆
const displayPages = computed(() => {
  const totalPages = guestData.guests.totalPages
  const currentPage = parseInt(queryString.page) || 1
  const pages = []
  for (let i = currentPage - 3; i <= currentPage + 3; i++) {
    if (i > 0 && i <= totalPages) {
      pages.push(i)
    }
  }
  return pages
})
onMounted(() => {
  getGuestData()
})
watch(queryString, () => {
  getGuestData()
})
</script>

<template>
  <div>
    <div class="d-flex">
      <!-- 分頁 -->
      <ul class="pagination">
        <li class="page-item">
          <RouterLink class="page-link" :to="`?page=1`" aria-label="Previous" @click="setPage(1)">
            <span aria-hidden="true">&laquo;</span>
          </RouterLink>
        </li>
        <li class="page-item" v-for="page in displayPages" :key="page">
          <RouterLink
            :class="{ 'page-link': true, active: page == queryString.page }"
            :to="`?page=${page}`"
            @click="setPage(page)"
            >{{ page }}</RouterLink
          >
        </li>
        <li class="page-item">
          <RouterLink
            :class="{
              'page-link': true,
              disabled: queryString.page == guestData.guests.totalPages
            }"
            :to="`?page=${guestData.guests.totalPages}`"
            aria-label="Next"
            @click="setPage(guestData.guests.totalPages)"
          >
            <span aria-hidden="true">&raquo;</span>
          </RouterLink>
        </li>
      </ul>
      <!--關鍵字搜尋-->
      <div class="input-group mb-3 w-25 ms-5">
        <span class="input-group-text" id="basic-addon1">搜尋</span>
        <input
          type="text"
          class="form-control"
          placeholder="請輸入關鍵字"
          aria-label="Username"
          aria-describedby="basic-addon1"
          v-model="queryString.keyword"
        />
      </div>
    </div>

    <div>
      第{{ queryString.page }}頁 / 共{{ guestData.guests.totalPages }}頁，共{{
        guestData.guests.totalRows
      }}筆
    </div>

    <!-- 客人資料列表 -->
    <div class="container-fluid mt-3">
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
                <th scope="col">建立時間</th>
                <th scope="col"><font-awesome-icon :icon="['fas', 'pen-to-square']" /></th>
                <th scope="col"><font-awesome-icon :icon="['fas', 'trash-can']" /></th>
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
                <td>{{ dayjs(guest.created_at).format('YYYY-MM-DD HH:mm:ss') }}</td>
                <td class="text-primary">
                  <font-awesome-icon :icon="['fas', 'pen-to-square']" />
                </td>
                <td class="text-danger">
                  <font-awesome-icon :icon="['fas', 'trash-can']" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
