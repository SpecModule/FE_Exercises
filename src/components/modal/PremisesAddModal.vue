<script setup lang="ts">
import { ref, defineEmits } from 'vue'

const id = ref("")
const name = ref("")
const address = ref("");
const type = ref("");
const area = ref<number | null>(null);
const rentPrice = ref<number | null>(null);
const startDate = ref("");
const description = ref("");

const emit = defineEmits(['add', 'close'])

function addPre() {
  const newPre = {
    id: id.value,
    name: name.value,
    address: address.value,
    type: type.value,
    area: area.value,
    rentPrice: rentPrice.value,
    startDate: startDate.value,
    description: description.value,
  }
  emit('add', newPre);
}
</script>

<template>
  <div class="container mx-auto p-6">

    <form @submit.prevent="addPre" class="bg-white shadow-md rounded-lg p-6 max-w-xl mx-auto border-2">
      <h1 class="text-2xl font-bold text-center mb-6">THÊM MỚI MẶT BẰNG</h1>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Mã mặt bằng:</label>
        <input
          v-model="id"
          type="text"
          class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Tên mặt bằng:</label>
        <input
          v-model="name"
          type="text"
          class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Địa chỉ:</label>
        <input
          v-model="address"
          type="text"
          class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <div class="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Diện tích (m2):</label>
          <input
            v-model="area"
            type="number"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-700 mb-1">Loại Mặt bằng:</label>
          <select
            v-model="type"
            class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
          >
            <option value="" disabled>Chọn loại mặt bằng</option>
            <option value="Văn phòng">Văn phòng</option>
            <option value="Cửa hàng">Cửa hàng</option>
            <option value="Nhà ở">Nhà ở</option>
          </select>
        </div>
      </div>

      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Giá thuê (VNĐ/tháng):</label>
        <input
          v-model="rentPrice"
          type="number"
          class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Ngày bắt đầu cho thuê:</label>
        <input
          v-model="startDate"
          type="date"
          class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        />
      </div>

      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1">Mô tả chi tiết:</label>
        <textarea
          v-model="description"
          rows="4"
          class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300"
        ></textarea>
      </div>

      <div class="flex justify-end space-x-4">
        <button
          type="button"
          @click="$emit('close')"
          class="px-4 py-2 bg-red-500 text-white rounded-md shadow hover:bg-red-600"
        >
          Hủy
        </button>
        <button
          type="submit"
          class="px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600"
        >
          Lưu
        </button>
      </div>
    </form>
  </div>
</template>
