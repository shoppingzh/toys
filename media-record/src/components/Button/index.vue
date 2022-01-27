<template>
  <button
    class="button tw-flex tw-items-center tw-justify-center tw-w-12 tw-h-12 tw-rounded-full
      tw-appearance-none tw-outline-none tw-border-none tw-bg-white tw-text-sm tw-text-gray-700"
    :class="classes"
    @click="click">
    <slot />
  </button>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  type: { type: String, default: null },
  size: { type: String, default: null },
  disabled: { type: Boolean, default: false }
})
const emit = defineEmits(['click'])
const classes = computed(() => {
  const list = []
  if (props.type) {
    list.push(`button--${props.type}`)
  }
  if (props.size) {
    list.push(`button--${props.size}`)
  }
  if (props.disabled) {
    list.push(`is-disabled`)
  }
  return list
})

const click = function() {
  if (props.disabled) return
  emit('click', ...arguments)
}
</script>

<style lang="less" scoped>
.button {
  border-radius: 150px;
  background: #fcfcfc;
  box-shadow:  5px 5px 10px #d9d9d9,
              -5px -5px 10px #ffffff;
  &--primary {
    @apply tw-bg-blue-500;
  }
  &--success {
    @apply tw-bg-green-500;
  }
  &.is-disabled {
    opacity: .5;
    cursor: not-allowed;
  }
}
</style>
