<template>
  <div>
    <el-form label-position="left" label-width="120px">
      <el-form-item label="名称">
        <el-input v-model="module.name" />
      </el-form-item>
      <el-form-item label="所属列">
        <el-input-number v-model.number="module.in" :min="0" />
      </el-form-item>
      <el-form-item label="第几个">
        <el-input-number v-model.number="module.index" :min="0" />
      </el-form-item>
      <el-form-item label="X坐标">
        <el-input-number v-model.number="module.x" :min="0" />
      </el-form-item>
      <el-form-item label="Y坐标">
        <el-input-number v-model.number="module.y" :min="0" />
      </el-form-item>
      <el-form-item label="宽度">
        <el-input-number v-model.number="module.width" :min="0" />
      </el-form-item>
      <el-form-item label="高度">
        <el-input-number v-model.number="module.height" :min="100" :step="50" />
      </el-form-item>
      <el-form-item label="颜色">
        <el-color-picker v-model="module.color" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    module: {
      type: Object,
      required: true
    }
  },
  methods: {
    handleSubmit() {
      this.$emit('ok')
    }
  }
}
</script>

<style>

</style>
