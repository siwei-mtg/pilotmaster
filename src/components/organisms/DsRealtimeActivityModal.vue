<script setup lang="ts">
import { ref, watch } from 'vue'
import { NModal, NInput, NButton, NDatePicker, NTimePicker, NRadioGroup, NRadio, NCheckbox } from 'naive-ui'

export interface RealtimeActivityData {
  name: string
  dateRange: [number, number] | null
  timeRange: [string, string]
  content: string
  locationMode: string
  audienceTags: string[]
  extraNumbers: string
}

const props = defineProps<{
  show: boolean
  initialData?: {
    name: string
    dateRange: [number, number] | null
    timeRange: [string, string]
    content: string
    locationMode: string
    audienceTags: string[]
    extraNumbers: string
  } | null
}>()

const emit = defineEmits<{
  'update:show': [value: boolean]
  confirm: [data: RealtimeActivityData]
}>()

const formName = ref('')
const formDateRange = ref<[number, number] | null>(null)
const formTimeStart = ref<string>('08:00')
const formTimeEnd = ref<string>('18:00')
const formContent = ref('')
const formLocationMode = ref('administrative')
const formAudienceTags = ref<string[]>(['realtime', 'monthly'])
const formExtraNumbers = ref('')
const showPreview = ref(false)

const TEMPLATE_CONTENT = '【飞手管家】您已进入禁飞区，未经军队、民航部门许可操纵无人机，公安机关将以危险妨碍公共安全罪予以追究。'

function fillTemplate() {
  formContent.value = TEMPLATE_CONTENT
}

watch(() => props.show, (visible) => {
  if (visible && props.initialData) {
    formName.value = props.initialData.name
    formDateRange.value = props.initialData.dateRange
    formTimeStart.value = props.initialData.timeRange[0]
    formTimeEnd.value = props.initialData.timeRange[1]
    formContent.value = props.initialData.content
    formLocationMode.value = props.initialData.locationMode
    formAudienceTags.value = [...props.initialData.audienceTags]
    formExtraNumbers.value = props.initialData.extraNumbers
  }
})

function toggleAudienceTag(tag: string, checked: boolean) {
  if (checked) {
    if (!formAudienceTags.value.includes(tag)) {
      formAudienceTags.value.push(tag)
    }
  } else {
    formAudienceTags.value = formAudienceTags.value.filter(t => t !== tag)
  }
}

function handleConfirm() {
  emit('confirm', {
    name: formName.value,
    dateRange: formDateRange.value,
    timeRange: [formTimeStart.value, formTimeEnd.value],
    content: formContent.value,
    locationMode: formLocationMode.value,
    audienceTags: formAudienceTags.value,
    extraNumbers: formExtraNumbers.value,
  })
  handleClose()
}

function handleClose() {
  formName.value = ''
  formDateRange.value = null
  formTimeStart.value = '08:00'
  formTimeEnd.value = '18:00'
  formContent.value = ''
  formLocationMode.value = 'administrative'
  formAudienceTags.value = ['realtime', 'monthly']
  formExtraNumbers.value = ''
  showPreview.value = false
  emit('update:show', false)
}
</script>

<template>
  <NModal
    :show="show"
    preset="card"
    :title="initialData ? '实时活动配置-修改' : '实时活动配置-新建'"
    :style="{ width: '640px', maxHeight: '85vh' }"
    :mask-closable="false"
    :closable="true"
    :content-style="{ overflow: 'auto' }"
    @update:show="handleClose"
  >
    <div class="flex flex-col gap-5">
      <!-- 活动名称 -->
      <div class="flex flex-col gap-1.5">
        <label class="text-sm text-text-primary">
          <span class="text-danger mr-0.5">*</span>活动名称
        </label>
        <NInput v-model:value="formName" placeholder="请输入活动名称" />
      </div>

      <!-- 投放日期区间 -->
      <div class="flex flex-col gap-1.5">
        <label class="text-sm text-text-primary">
          <span class="text-danger mr-0.5">*</span>投放日期区间
        </label>
        <NDatePicker
          v-model:value="formDateRange"
          type="daterange"
          :start-placeholder="'开始日期'"
          :end-placeholder="'结束日期'"
          style="width: 100%"
        />
      </div>

      <!-- 投放时间段 -->
      <div class="flex flex-col gap-1.5">
        <label class="text-sm text-text-primary">
          <span class="text-danger mr-0.5">*</span>投放时间段
        </label>
        <div class="flex items-center gap-2">
          <NTimePicker
            v-model:formatted-value="formTimeStart"
            format="HH:mm"
            value-format="HH:mm"
            style="flex: 1"
          />
          <span class="text-text-secondary text-sm">→</span>
          <NTimePicker
            v-model:formatted-value="formTimeEnd"
            format="HH:mm"
            value-format="HH:mm"
            style="flex: 1"
          />
        </div>
      </div>

      <!-- 发送内容 -->
      <div class="flex flex-col gap-1.5">
        <label class="text-sm text-text-primary">
          <span class="text-danger mr-0.5">*</span>发送内容
        </label>
        <NInput
          v-model:value="formContent"
          type="textarea"
          placeholder="请输入发送内容"
          :rows="4"
          :autosize="{ minRows: 3, maxRows: 6 }"
        />
        <div class="flex justify-end gap-2 mt-0.5">
          <NButton size="tiny" quaternary @click="fillTemplate">模板</NButton>
          <NButton size="tiny" quaternary :disabled="!formContent" @click="showPreview = true">预览</NButton>
        </div>
      </div>

      <!-- 标签选择 -->
      <div class="flex flex-col gap-3">
        <label class="text-sm text-text-primary">标签选择</label>

        <!-- 地理位置 -->
        <div class="rounded-lg border border-border-default p-4">
          <div class="text-sm text-text-primary mb-2 font-medium">地理位置</div>
          <NRadioGroup v-model:value="formLocationMode">
            <NRadio value="administrative">按行政划分</NRadio>
            <NRadio value="custom">按地图自定义划分</NRadio>
          </NRadioGroup>
        </div>

        <!-- 客群标签 -->
        <div class="rounded-lg border border-border-default p-4">
          <div class="text-sm text-text-primary mb-2 font-medium">客群标签</div>
          <div class="flex items-center gap-4">
            <NCheckbox
              :checked="formAudienceTags.includes('realtime')"
              @update:checked="toggleAudienceTag('realtime', $event)"
            >
              实时起飞飞手
            </NCheckbox>
            <NCheckbox
              :checked="formAudienceTags.includes('monthly')"
              @update:checked="toggleAudienceTag('monthly', $event)"
            >
              近1个月活跃飞手
            </NCheckbox>
          </div>
          <p class="text-xs text-text-tertiary mt-2">
            注：投放开始时刻已在投放区域内的存量飞手 + 开始后新进入区域的新增飞手
          </p>
        </div>
      </div>

      <!-- 附加号码清单 -->
      <div class="flex flex-col gap-1.5">
        <label class="text-sm text-text-primary">附加号码清单</label>
        <NInput
          v-model:value="formExtraNumbers"
          type="textarea"
          placeholder="请输入号码，用逗号隔开"
          :rows="3"
          :autosize="{ minRows: 2, maxRows: 5 }"
        />
        <div class="flex gap-2 mt-0.5">
          <NButton size="tiny" quaternary>上传</NButton>
          <NButton size="tiny" quaternary>模板下载</NButton>
        </div>
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

  <!-- 短信预览弹窗 -->
  <NModal
    :show="showPreview"
    preset="card"
    title="短信预览"
    :style="{ width: '320px' }"
    :closable="true"
    @update:show="showPreview = false"
  >
    <div class="sms-preview">
      <div class="sms-header">
        <span class="sms-time">9:41</span>
      </div>
      <div class="sms-contact">
        <div class="sms-avatar">飞</div>
        <div class="sms-contact-info">
          <span class="sms-contact-name">飞手管家</span>
          <span class="sms-contact-type">短信</span>
        </div>
      </div>
      <div class="sms-divider" />
      <div class="sms-bubble">
        <p class="sms-bubble-text">{{ formContent }}</p>
      </div>
      <div class="sms-contact-bottom">
        <span class="sms-contact-type">别别</span>
        <span class="sms-contact-type">短信</span>
        <span class="sms-contact-type">↑</span>
      </div>
    </div>
  </NModal>
</template>

<style scoped>
.sms-preview {
  font-family: -apple-system, BlinkMacSystemFont, 'SF Pro Text', sans-serif;
  font-size: 13px;
  line-height: 1.5;
  color: var(--color-text-primary);
}

.sms-header {
  text-align: center;
  padding-bottom: 8px;
}

.sms-time {
  font-size: 14px;
  font-weight: 600;
}

.sms-contact {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-bottom: 8px;
}

.sms-avatar {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: var(--color-primary);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  font-weight: 600;
  flex-shrink: 0;
}

.sms-contact-info {
  display: flex;
  flex-direction: column;
  gap: 1px;
}

.sms-contact-name {
  font-size: 14px;
  font-weight: 500;
}

.sms-contact-type {
  font-size: 11px;
  color: var(--color-text-tertiary);
}

.sms-divider {
  height: 1px;
  background: var(--color-border-default);
  margin: 4px 0 12px;
}

.sms-bubble {
  background: var(--color-bg-hover);
  border-radius: 12px;
  padding: 10px 14px;
  margin-bottom: 12px;
  max-width: 90%;
}

.sms-bubble-text {
  margin: 0;
  font-size: 13px;
  line-height: 1.6;
  word-break: break-all;
}

.sms-contact-bottom {
  display: flex;
  align-items: center;
  gap: 8px;
  padding-top: 4px;
}
</style>
