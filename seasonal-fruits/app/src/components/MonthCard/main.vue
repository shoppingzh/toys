<template>
  <div class="month-card">
    <div class="month-card__title">{{ no }}月</div>
    <div class="month-card__inner">
      <div
        v-for="fruit in fruits"
        :key="fruit.id"
        class="month-card__item">{{ fruit.name }}</div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'
import * as api from '@/api/fruit'

export default {
  name: 'MonthCard',
  props: {
    no: { type: Number, default: 1 }
  },
  setup(props) {
    const fruits = ref([])
    const load = async() => {
      const data = await api.listInMonth(props.no)
      fruits.value = data || []
    }

    load()

    return {
      fruits,
      load
    }
  }
}
</script>

<style lang="less" scoped>
  .month-card {
    padding: 20px;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(200, 200, 200, .3), 3px 3px 6px rgba(200, 200, 200, .5);
    & + & {
      margin-top: 20px;
    }
    &__title {
      margin-bottom: 12px;
      font-size: 26px;
      font-weight: bold;
      color: #333;
    }
    &__item {
      display: inline-block;
      margin: 0 5px 10px 5px;
      padding: 3px 10px;
      font-size: 14px;
      color: #666;
      border: 1px solid #ccc;
      border-radius: 1000px;
      cursor: pointer;
      transition: all .3s ease-in-out;
      &:hover {
        color: orange;
        border-color: orange;
        box-shadow: 2px 2px 7px rgba(100, 100, 100, .3);
        transform: translate(-1px, -1px) scale(1.05);
      }
    }
  }
</style>
