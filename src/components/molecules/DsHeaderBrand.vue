<script setup lang="ts">
// Molecule for Header Brand
// Represents the left title block with icon and branding text
</script>

<template>
  <div class="relative z-30 flex items-stretch h-full min-w-[360px] shrink-0">
    
    <!-- Back facet / glowing shadow -->
    <div class="absolute inset-0 bg-cyan-900/40 shadow-[10px_0_30px_rgba(0,255,255,0.15)]"
         style="clip-path: polygon(0 0, 100% 0, calc(100% - 32px) 100%, 0 100%);"></div>
    
    <!-- Main metallic facet -->
    <div class="absolute inset-[1px] bg-gradient-to-b from-[#081830] to-[#040A14] border border-[#1A386D]"
         style="clip-path: polygon(0 0, 100% 0, calc(100% - 31px) 100%, 0 100%);">
      <!-- Inner glow top edge -->
      <div class="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-cyan-400 to-transparent opacity-80 shadow-[0_0_5px_#00FFFF]"></div>
      <!-- Inner micro-circuits overlay -->
      <div class="absolute top-[10px] right-[40px] w-[80px] h-[30px] opacity-[0.15]"
           style="background: radial-gradient(circle at right center, #00FFFF 1px, transparent 1px) 0 0/6px 6px;"></div>
    </div>
    
    <!-- Content -->
    <div class="relative z-10 flex items-center pl-6 pr-12 w-full">
      <!-- Complex Drone Icon (Conceptually an Atom) -->
      <div class="relative flex items-center justify-center w-10 h-10 mr-3 group">
        <div class="absolute inset-0 border-[1.5px] border-cyan-500/70 rotate-[30deg] group-hover:rotate-[90deg] transition-transform duration-1000" style="clip-path: polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%);"></div>
        <div class="absolute inset-[6px] border border-cyan-400 rotate-45"></div>
        <div class="w-2 h-2 bg-cyan-200 shadow-[0_0_12px_4px_#00FFFF] rounded-full animate-pulse"></div>
        <div class="absolute inset-0 flex justify-center items-center rotate-45">
          <div class="w-full h-[1px] bg-cyan-500/40"></div>
        </div>
        <div class="absolute inset-0 flex justify-center items-center -rotate-45">
          <div class="w-full h-[1px] bg-cyan-500/40"></div>
        </div>
      </div>

      <!-- Detail Arrows -->
      <div class="relative flex items-center text-cyan-400 mr-4">
        <svg class="w-4 h-4 drop-shadow-[0_0_4px_#00FFFF]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
        <svg class="w-4 h-4 -ml-2 opacity-60" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" /></svg>
        <div class="absolute top-[1px] right-0 w-1.5 h-1.5 bg-cyan-300 rounded-full shadow-[0_0_6px_#00FFFF]"></div>
        <div class="absolute bottom-[2px] right-[4px] w-1 h-1 bg-cyan-300 rounded-full"></div>
      </div>

      <!-- Title -->
      <div class="flex flex-col">
        <span class="text-cyan-300 text-[26px] font-black tracking-[0.15em] drop-shadow-[0_0_6px_rgba(0,255,255,0.8)] leading-none mt-1">
          飞手管家
        </span>
        <span class="text-cyan-500/80 text-[10px] font-mono tracking-[0.2em] uppercase mt-1 leading-none">
          Pilot Master // FEISHOU
        </span>
      </div>
    </div>
    
    <!-- Slanted edge decoration -->
    <div class="absolute right-[25px] top-[15px] w-[2px] h-[30px] bg-cyan-400/80 shadow-[0_0_8px_#00FFFF]"
         style="transform: skewX(-24deg);"></div>
    <!-- Joint lights on the slant -->
    <div class="absolute right-[19px] bottom-[15px] flex gap-[2px] opacity-90 shadow-[0_0_10px_#00FFFF]" style="transform: skewX(-24deg);">
       <div class="w-[3px] h-[10px] bg-cyan-300"></div>
       <div class="w-[3px] h-[10px] bg-cyan-300"></div>
       <div class="w-[3px] h-[10px] bg-cyan-300"></div>
    </div>
  </div>
</template>
