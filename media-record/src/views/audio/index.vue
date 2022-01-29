<template>
<div class="tw-w-full tw-h-full tw-flex tw-items-center tw-justify-center">
  <div class="wrap tw-bg-white tw-rounded-3xl tw-shadow-2xl">
    <Recorder />
  </div>
</div>
</template>

<script setup>
import Recorder from '@/components/Recorder/index.vue'
</script>

<style scoped>
  .wrap {
    width: 500px;
    height: 360px;
  }
</style>
