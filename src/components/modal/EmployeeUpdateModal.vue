<script setup lang="ts">
import { defineProps } from 'vue'
import { FwbButton, FwbModal } from 'flowbite-vue'

const props = defineProps({
  employee: {
    type: Object,
    required: true
  }
})
</script>

<template>
  <fwb-modal @close="$emit('close')" class="bg-red-100 p-5 rounded-xl">
    <template #header>
      <div class="flex text-center text-lg">Cập nhật thông tin</div>
    </template>
    <template #body>
      <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">Tên</p>
      <input type="text" v-model="employee.name" />
      <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">Ngày sinh</p>
      <input
          type="date"
          v-model="employee.birthday"
          class="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />
      <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">Giới tính</p>
      <input type="text" v-model="employee.gender" />
      <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">Số điện thoại</p>
      <input type="text" v-model="employee.phone" />
      <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">Lương</p>
      <input type="text" v-model="employee.salary" />
    </template>
    <template #footer>
      <div class="flex justify-between mt-3">
        <fwb-button @click="$emit('close')" class="ps-4 pe-4 rounded-md bg-red-500 text-white">Close</fwb-button>
        <fwb-button @click="$emit('update', employee.id)" class="ps-4 pe-4 rounded-md bg-blue-500 text-white" >Update</fwb-button>
      </div>
    </template>
  </fwb-modal>
</template>
