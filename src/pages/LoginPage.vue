<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { NInput, NButton } from 'naive-ui'
import DsIcon from '@/components/atoms/DsIcon.vue'

const router = useRouter()
const username = ref('')
const password = ref('')
const loading = ref(false)

async function handleLogin() {
  loading.value = true
  // Mock login
  await new Promise(r => setTimeout(r, 800))
  loading.value = false
  router.push('/')
}
</script>

<template>
  <div class="flex items-center justify-center min-h-screen bg-bg-base">
    <div class="w-[400px] p-8 rounded-2xl bg-bg-surface border border-border-default shadow-[0_0_40px_var(--color-glow-cyan)]">
      <div class="flex flex-col items-center gap-2 mb-8">
        <DsIcon icon="lucide:plane" :size="40" color="var(--color-primary)" />
        <h1 class="text-2xl font-semibold text-text-primary">飞手管家</h1>
        <p class="text-sm text-text-muted">无人机飞行监管平台</p>
      </div>

      <form class="flex flex-col gap-4" @submit.prevent="handleLogin">
        <NInput v-model:value="username" placeholder="用户名" size="large">
          <template #prefix><DsIcon icon="lucide:user" :size="16" color="var(--color-text-muted)" /></template>
        </NInput>
        <NInput v-model:value="password" type="password" show-password-on="click" placeholder="密码" size="large">
          <template #prefix><DsIcon icon="lucide:lock" :size="16" color="var(--color-text-muted)" /></template>
        </NInput>
        <NButton type="primary" size="large" block :loading="loading" attr-type="submit">
          登录
        </NButton>
      </form>
    </div>
  </div>
</template>
