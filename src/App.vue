<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>

    <div class="wrapper">
      <nav class="flex justify-center gap-5 mb-5 text-xl">
        <RouterLink to="/greeting">Greeting</RouterLink>
        <RouterLink to="/dictionary">Dictionary</RouterLink>
        <RouterLink to="/calculator">Calculator</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
