<script setup>
import { RouterLink } from 'vue-router';
</script>

<template>
  <div
    class="d-flex flex-column flex-shrink-0 p-3 text-white bg-success bg-gradient"
    style="width: 200px; height: 100vh"
  >
    <a href="/" class="d-flex align-items-center ms-3 text-white text-decoration-none">
      <span class="fs-4">LongGuan</span>
    </a>
    <hr />
    <ul class="nav nav-pills flex-column mb-auto">
      <li class="nav-item">
        <RouterLink to="/guestlist" class="nav-link active" aria-current="page">
          客人資料列表
        </RouterLink>
      </li>
    </ul>
    <hr />
    <div class="dropdown">
      <a
        href="#"
        class="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
        id="dropdownUser1"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        <strong>mdo</strong>
      </a>
      <ul
        class="dropdown-menu dropdown-menu-dark text-small shadow"
        aria-labelledby="dropdownUser1"
      >
        <li><a class="dropdown-item" href="#">New project...</a></li>
        <li><a class="dropdown-item" href="#">Settings</a></li>
        <li><a class="dropdown-item" href="#">Profile</a></li>
        <li><hr class="dropdown-divider" /></li>
        <li><a class="dropdown-item" href="#">Sign out</a></li>
      </ul>
    </div>
  </div>
</template>

<style scoped></style>
