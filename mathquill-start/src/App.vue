<script setup>
import { ref, onMounted } from "vue";

const input = ref(null)
onMounted(() => {
  const MQ = MathQuill.getInterface(2)
  const mathField = MQ.MathField(input.value, {

  })
  console.log(mathField)
})
</script>

<template>
  <div ref="input" class="input"></div>
</template>

<style>
  .input {
    width: 100%;
    height: 300px;
    border: 1px solid rgba(0, 0, 0, .4);
    outline: none;
  }
</style>
