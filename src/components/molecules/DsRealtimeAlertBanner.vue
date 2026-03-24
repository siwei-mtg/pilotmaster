<script setup lang="ts">
import DsIcon from '@/components/atoms/DsIcon.vue'
import DsTrend from '@/components/atoms/DsTrend.vue'

defineProps<{
  count: number | string
  trend: number
}>()
</script>

<template>
  <div class="hud-panel relative flex flex-col justify-center px-8 py-5 mx-auto mt-2"
       style="width: 580px; background-color: rgba(5, 5, 5, 0.9);">
    
    <!-- Background Grid Texture -->
    <div class="absolute inset-0 pointer-events-none opacity-25"
         style="background-image: linear-gradient(rgba(248,113,113,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(248,113,113,0.15) 1px, transparent 1px); background-size: 16px 16px; mix-blend-mode: screen;"></div>

    <!-- Segmented Border Frame with Clip Path -->
    <div class="absolute inset-0 pointer-events-none border border-danger/40"
         style="clip-path: polygon(16px 0, calc(100% - 16px) 0, 100% 16px, 100% calc(100% - 16px), calc(100% - 16px) 100%, 16px 100%, 0 calc(100% - 16px), 0 16px); box-shadow: inset 0 0 30px rgba(248, 113, 113, 0.15);">
      
      <!-- Edges glowing segments -->
      <div class="absolute top-0 left-[16px] w-[60px] h-px bg-danger shadow-[0_0_8px_#F87171]"></div>
      <div class="absolute top-0 right-[16px] w-[60px] h-px bg-danger shadow-[0_0_8px_#F87171]"></div>
      <div class="absolute bottom-0 left-[16px] w-[60px] h-px bg-danger shadow-[0_0_8px_#F87171]"></div>
      <div class="absolute bottom-0 right-[16px] w-[60px] h-px bg-danger shadow-[0_0_8px_#F87171]"></div>
    </div>
    
    <!-- Corner Glowing Dots -->
    <div class="absolute top-[6px] left-[6px] w-1.5 h-1.5 bg-danger rounded-full shadow-[0_0_8px_#F87171,0_0_12px_#F87171]"></div>
    <div class="absolute top-[6px] right-[6px] w-1.5 h-1.5 bg-danger rounded-full shadow-[0_0_8px_#F87171,0_0_12px_#F87171]"></div>
    <div class="absolute bottom-[6px] left-[6px] w-1.5 h-1.5 bg-danger rounded-full shadow-[0_0_8px_#F87171,0_0_12px_#F87171]"></div>
    <div class="absolute bottom-[6px] right-[6px] w-1.5 h-1.5 bg-danger rounded-full shadow-[0_0_8px_#F87171,0_0_12px_#F87171]"></div>

    <!-- Side Arrow & Hash Indicators -->
    <div class="absolute left-2.5 top-1/2 -translate-y-1/2 text-danger/80 text-[10px] scale-x-75 drop-shadow-[0_0_4px_#F87171]">▶</div>
    <div class="absolute right-2.5 top-1/2 -translate-y-1/2 text-danger/80 text-[10px] scale-x-75 drop-shadow-[0_0_4px_#F87171]">◀</div>
    
    <div class="absolute left-1.5 top-3 flex flex-col gap-[3px] opacity-70">
      <div class="w-1.5 h-[2px] bg-danger"></div><div class="w-2.5 h-px bg-danger"></div><div class="w-1.5 h-[2px] bg-danger"></div>
    </div>
    <div class="absolute left-1.5 bottom-3 flex flex-col gap-[3px] opacity-70">
      <div class="w-1.5 h-[2px] bg-danger"></div><div class="w-2.5 h-px bg-danger"></div><div class="w-1.5 h-[2px] bg-danger"></div>
    </div>
    <div class="absolute right-1.5 top-3 flex flex-col items-end gap-[3px] opacity-70">
      <div class="w-1.5 h-[2px] bg-danger"></div><div class="w-2.5 h-px bg-danger"></div><div class="w-1.5 h-[2px] bg-danger"></div>
    </div>
    <div class="absolute right-1.5 bottom-3 flex flex-col items-end gap-[3px] opacity-70">
      <div class="w-1.5 h-[2px] bg-danger"></div><div class="w-2.5 h-px bg-danger"></div><div class="w-1.5 h-[2px] bg-danger"></div>
    </div>

    <!-- Main Content Row -->
    <div class="relative z-10 flex items-center justify-start gap-12 px-2">
      
      <!-- Icon & Status (Left) -->
      <div class="flex items-center gap-4">
        <!-- Pedestal & Rotating Light -->
        <div class="relative flex flex-col items-center">
          <!-- Light Icon -->
          <div class="relative z-10 text-danger filter drop-shadow-[0_0_12px_#F87171] mb-1">
            <DsIcon icon="lucide:siren" :size="32" />
          </div>
          
          <!-- Holographic Rings -->
          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-[42px] h-[42px] border-2 border-t-danger/70 border-r-transparent border-b-transparent border-l-danger/20 rounded-full animate-spin [animation-duration:2s]"></div>
          <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[60%] w-[50px] h-[50px] border border-b-danger/50 border-danger/10 rounded-full animate-[spin_3s_linear_reverse_infinite]"></div>
          
          <!-- Sci-Fi Base -->
          <div class="w-[52px] h-[10px] rounded-[50%] border-t border-danger bg-gradient-to-b from-danger/30 to-transparent flex flex-wrap items-center justify-center overflow-hidden shadow-[0_0_15px_rgba(248,113,113,0.3)]">
            <div class="w-full flex justify-around px-1">
              <div class="w-1 h-1 bg-danger rounded-full opacity-80"></div>
              <div class="w-1 h-1 bg-danger rounded-full opacity-80"></div>
              <div class="w-1 h-1 bg-danger rounded-full opacity-80"></div>
            </div>
          </div>
          <div class="w-[64px] h-[4px] mt-0.5 rounded-[50%] border border-danger/40 bg-danger/10"></div>
        </div>
        
        <!-- Status Indicator Text -->
        <div class="flex flex-col gap-1 mt-3">
          <div class="flex items-center gap-1.5">
            <div class="w-1.5 h-1.5 bg-danger rounded-full shadow-[0_0_6px_#F87171] animate-pulse"></div>
            <span class="text-[10px] font-mono text-text-muted/80 tracking-widest">实时监控中</span>
          </div>
        </div>
      </div>

      <!-- Typography & Data (Right) -->
      <div class="flex items-end gap-5">
        <span class="text-danger text-lg font-display tracking-[0.15em] font-bold pb-2 drop-shadow-[0_0_12px_#F87171]">实时告警数</span>
        
        <!-- Large Glowing Number -->
        <span class="font-mono font-black text-[56px] leading-[0.85] text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.7)] tracking-tighter">
          {{ count }}
        </span>
        
        <!-- Percentage & Description -->
        <div class="flex flex-col justify-end pb-1 gap-1.5">
          <!-- Reused Boxed DsTrend style -->
          <div class="flex items-center justify-center px-1.5 py-0.5 rounded border border-border-default bg-bg-hover/40 backdrop-blur-sm">
            <DsTrend :value="trend" />
          </div>
          <!-- Darker descriptive text -->
          <span class="text-[10px] font-mono text-text-muted/60 tracking-wider">较昨日同时段</span>
        </div>
      </div>
      
    </div>
  </div>
</template>

<style scoped>
/* No additional scoped styles needed, using Tailwind */
</style>
