<script setup lang="ts">
import { ref, watch } from 'vue'
import { NModal, NInput, NButton, useMessage } from 'naive-ui'

const props = defineProps<{
  show: boolean
  username?: string
}>()

const emit = defineEmits<{
  'update:show': [value: boolean]
  confirm: [username: string, password: string]
}>()

const message = useMessage()
const newPassword = ref('')
const confirmPassword = ref('')

watch(() => props.show, (visible) => {
  if (visible) {
    newPassword.value = ''
    confirmPassword.value = ''
  }
})

function handleConfirm() {
  if (newPassword.value !== confirmPassword.value) {
    message.error('两次输入的密码不一致')
    return
  }
  if (props.username) {
    emit('confirm', props.username, newPassword.value)
  }
  handleClose()
}

function handleClose() {
  emit('update:show', false)
}
</script>

<template>
  <NModal
    :show="show"
    preset="card"
    title="修改密码"
    :style="{ width: '440px' }"
    :mask-closable="false"
    :closable="true"
    @update:show="handleClose"
  >
    <div class="flex flex-col gap-5">
      <!-- 新密码 -->
      <div class="flex flex-col gap-1.5">
        <label class="text-sm text-text-primary">
          <span class="text-danger mr-0.5">*</span>新密码
        </label>
        <NInput
          v-model:value="newPassword"
          type="password"
          show-password-on="click"
          placeholder="请输入新密码"
        />
      </div>

      <!-- 确认新密码 -->
      <div class="flex flex-col gap-1.5">
        <label class="text-sm text-text-primary">
          <span class="text-danger mr-0.5">*</span>确认新密码
        </label>
        <NInput
          v-model:value="confirmPassword"
          type="password"
          show-password-on="click"
          placeholder="请确认新密码"
        />
      </div>
    </div>

    <template #footer>
      <div class="flex justify-end gap-3 px-1 pb-1">
        <NButton @click="handleClose">取消</NButton>
        <NButton
          type="primary"
          :disabled="!newPassword || !confirmPassword"
          @click="handleConfirm"
        >
          确定
        </NButton>
      </div>
    </template>
  </NModal>
</template>
