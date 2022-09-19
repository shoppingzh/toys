<template>
  <div>
    <div v-show="dragging" :style="{ height: `${position ? position.height : '0'}px` }" />
    <module-card
      ref="module"
      name="拖动我到画布中"
      :class="{ 'is-dragging': dragging }"
      style="height: 150px;"
      :style="moduleStyle"></module-card>
  </div>
</template>

<script>
import Moveable from 'moveable'
export default {
  name: 'AddModule',
  data() {
    return {
      moveable: null,
      dragging: false,
      position: null,
    }
  },
  computed: {
    moduleStyle() {
      if (!this.position) return {}
      const { x, y, width, height } = this.position
      return {
        left: `${x}px`,
        top: `${y}px`,
        width: `${width}px`,
        height: `${height}px`,
      }
    },
  },
  mounted() {
    this.moveable = Object.freeze(new Moveable(document.body, {
      target: this.$refs.module.$el,
      draggable: true,
      zoom: 0,
    }))
    this.moveable.on('drag', e => {
      this.dragging = true
      this.position = {
        x: e.left,
        y: e.top,
        width: e.width,
        height: e.height,
      }
    })
    this.moveable.on('dragEnd', () => {
      this.dragging = false
      this.$emit('success', { ...this.position })
      this.position = null
    })
  },
  beforeDestroy() {
    this.moveable && this.moveable.destroy()
  },
  methods: {},
}
</script>

<style lang="scss" scoped>
.module-card.is-dragging {
  position: fixed;
  z-index: 99999;
}
</style>
