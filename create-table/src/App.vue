<script setup>
import { reactive, ref, toRaw } from "@vue/reactivity"

const rowCount = ref(9)
const colCount = ref(9)
const table = reactive({
  row: 0,
  col: 0
})
const renderTable = ref(null)

const create = (row, col) => {
  table.row = row
  table.col = col
}
const render = () => {
  renderTable.value = Object.assign({}, toRaw(table))
}
</script>

<template>
<div
  v-for="row in rowCount"
  :key="row">
  <div
    v-for="col in colCount"
    :key="col"
    class="col"
    :class="{ 'is-active': row <= table.row && col <= table.col }"
    @mouseenter="create(row, col)"
    @click="render"></div>  
</div>

<table v-if="renderTable">
  <tr
    v-for="row in renderTable.row"
    :key="row">
    <td
      v-for="col in renderTable.col"
      :key="col">
      <input>
    </td>
  </tr>
</table>
</template>

<style lang="less" scoped>
.col {
  display: inline-block;
  width: 30px;
  height: 30px;
  border: 1px solid #eee;
  cursor: pointer;
  &.is-active {
    background-color: skyblue;
  }
  &:not(:last-child) {
    margin-right: 5px;
  }
}

table {
  td {
    width: 80px;
    height: 30px;
    border: 1px solid #666;
    overflow: hidden;
    input {
      width: 100%;
      border: none;
      outline: none;
    }
  }
}
</style>
