<script setup lang="ts">
import { RouterView } from 'vue-router'
import AdminSidebar from './AdminSidebar.vue'
import AdminHeader from './AdminHeader.vue'
</script>

<template>
  <div class="min-h-screen flex bg-background">
    <AdminSidebar />
    <div class="flex-1 flex flex-col">
      <AdminHeader />
      <main class="flex-1 p-6 overflow-auto">
        <RouterView />
      </main>
    </div>
  </div>
</template>
