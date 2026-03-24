<script setup lang="ts">
import { NConfigProvider, NMessageProvider, NDialogProvider, darkTheme } from 'naive-ui'
import { darkOverrides } from '@/design-system/theme/naive-dark-overrides'
</script>

<template>
  <NConfigProvider :theme="darkTheme" :theme-overrides="darkOverrides">
    <NMessageProvider>
      <NDialogProvider>
        <router-view />
      </NDialogProvider>
    </NMessageProvider>
  </NConfigProvider>
</template>
