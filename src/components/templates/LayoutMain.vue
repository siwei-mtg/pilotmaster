<script setup lang="ts">
import DsHeader from '@/components/organisms/DsHeader.vue'
</script>

<template>
  <div class="flex flex-col h-screen w-screen overflow-hidden bg-bg-base">
    <DsHeader />
    <main class="flex-1 overflow-y-auto">
      <div class="p-6">
        <router-view v-slot="{ Component }">
          <Transition name="fade-slide" mode="out-in">
            <component :is="Component" />
          </Transition>
        </router-view>
      </div>
    </main>
  </div>
</template>
