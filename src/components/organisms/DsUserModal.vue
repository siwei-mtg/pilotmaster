<script setup lang="ts">
import { ref, watch } from 'vue'
import { NModal, NInput, NButton, NSelect, NSwitch } from 'naive-ui'
import DsLocationPickerModal from './DsLocationPickerModal.vue'

export interface UserData {
  username: string
  password?: string
  role: 'admin' | 'user'
  enabled: boolean
  city: string
  district: string
  centerPoint: string
  remarks: string
}

const props = defineProps<{
  show: boolean
  initialData?: UserData | null
}>()

const emit = defineEmits<{
  'update:show': [value: boolean]
  confirm: [data: UserData]
}>()

const formUsername = ref('')
const formPassword = ref('')
const formRole = ref<'admin' | 'user'>('user')
const formEnabled = ref(true)
const formCity = ref('丽水市')
const formDistrict = ref('莲都区')
const formCenterPoint = ref('')
const formRemarks = ref('')
const showPicker = ref(false)

const roleOptions = [
  { label: '管理员', value: 'admin' },
  { label: '普通用户', value: 'user' },
]

const cityOptions = [
  { label: '丽水市', value: '丽水市' },
  { label: '杭州市', value: '杭州市' },
]

const districtOptions = [
  { label: '莲都区', value: '莲都区' },
  { label: '上城区', value: '上城区' },
  { label: '下城区', value: '下城区' },
]

watch(() => props.show, (visible) => {
  if (visible && props.initialData) {
    formUsername.value = props.initialData.username
    formPassword.value = ''
    formRole.value = props.initialData.role
    formEnabled.value = props.initialData.enabled
    formCity.value = props.initialData.city
    formDistrict.value = props.initialData.district
    formCenterPoint.value = props.initialData.centerPoint
    formRemarks.value = props.initialData.remarks
  } else if (visible) {
    handleClose()
    emit('update:show', true)
  }
})

function handleConfirm() {
  const data: UserData = {
    username: formUsername.value,
    role: formRole.value,
    enabled: formEnabled.value,
    city: formCity.value,
    district: formDistrict.value,
    centerPoint: formCenterPoint.value,
    remarks: formRemarks.value,
  }
  if (formPassword.value) {
    data.password = formPassword.value
  }
  emit('confirm', data)
  handleClose()
}

function handleClose() {
  formUsername.value = ''
  formPassword.value = ''
  formRole.value = 'user'
  formEnabled.value = true
  formCity.value = '丽水市'
  formDistrict.value = '莲都区'
  formCenterPoint.value = ''
  formRemarks.value = ''
  emit('update:show', false)
}

function handleLocationConfirm(location: string) {
  formCenterPoint.value = location
}
</script>

<template>
  <NModal
    :show="show"
    preset="card"
    :title="initialData ? '编辑用户' : '新增用户'"
    :style="{ width: '560px', maxHeight: '90vh' }"
    :mask-closable="false"
    :closable="true"
    :content-style="{ overflow: 'auto' }"
    @update:show="handleClose"
  >
    <div class="flex flex-col gap-5">
      <!-- 用户名 -->
      <div class="flex flex-col gap-1.5">
        <label class="text-sm text-text-primary">
          <span class="text-danger mr-0.5">*</span>用户名
        </label>
        <NInput v-model:value="formUsername" placeholder="请输入用户名" :disabled="!!initialData" />
      </div>

      <!-- 密码 -->
      <div class="flex flex-col gap-1.5">
        <label class="text-sm text-text-primary">
          {{ initialData ? '新密码（不填则不修改）' : '密码' }}
        </label>
        <NInput
          v-model:value="formPassword"
          type="password"
          show-password-on="click"
          :placeholder="initialData ? '不填则不修改密码' : '请输入密码'"
        />
      </div>

      <!-- 用户角色 -->
      <div class="flex flex-col gap-1.5">
        <label class="text-sm text-text-primary">
          <span class="text-danger mr-0.5">*</span>用户角色
        </label>
        <NSelect v-model:value="formRole" :options="roleOptions" placeholder="请选择角色" />
      </div>

      <!-- 启用状态 -->
      <div class="flex flex-col gap-1.5">
        <label class="text-sm text-text-primary">启用状态</label>
        <div class="flex items-center">
          <NSwitch v-model:value="formEnabled" />
        </div>
      </div>

      <!-- 城市 -->
      <div class="flex flex-col gap-1.5">
        <label class="text-sm text-text-primary">城市</label>
        <NSelect v-model:value="formCity" :options="cityOptions" />
      </div>

      <!-- 行政区划 -->
      <div class="flex flex-col gap-1.5">
        <label class="text-sm text-text-primary">行政区划</label>
        <NSelect v-model:value="formDistrict" :options="districtOptions" />
      </div>

      <!-- 中心点设置 -->
      <div class="flex flex-col gap-1.5">
        <label class="text-sm text-text-primary">中心点设置</label>
        <NInput v-model:value="formCenterPoint" placeholder="120.xxxx,30.xxxx" />
        <div class="flex mt-1">
          <NButton size="small" type="primary" secondary @click="showPicker = true">选择位置</NButton>
        </div>
      </div>

      <!-- 备注 -->
      <div class="flex flex-col gap-1.5">
        <label class="text-sm text-text-primary">备注</label>
        <NInput
          v-model:value="formRemarks"
          type="textarea"
          placeholder="请输入备注内容"
          :rows="3"
        />
      </div>
    </div>

    <template #footer>
      <div class="flex justify-end gap-3 px-1 pb-1">
        <NButton @click="handleClose">取消</NButton>
        <NButton
          type="primary"
          :disabled="!formUsername || (initialData ? false : !formPassword)"
          @click="handleConfirm"
        >
          确定
        </NButton>
      </div>
    </template>
  </NModal>

  <DsLocationPickerModal 
    v-model:show="showPicker" 
    :initial-location="formCenterPoint"
    @confirm="handleLocationConfirm" 
  />
</template>
