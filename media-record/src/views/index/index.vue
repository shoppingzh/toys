<template>
  <div class="tw-w-full tw-h-full tw-flex tw-items-center tw-justify-center">
    <div class="tw-text-center">
      <div>
        <router-link to="/audio">
          <a-button type="primary">录音演示</a-button>
        </router-link>
      </div>
      <div class="tw-mt-5">
        <router-link to="/video">
          <a-button type="primary">录像演示（人脸信息采集）</a-button>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import Button from '@/components/Button/index.vue'
</script>
