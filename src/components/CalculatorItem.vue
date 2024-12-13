<script setup lang="ts">
import { inject, ref } from 'vue'

const axios: any = inject('axios')
if (!axios) {
  throw new Error('Axios instance is not provided. Make sure it is injected properly.')
}

const firstNumber = ref('')
const secondNumber = ref('')
const operator = ref('')
const result = ref<any | null>(null)

async function getDictionary() {
  
  try {
    const response = await axios.get(
      `http://localhost:8080/calculator?firstNumber=${firstNumber.value}&secondNumber=${secondNumber.value}&operator=${operator.value}`,
    )

    result.value = response.data
  } catch (error: any) {
    console.error('Error fetching data:', error)
    result.value = error.response.data
  }
}
</script>

<template>
  <h1 class="text-5xl text-center">Máy tính đơn giản</h1>
  <div class="flex justify-center">
    <div class="w-1/3 flex justify-center mt-10 border-2 border-blue-400 rounded-md">
      <div class="text-xl mt-5 mb-5">
        <p>Số thứ nhất</p>
        <input
          type="number"
          v-model="firstNumber"
          placeholder="Nhập số đầu tiên"
          class="w-96 border-2 border-blue-400 text-center rounded-md"
        />

        <p>Số thứ hai</p>
        <input
          type="number"
          v-model="secondNumber"
          placeholder="Nhập số thứ hai"
          class="w-96 border-2 border-blue-400 text-center rounded-md"
        />

        <p>Phép toán</p>
        <select v-model="operator" class="w-96 border-2 border-blue-400 text-center rounded-md">
          <option disabled value="">Chọn phép toán</option>
          <option>Cộng</option>
          <option>Trừ</option>
          <option>Nhân</option>
          <option>Chia</option>
        </select>

        <div class="flex justify-center">
          <button
            @click="getDictionary"
            class="ps-4 pe-4 rounded-lg bg-blue-600 text-white mt-5 h-9"
          >
            Tính toán
          </button>
        </div>

        <p class="mt-5 text-xl text-center text-green-500">Kết quả: {{ result }}</p>
      </div>
    </div>
  </div>
</template>
