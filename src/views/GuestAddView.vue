<script setup></script>

<template>
  <div class="w-50">
    <h3>新增客人資料</h3>
    <div class="text-secondary mb-3">(*必填)</div>
    <form>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">*姓名</label>
        <input type="text" class="form-control" />
      </div>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">*身分證字號/居留證號碼</label>
        <input type="text" class="form-control" />
      </div>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">護照號碼</label>
        <input type="text" class="form-control" />
      </div>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">*聯絡電話</label>
        <input type="text" class="form-control" />
      </div>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">公司名稱</label>
        <input type="text" class="form-control" />
      </div>
      <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">統編</label>
        <input type="text" class="form-control" />
      </div>

      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
  </div>
</template>

<style scoped></style>
