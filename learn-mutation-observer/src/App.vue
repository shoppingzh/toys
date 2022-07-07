<template>
  <div ref="el" style="width: 300px; height: 150px; background-color: orange;" />
</template>


<script lang="ts" setup>
import { onMounted, ref } from 'vue'
const el = ref<HTMLElement>(null)

onMounted(() => {
  new MutationObserver((mutations, observer) => {
    console.log(mutations)
  }).observe(el.value, {
    attributes: true,
    attributeOldValue: true,
    childList: true,
    subtree: true
  })

  new MutationObserver((mutations) => {
    console.log('parent mutations: ')
    console.log(mutations)
  }).observe(el.value.parentNode, {
    childList: true,
    subtree: true
  })

})
</script>
