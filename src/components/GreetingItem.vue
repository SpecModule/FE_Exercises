<script setup lang="ts">
import { inject, ref } from "vue";

const axios:any = inject('axios');
if (!axios) {
  throw new Error('Axios instance is not provided. Make sure it is injected properly.');
}

const name = ref("");
const result = ref<string | null>(null);

async function Greeting() {

  try {
    const response = await axios.get(`http://localhost:8080/greeting?name=${name.value}`);
    result.value = response.data;
  } catch (error:any) {
    console.error("Error fetching data:", error);
    result.value = error.response.data;
  }
}
</script>

<template>
  <h1 class="text-5xl text-center">{{ result }}</h1>
  <div class="flex justify-center mt-5 h-10">
    <input
      type="text"
      v-model="name"
      placeholder="Nhập tên bạn"
      class="w-60 border-2 border-blue-400 text-center rounded-s-md"
    />
    <button
      @click="Greeting"
      class="ps-4 pe-4 rounded-e-md bg-blue-600 text-white"
    >
      Submit
    </button>
  </div>
</template>
