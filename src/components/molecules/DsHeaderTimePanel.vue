<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'

const now = ref(new Date())
let timer: any = null
onMounted(() => {
  timer = setInterval(() => { now.value = new Date() }, 1000)
})
onUnmounted(() => {
  if (timer) clearInterval(timer)
})

const timeStrOnly = computed(() => {
  const d = now.value
  const hh = String(d.getHours()).padStart(2, '0')
  const mm = String(d.getMinutes()).padStart(2, '0')
  const ss = String(d.getSeconds()).padStart(2, '0')
  return `${hh}:${mm}:${ss}`
})

const dateStrShortOnly = computed(() => {
  const d = now.value
  return `${d.getFullYear()}.${d.getMonth() + 1}.${d.getDate()}`
})

const weekdayStr = computed(() => {
  const d = now.value
  return '星期' + ['日', '一', '二', '三', '四', '五', '六'][d.getDay()]
})
</script>

<template>
  <div class="relative z-20 flex items-center h-full pl-[56px] pr-8 shrink-0 group">
    <!-- Base slanted background -->
    <div class="absolute inset-0 bg-[#06142E]/80 backdrop-blur-md border-l border-cyan-500/40 shadow-[-15px_0_30px_rgba(0,255,255,0.08)]"
         style="clip-path: polygon(32px 0, 100% 0, 100% 100%, 0 100%);">
      
      <!-- Glow top edge -->
      <div class="absolute top-0 left-[32px] right-0 h-[1.5px] bg-gradient-to-r from-transparent to-cyan-400"></div>
      <!-- glowing data node & mechanical detail -->
      <div class="absolute bottom-[10px] left-[15px] w-2.5 h-2.5 bg-cyan-300 shadow-[0_0_8px_#00FFFF] rounded-full"></div>
      <div class="absolute top-[20px] left-[22px] w-[2px] h-[10px] bg-cyan-400/80 rotate-45 shadow-[0_0_5px_#00FFFF]"></div>
      <div class="absolute top-[20px] left-[28px] w-[2px] h-[14px] bg-cyan-400/50 rotate-45"></div>

    </div>

    <!-- Time text block -->
    <div class="relative z-10 flex flex-col items-end pt-[2px]">
      <div class="flex items-baseline gap-3">
        <span class="text-cyan-400 font-mono text-[14px] tracking-widest leading-none drop-shadow-[0_0_5px_rgba(0,255,255,0.5)]">
          {{ dateStrShortOnly }}
        </span>
        <span class="text-cyan-300 font-mono font-black text-[22px] tracking-[0.05em] drop-shadow-[0_0_8px_rgba(0,255,255,0.9)] leading-none">
          {{ timeStrOnly }}
        </span>
      </div>
      <div class="flex items-center gap-2 mt-[6px]">
        <span class="text-cyan-500/80 text-[10px] uppercase font-mono tracking-widest">
          MONDAY
        </span>
        <div class="w-1 h-1 bg-cyan-500/50 rounded-full"></div>
        <span class="text-cyan-500 text-[11px] font-medium tracking-[0.2em] leading-none">
          {{ weekdayStr }}
        </span>
      </div>
    </div>
  </div>
</template>
