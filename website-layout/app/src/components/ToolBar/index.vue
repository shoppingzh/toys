<template>
  <div>
    <div
      class="tool-bar"
      :class="{ 'is-hide': !show }"
      @mouseenter="show = true"
      @mouseleave="show = false">
      <el-form size="small" label-position="top" label-suffix="：">
        <el-form-item label="网站布局形式">
          <el-radio-group v-model="config.layout">
            <el-radio :label="0">标准模式</el-radio>
            <el-radio :label="1">自适应模式</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-if="config.layout === 0" label="网站宽度">
          <el-slider v-model="config.width" :min="750" :max="1920" :marks="widthMarks" />
        </el-form-item>
        <el-form-item label="开启自由模式">
          <el-switch v-model="mode" />
        </el-form-item>
        <el-form-item v-if="config.type === 'column'" label="调整列数">
          <el-input v-model="config.columns" />
        </el-form-item>
        <el-form-item label="其他">
          <div class="tool-bar__actions">
            <el-button
              @click="handleAddModule">添加模块</el-button>
            <el-button
              @click="handleUpdateColumns">调整列数</el-button>
            <el-button
              type="danger"
              @click="handleClearModules">清空模块</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog
      :visible.sync="dialog.add"
      title="添加模块"
      width="500px">
      <add-module :module="module" @ok="handleAddModuleEnd" />
    </el-dialog>
    <el-dialog
      :visible.sync="dialog.updateColumns"
      title="调整列数"
      width="400px">
      <el-input v-model="strColumns" @keydown.native.enter="handleSaveColumns" />
    </el-dialog>
  </div>
</template>

<script>
import AddModule from './AddModule'
import * as api from '@/api/module'

export default {
  components: {
    AddModule
  },
  props: {
    config: {
      type: Object,
      default: () => ({})
    },
    modules: {
      type: Array,
      required: true
    }
  },
  data() {
    this.widthMarks = {
      960: '960',
      1200: '1200',
      1360: '1360',
    }
    return {
      show: true,
      module: null,
      dialog: {
        add: false,
        updateColumns: false
      }
    }
  },
  computed: {
    mode: {
      get() {
        return this.config.type === 'free'
      },
      set(newVal) {
        this.config.type = newVal ? 'free' : 'column'
      }
    },
    strColumns: {
      get() {
        return typeof this.config.columns === 'string' ? this.config.columns : this.config.columns.join(':')
      },
      set(newVal) {
        this.config.columns = newVal
      }
    }
  },
  mounted() {
    setTimeout(() => {
      this.show = false
    }, 1000)
  },
  methods: {
    handleAddModule() {
      this.module = {
        id: +new Date() + Math.random(),
        name: '模块',
        in: null,
        index: null,
        x: null,
        y: null,
        width: 0,
        height: 0,
        color: null
      }
      this.dialog.add = true
    },
    handleAddModuleEnd() {
      this.dialog.add = false
      this.modules.push(Object.assign({}, this.module))
    },
    handleUpdateColumns() {
      this.dialog.updateColumns = true
    },
    handleSaveColumns() {
      this.dialog.updateColumns = false
    },
    handleClearModules() {
      this.$confirm('确定清空所有模块？').then(() => {
        api.clear()
        this.modules.splice(0, this.modules.length)
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .tool-bar {
    position: fixed;
    z-index: 3;
    left: 0;
    top: 0;
    bottom: 0;
    padding: 20px;
    width: 300px;
    box-shadow: 0 0 4px rgba(0, 0, 0, .1), 3px 0 8px rgba(0, 0, 0, .15);
    background-color: #fff;
    transition: transform .3s;
    &.is-hide {
      transform: translateX(-95%);
      &:after {
        content: "";
      }
    }
    &__actions {
      >>> .el-button {
        margin-bottom: 20px;
      }
    }
  }
</style>
