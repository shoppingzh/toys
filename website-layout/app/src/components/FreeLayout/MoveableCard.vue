<template>
  <module-card
    v-bind="$attrs"
    v-on="$listeners">
    <slot />
  </module-card>
</template>

<script>
import Moveable from 'moveable'
import { mapGetters } from 'vuex'
import _ from 'lodash'

export default {
  props: {
    module: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      cloneModule: Object.assign({}, this.module)
    }
  },
  computed: {
    ...mapGetters([
      'mainWidth'
    ])
  },
  created() {
    this.$watch('cloneModule', _.debounce(newVal => {
      Object.assign(this.module, newVal)
    }, 100), {
      deep: true
    })
  },
  mounted() {
    this.moveable = new Moveable(this.$parent.$el, {
      target: this.$el,
      origin: false,
      draggable: true,
      resizable: true,
      snappable: true,
      elementGuidelines: Array.from(this.$el.parentNode.querySelectorAll('.module-card')),
      isDisplaySnapDigit: true,
      snapCenter: true,
      snapDistFormat: v => `${v}px`,
      // snapElement: true,
      // verticalGuidelines: [0,200,400],
      // horizontalGuidelines: [0,200,400],
      zoom: .6,
      dragArea: true,
      throttleDrag: 0,
      throttleResize: 0,
      scrollable: true,
      scrollContainer: document.body,
      scrollThreshold: 0,
      bounds: {
        left: 0,
        right: 1200,
        top: 0
      }
    })
    this.moveable.on('drag', e => {
      const delta = e.beforeDelta
      this.cloneModule.x += delta[0] / this.mainWidth
      this.cloneModule.y += delta[1]

      this.$el.style.left = (this.cloneModule.x * this.mainWidth) + 'px'
      this.$el.style.top = this.cloneModule.y + 'px'

      this.$el.classList.add('is-dragging')
    })
    this.moveable.on('dragEnd', () => {
      this.$el.classList.remove('is-dragging')
    })
    this.moveable.on('resize', e => {
      // 以下写法会有问题：vue的更新速率导致宽高设置时出现跳动
      this.cloneModule.width += e.delta[0] / this.mainWidth
      this.cloneModule.height += e.delta[1]

      this.$el.style.width = (this.cloneModule.width * this.mainWidth) + 'px'
      this.$el.style.height = this.cloneModule.height + 'px'
    })
  },
  beforeDestroy() {
    this.moveable.destroy()
  },
  methods: {
    reloadMoveable() {
      this.moveable && this.moveable.updateRect()
    },
    updateGuides() {
      this.moveable.elementGuidelines = Array.from(this.$el.parentNode.querySelectorAll('.module-card'))
    }
  }
}
</script>

<style>

</style>
