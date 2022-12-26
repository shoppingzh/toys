<template>
  <div ref="el" class="el" />
  <div ref="moveableEl" class="moveable-el"></div>
</template>

<script setup lang="ts">
import { useEventListener } from '@vueuse/core'
import { onMounted, shallowRef } from 'vue'
import Moveable from 'moveable'

const el = shallowRef<HTMLElement>();
const moveableEl = shallowRef<HTMLElement>();

useEventListener(el, 'mousedown', e => {
  console.log('mouse down')
  e.preventDefault();
  e.stopImmediatePropagation();
})

useEventListener(el, 'mouseup', e => {
  console.log('mouse up')
})

useEventListener(el, 'click', e => {
  console.log('click')
}, { capture: true })

onMounted(() => {
  const moveable = new Moveable(document.body, {
    target: moveableEl.value,
    draggable: true,
    scalable: true,
  })
  moveable.on('dragStart', e => {
    console.log(e)
  })
})
</script>

<style scoped>
.el {
  width: 200px;
  height: 200px;
  background-color: orange;
}
.moveable-el {
  display: inline-block;
  width: 200px;
  height: 200px;
  background-color: green;
}
</style>
