<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>

    <div class="wrapper">
      <nav>
        <RouterLink to="/greeting">Greeting</RouterLink>
        <RouterLink to="/dictionary">Dictionary</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>
