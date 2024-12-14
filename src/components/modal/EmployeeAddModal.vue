<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import { FwbButton, FwbModal } from 'flowbite-vue'

const name = ref("")
const birthday = ref("")
const salary = ref()
const gender = ref("")
const phone = ref("")

const emit = defineEmits(['add', 'close'])

function addEmployee() {
  const newEmployee = {
    name: name.value,
    birthday: birthday.value,
    gender: gender.value,
    phone: phone.value,
    salary: salary.value,
  }
  emit('add', newEmployee)
}
</script>

<template>
  <fwb-modal @close="emit('close')" class="bg-red-100 p-5 rounded-xl">
    <template #header>
      <div class="flex items-center text-lg">Thêm nhân viên</div>
    </template>
    <template #body>
      <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">Tên</p>
      <input type="text" v-model="name" />
      <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">Ngày sinh</p>
      <input
          type="date"
          v-model="birthday"
          class="w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
      />
      <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">Giới tính</p>
      <select v-model="gender" class="w-96 border-2 border-blue-400 text-center rounded-md">
        <option disabled value="">Chọn giới tính</option>
        <option>Nam</option>
        <option>Nữ</option>
      </select>
      <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">Số điện thoại</p>
      <input type="text" v-model="phone" />
      <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">Lương</p>
      <input type="number" v-model="salary" />
    </template>
    <template #footer>
      <div class="flex justify-between mt-3">
        <fwb-button @click="emit('close')" class="ps-4 pe-4 rounded-md bg-red-500 text-white">Đóng</fwb-button>
        <fwb-button @click="addEmployee" class="ps-4 pe-4 rounded-md bg-blue-500 text-white">Thêm mới</fwb-button>
      </div>
    </template>
  </fwb-modal>
</template>
