<template>
  <div ref="container" class="free-layout">
    <moveable-card
      v-for="(module) in modules"
      :key="module.id"
      ref="modules"
      :module="module"
      :name="module.name"
      :color="module.color"
      :style="styles(module)" />
  </div>
</template>

<script>
import layout from '../mixins/layout'
import MoveableCard from './MoveableCard'
import { mapGetters } from 'vuex'
import _ from 'lodash'

export default {
  mixins: [layout],
  components: {
    MoveableCard
  },
  computed: {
    ...mapGetters([
      'mainWidth'
    ]),
    styles() {
      return module => {
        return {
          width: `${module.width * this.mainWidth}px`,
          height: `${module.height}px`,
          left: `${module.x * this.mainWidth}px`,
          top: `${module.y}px`
        }
      }
    }
  },
  watch: {
    modules() {
      this.$nextTick(() => {
        this.$refs.modules.forEach(module => {
          module.updateGuides()
        })
      })
    }
  },
  created() {
    this.$watch('mainWidth', _.debounce(() => {
      this.$refs.modules.forEach(module => {
        module.reloadMoveable()
      })
    }, 50))
  },
  updated() {
    this.handleCalcBottom()
  },
  mounted() {
    this.handleCalcBottom()
  },
  methods: {
    handleCalcBottom() {
      let bottom = 0
      this.$refs.modules.forEach(module => {
        const el = module.$el
        const currBottom = el.offsetTop + el.offsetHeight
        if (currBottom > bottom) {
          bottom = currBottom
        }
      })
      this.$emit('change', bottom)
    }
  }
}
</script>

<style lang="scss" scoped>
  .free-layout {
    position: relative;
    .module-card {
      position: absolute;
    }
  }
</style>
