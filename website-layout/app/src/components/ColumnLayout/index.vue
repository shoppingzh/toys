<template>
  <div>
    <el-row :gutter="10" type="flex" align="stretch">
      <el-col
        ref="cols"
        v-for="(percent, index) in percentArray"
        :key="index"
        style="min-height: 100px;"
        :style="{ width: `${percent * 100}%` }">
        <draggable group="module" :list="columnModules[index]" style="padding-bottom: 20px;">
          <module-card
            :ref="`module${module.id}`"
            v-for="(module) in columnModules[index]"
            :key="module.id"
            :name="module.name"
            :color="module.color"
            :style="{ height: module.height + 'px' }" />
        </draggable>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import layout from '../mixins/layout'
import draggable from 'vuedraggable'
import { mapGetters } from 'vuex'
import _ from 'lodash'

export default {
  mixins: [layout],
  components: {
    draggable
  },
  props: {
    columns: {
      type: [String, Array],
      default: '1:3:1'
    }
  },
  data() {
    return {
      columnModules: {}
    }
  },
  computed: {
    ...mapGetters([
      'mainWidth'
    ]),
    columnArray() {
      return (typeof this.columns === 'string' ? this.columns.split(/[:：]/g) : this.columns).map(value => parseInt(value))
    },
    percentArray() {
      const sum = this.columnArray.reduce((sum, value) => sum + value, 0)
      return this.columnArray.map(value => value / sum)
    }
  },
  watch: {
    modules: {
      immediate: true,
      handler(newVal) {
        const map = {}
        this.columnArray.forEach((column, index) => {
          map[index] = newVal.filter(o => o.in === index)
        })
        Object.keys(map).forEach(key => {
          map[key].sort((a, b) => a.index - b.index)
        })
        this.columnModules = map
      }
    },
    columnModules: {
      deep: true,
      handler(newVal) {
        Object.keys(newVal).forEach(key => {
          const arr = newVal[key]
          arr.forEach((module, index) => {
            module.in = parseInt(key)
            module.index = index
          })
        })
      }
    }
  },
  created() {
    this.$watch('columnArray', _.debounce((newVal) => {
      const maxColumnIdx = newVal.length - 1
      const unvisibleModules = this.modules.filter(module => module.in > maxColumnIdx)
      let module = null
      while((module = unvisibleModules.shift())) {
        module.in = 0
      }
    }, 1000))
  },
  mounted() {
    this.setLayoutPoints()
  },
  updated() {
    this.setLayoutPoints()
  },
  methods: {
    // 计算布局信息
    setLayoutPoints() {
      this.modules.forEach(module => {
        const components = this.$refs[`module${module.id}`]
        if (!components || !components.length) return
        const el = components[0].$el
        module.width = el.offsetWidth / this.mainWidth
        module.x = el.offsetLeft / this.mainWidth
        module.y = el.offsetTop
      })
    }
  }
}
</script>

<style>

</style>
