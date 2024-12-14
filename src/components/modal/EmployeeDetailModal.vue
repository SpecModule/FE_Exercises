<script setup lang="ts">
import { defineProps } from 'vue'
import { FwbButton, FwbModal } from 'flowbite-vue'

const props = defineProps<{
  employee: {
    id: number;
    name: string;
    birthday: string;
    gender: string;
    phone: string;
    salary: number;
  };
}>();

console.log(props)
</script>

<template>
  <fwb-modal @close="$emit('close')" class="bg-red-100 p-5 rounded-xl">
    <template #header>
      <div class="flex items-center text-lg">Chi tiết thông tin</div>
    </template>
    <template #body>
      <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">Tên</p>
      <input type="text" v-model="employee.name" disabled />
      <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">Ngày sinh</p>
      <input type="text" v-model="employee.birthday" disabled />
      <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">Giới tính</p>
      <input type="text" v-model="employee.gender" disabled />
      <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">Số điện thoại</p>
      <input type="text" v-model="employee.phone" disabled />
      <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">Lương</p>
      <input type="text" v-model="employee.salary" disabled />
    </template>
    <template #footer>
      <div class="flex justify-between mt-3">
        <fwb-button @click="$emit('close')"class="ps-4 pe-4 rounded-md bg-red-500 text-white">Close</fwb-button>
      </div>
    </template>
  </fwb-modal>
</template>
