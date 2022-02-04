<script setup>
import { ref, onMounted } from 'vue'
import FlyImage from 'fly-image'

const img = ref(null)
onMounted(() => {
  new FlyImage(img.value)
})
</script>

<template>
  <img ref="img" src="./assets/1.jpg" width="500">
</template>

<style>
</style>
