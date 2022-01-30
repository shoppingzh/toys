<template>
  <div ref="el" />
</template>

<script setup>
import katex from 'katex'
import 'katex/dist/katex.css'
import { onMounted, ref } from 'vue'
const el = ref(null)
onMounted(() => {
  katex.render('\\sqrt{2}', el.value, {
    // displayMode: true,
    output: 'html'
  })
})
</script>

<style>
</style>
