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
    module: { type: Object, required: true }
  },
  data() {
    return {
      moveable: null,
      cloneModule: Object.assign({}, this.module),
    }
  },
  computed: {
    ...mapGetters([
      'mainWidth',
      'activeModule'
    ]),
    activeMoveable() {
      return {
        module: this.activeModule,
        moveable: this.moveable,
      }
    },
    isActive() {
      return this.activeModule && this.activeModule.id === this.module.id
    },
  },
  created() {
    this.$watch('cloneModule', _.debounce(newVal => {
      Object.assign(this.module, newVal)
    }, 100), {
      deep: true
    })
  },
  watch: {
    activeMoveable: {
      immediate: true,
      handler() {
        if (!this.moveable) return
        // console.log(this.activeMoveable)
        // const active = this.activeModule && this.activeModule.id === this.module.id
        // this.moveable.draggable = active
        // this.moveable.resizable = active
        this.moveable.zoom = this.isActive ? 1 : 0
      }
    }
  },
  mounted() {
    this.initMoveable()
  },
  beforeDestroy() {
    this.moveable.destroy()
  },
  methods: {
    initMoveable() {
      this.moveable = new Moveable(this.$parent.$el, {
        target: this.$el,
        draggable: true,
        resizable: true,
        snappable: true,

        origin: false,
        elementGuidelines: Array.from(this.$el.parentNode.querySelectorAll('.module-card')),
        renderDirections: ['se'],
        isDisplaySnapDigit: true,
        snapCenter: true,
        snapDistFormat: v => `${v}px`,
        // snapElement: true,
        // verticalGuidelines: [0,200,400],
        // horizontalGuidelines: [0,200,400],
        zoom: 1,
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
      this.moveable.on('dragStart', () => {
        this.$store.commit('SET_ACTIVE_MODULE_ID', this.module.id)
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
