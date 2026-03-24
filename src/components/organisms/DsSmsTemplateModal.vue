<script setup lang="ts">
import { ref, watch } from 'vue'
import { NModal, NInput, NSwitch, NButton } from 'naive-ui'

const props = defineProps<{
  show: boolean
  initialData?: {
    name: string
    content: string
    enabled: boolean
  } | null
}>()

const emit = defineEmits<{
  'update:show': [value: boolean]
  confirm: [data: { name: string; content: string; enabled: boolean }]
}>()

const formName = ref('')
const formContent = ref('')
const formEnabled = ref(true)

// Pre-fill form when modal opens with initialData
watch(() => props.show, (visible) => {
  if (visible && props.initialData) {
    formName.value = props.initialData.name
    formContent.value = props.initialData.content
    formEnabled.value = props.initialData.enabled
  }
})

function handleConfirm() {
  emit('confirm', {
    name: formName.value,
    content: formContent.value,
    enabled: formEnabled.value,
  })
  handleClose()
}

function handleClose() {
  formName.value = ''
  formContent.value = ''
  formEnabled.value = true
  emit('update:show', false)
}
</script>

<template>
  <NModal
    :show="show"
    preset="card"
    :title="initialData ? '修改短信模板' : '新增短信模板'"
    :style="{ width: '560px' }"
    :mask-closable="false"
    :closable="true"
    @update:show="handleClose"
  >
    <div class="flex flex-col gap-5">
      <!-- 模板名称 -->
      <div class="flex flex-col gap-1.5">
        <label class="text-sm text-text-primary">
          <span class="text-danger mr-0.5">*</span>模板名称
        </label>
        <NInput v-model:value="formName" placeholder="请输入模板名称" />
      </div>

      <!-- 模板内容 -->
      <div class="flex flex-col gap-1.5">
        <label class="text-sm text-text-primary">
          <span class="text-danger mr-0.5">*</span>模板内容
        </label>
        <NInput
          v-model:value="formContent"
          type="textarea"
          placeholder="请输入模板内容，可使用变量占位符"
          :rows="4"
          :autosize="{ minRows: 3, maxRows: 6 }"
        />
        <p class="text-xs text-primary mt-0.5">
          支持的变量：{droneId} – 无人机ID, {zoneName} – 禁飞区名称, {location} – 位置, {time} – 时间
        </p>
      </div>

      <!-- 启用状态 -->
      <div class="flex flex-col gap-1.5">
        <label class="text-sm text-text-primary">启用状态</label>
        <NSwitch v-model:value="formEnabled" />
      </div>
    </div>

    <!-- Footer -->
    <template #footer>
      <div class="flex justify-end gap-3">
        <NButton @click="handleClose">取消</NButton>
        <NButton
          type="primary"
          :disabled="!formName || !formContent"
          @click="handleConfirm"
        >
          确定
        </NButton>
      </div>
    </template>
  </NModal>
</template>
