<template>
  <fwb-modal v-if="isShowModal" @close="$emit('close')">
    <template #header>
      <div class="flex items-center text-lg">Chi tiết nhân viên</div>
    </template>
    <template #body>
      <p><strong>Tên:</strong> {{ employee.name }}</p>
      <p><strong>Ngày sinh:</strong> {{ employee.birthday }}</p>
      <p><strong>Giới tính:</strong> {{ employee.gender }}</p>
      <p><strong>Lương:</strong> {{ employee.salary }}</p>
    </template>
    <template #footer>
      <button @click="$emit('close')" class="ps-4 pe-4 rounded-md bg-red-500 text-white">
        Đóng
      </button>
    </template>
  </fwb-modal>
</template>

<script lang="ts">
export default {
  props: {
    employee: {
      type: Object,
      required: true,
    },
  },
};
</script>
