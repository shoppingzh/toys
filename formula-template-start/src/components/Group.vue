<template>
<li>
  {{ data.title }}
</li>
<ul v-if="data.children">
  <Group
    v-for="child in data.children"
    :key="child.name"
    :data="child" />
</ul>
<template v-if="data.elements">
  <bg-image
    v-for="(ele, index) in data.elements"
    :key="index"
    :image="image"
    :position="ele.image.position"
    :title="ele.exp"
    class="formula" />
</template>
</template>

<script setup>
import image from 'formula-template/dist/groups.png'
import BgImage from './BgImage.vue';
defineProps({
  data: { type: Object, require: true }
})
</script>

<style>
  .formula {
    display: inline-block;
    margin: 5px;
    border: 1px solid #aaa;
  }
</style>
