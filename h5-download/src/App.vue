<template>
  <button @click="direct">直接下载</button>
  <button @click="outer">新窗口</button>
  <button @click="a">a标签下载</button>
  <button @click="iframe">iframe下载</button>
</template>

<script setup lang="ts">
const url = 'https://gd-cowtransfer.static.cowtransfer.com/cowtransfer/cowtransfer/15854/04311f1e-2512-41b2-b9d2-a71b5681cfb13538813.zip?response-content-disposition=attachment%3B%20filename%3Dnode-v16.14.2-win-x64.zip%3Bfilename*%3Dutf-8%27%27node-v16.14.2-win-x64.zip&auth_key=1657166283-963a2c57c7c144f58cfc0b6e98e29ce2-0-3228be7eaccb83a9e7ed985fb9a88c97&user_id=1019975206477515854&biz_type=1&channel_code=COW_CN_WEB&business_code=COW_TRANSFER'

const direct = () => {
  location.href = url
}

const outer = () => {
  window.open(url)
}

const a = () => {
  const el = document.createElement('a')
  el.download = 'node.zip'
  el.href = url
  el.click()
}

const iframe = () => {
  const el = document.createElement('iframe')
  // el.src = url
  el.style.display = 'none'
  el.contentWindow?.document.addEventListener('readystatechange', e => {
    console.log(e)
  })
  el.contentWindow?.addEventListener('load', e => {
    console.log(e)
  })
  document.body.appendChild(el)
  el.contentWindow.location.href = url
}
</script>


<style>
</style>
