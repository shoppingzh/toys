<template>
  <!-- <div class="w-32 h-32 bg-blue-500">

  </div> -->

  <div class="p-2 text-gray-900 font-semibold">首页</div>
  <div class="p-2 text-gray-900 font-semibold">学习TailwindCSS</div>
  <div class="p-2 text-gray-900 font-semibold">TailwindCSS的设计哲学</div>
  <div class="p-2 text-gray-900 font-semibold">最佳实践</div>

  <div class="menu">首页</div>
  <div class="menu">学习TailwindCSS</div>
  <div class="menu">TailwindCSS的设计哲学</div>
  <div class="menu">最佳实践</div>

  <div
    v-for="menu in ['首页', '学习TailwindCSS', 'TailwindCSS的设计哲学', '最佳实践']"
    :key="menu"
    class="p-2 text-gray-900 font-semibold">{{ menu }}</div>

  <div class="div" />

  <div class="hello w-32 h-32 bg-green-500" />
</template>

<style>
.menu {
  @apply p-2 text-gray-900 dark:text-gray-100 font-semibold;
}

.div {
  border-top: 1px solid theme('colors.gray.200');
}

@media (min-width: 768px) {
  .hello {
    @apply bg-blue-500;
  }
}

</style>