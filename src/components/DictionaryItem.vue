<script setup lang="ts">
import { inject, ref } from "vue";

const axios = inject('axios');
if (!axios) {
  throw new Error('Axios instance is not provided. Make sure it is injected properly.');
}

const word = ref("");
const result = ref<string | null>(null);

async function getDictionary() {
  if (!word.value) {
    result.value = "Vui lòng nhập một từ!";
    return;
  }

  try {
    const response = await axios.get(`http://localhost:8080/dictionary?word=${word.value}`);
    result.value = response.data;
  } catch (error) {
    console.error("Error fetching dictionary data:", error);
    result.value = error.response.data;
  }
}
</script>

<template>
  <h1 class="text-5xl text-center">Từ điển</h1>
  <div class="flex justify-center mt-5 h-10">
    <input
      type="text"
      v-model="word"
      placeholder="Nhập từ"
      class="w-60 border-2 border-blue-400 text-center rounded-s-md"
    />
    <button
      @click="getDictionary"
      class="ps-4 pe-4 rounded-e-md bg-blue-600 text-white"
    >
      Tìm kiếm
    </button>
  </div>
  <p class="mt-2 text-xl text-center">{{ result }}</p>
</template>
