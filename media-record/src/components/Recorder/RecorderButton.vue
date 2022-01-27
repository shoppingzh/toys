<template>
  <div
    class="recorder-button tw-inline-flex tw-items-center tw-justify-center tw-w-16 tw-h-16 tw-cursor-pointer tw-rounded-full tw-border-4 tw-border-gray-400"
    :class="{ 'is-active': active }">
    <div class="recorder-button__inner tw-bg-red-500 tw-rounded-full tw-transition-all tw-delay-150" />
  </div>
</template>

<script setup>
  defineProps({
    active: { type: Boolean, default: false }
  })
</script>

<style lang="less" scoped>
.recorder-button {
  padding: 4px;
  &__inner {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    .is-active & {
      @apply tw-rounded-sm;
      width: 50%;
      height: 50%;
    }
  }
}
</style>