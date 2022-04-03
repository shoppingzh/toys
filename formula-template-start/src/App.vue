<script setup>
import config from 'formula-template/dist/config.json'
import Group from './components/Group.vue';
</script>

<template>
  <Group
    v-for="group in config.groups"
    :key="group.name"
    :data="group"></Group>
  
</template>

<style>
</style>
