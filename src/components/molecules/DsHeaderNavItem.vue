<script setup lang="ts">
defineProps<{
  label: string
  isActive: boolean
}>()
</script>

<template>
  <div
    class="relative flex items-center justify-center h-[46px] min-w-[130px] px-8 cursor-pointer group"
    style="transform: skewX(-24deg);"
  >
    <!-- Inactive Background Base -->
    <div class="absolute inset-0 transition-colors bg-gradient-to-br from-[#051024]/80 to-[#02050A]/80 border-[1px] border-[#102A54] group-hover:border-[#1E4A8C] shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]">
      <!-- Geometric Top Edge Highlight inactive -->
      <div class="absolute top-0 left-0 w-[20%] h-[1px] bg-cyan-600/50 group-hover:bg-cyan-400/80 transition-colors"></div>
      <!-- Micro-dots inside block (hardware mesh) -->
      <div class="absolute inset-[2px] opacity-[0.08]" style="background: radial-gradient(#00FFFF 1.5px, transparent 1.5px) 0 0/6px 6px;"></div>
    </div>
    
    <!-- Active Background Structure -->
    <div 
      v-if="isActive"
      class="absolute inset-0 bg-gradient-to-br from-[#0A2A54]/90 to-[#05132B]/90 border border-cyan-400 shadow-[0_0_20px_rgba(0,255,255,0.4)]"
    >
      <!-- Geometric Top Edge Highlight -->
      <div class="absolute top-0 left-0 w-full h-[2px] bg-cyan-300 shadow-[0_0_8px_#00FFFF]"></div>
      
      <!-- Inner mechanics joints (tiny glowing squares) -->
      <div class="absolute top-0 left-0 w-[4px] h-[4px] bg-cyan-100 shadow-[0_0_5px_#00FFFF]"></div>
      <div class="absolute bottom-0 right-0 w-[4px] h-[4px] bg-cyan-100 shadow-[0_0_5px_#00FFFF]"></div>
      <div class="absolute top-0 right-0 w-[4px] h-[4px] bg-cyan-100 shadow-[0_0_5px_#00FFFF]"></div>
      <div class="absolute bottom-0 left-0 w-[4px] h-[4px] bg-cyan-100 shadow-[0_0_5px_#00FFFF]"></div>
      
      <!-- Right-side mechanical notch -->
      <div class="absolute top-[30%] right-[-1px] w-[3px] h-[40%] bg-cyan-300 shadow-[0_0_8px_#00FFFF]"></div>
    </div>

    <!-- Singular Label (Unskewed) -->
    <span 
      class="relative z-10 font-bold tracking-widest text-[15px]"
      :class="isActive ? 'text-cyan-100 drop-shadow-[0_0_8px_rgba(0,255,255,1)]' : 'text-cyan-500/80 group-hover:text-cyan-300'"
      style="transform: skewX(24deg);"
    >
      {{ label }}
    </span>
  </div>
</template>
