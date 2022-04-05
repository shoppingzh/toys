import { drawCircle } from '@/utils/drawer'
import { throttle } from 'lodash'

const DEFAULS = {
  rows: 3,
  cols: 3,
  nodeSize: 70,
  nodeGap: 20,
  nodeActiveColor: '#40a9ff'
}

function inBounds(x, y, bounds) {
  const { x0, y0, x1, y1 } = {
    x0: bounds.x,
    y0: bounds.y,
    x1: bounds.x + bounds.size,
    y1: bounds.y + bounds.size
  }
  return (x >= x0 && x <= x1) && (y >= y0 && y <= y1)
}

class Node {
  constructor(lock, row, col) {
    this.lock = lock
    this.row = row
    this.col = col
    this.ctx = this.lock.ctx
    this.size = this.lock.options.nodeSize
    this.gap = this.lock.options.nodeGap
    this.bounds = {
      x: (this.size + this.gap) * this.col,
      y: (this.size + this.gap) * this.row,
      size: this.size
    }
    this.center = [this.bounds.x + this.bounds.size / 2, this.bounds.y + this.bounds.size / 2]
    this._active = false
    this._init()
  }

  get active() {
    return this._active
  }

  set active(val) {
    this._active = val
  }

  _init() {
    this._render()
  }

  _render() {
    this.ctx.save()
    this.ctx.lineWidth = this.active ? 5 : 2
    this.ctx.strokeStyle = this.active ? this.lock.options.nodeActiveColor : 'rgba(0, 0, 0, .3)'
    this.ctx.beginPath()
    drawCircle(this.ctx, ...this.center, this.bounds.size / 2)
    this.ctx.closePath()
    if (this.active) {
      this.ctx.fillStyle = this.lock.options.nodeActiveColor
      this.ctx.beginPath()
      this.ctx.arc(...this.center, 10, 0, 2 * Math.PI)
      this.ctx.fill()
    }
    this.ctx.restore()
  }
}

export default class GestureLock {
  
  constructor(canvas, options) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')
    this.options = Object.assign({}, DEFAULS, options)
    this.nodes = []
    this._init()
    console.log(this)
    ;(function loop() {
      window.requestAnimationFrame(() => {
        this._rerender()
        loop.call(this)
      })
    }).bind(this)();
  }

  _init() {
    this._renderNodes()

    this.moving = false
    this.canvas.addEventListener('mousedown', e => {
      this.moving = true
      this.session = {
        paths: []
      }
    })
    this.canvas.addEventListener('mousemove', throttle(e => {
      if (!this.moving) return
      const { offsetX: x, offsetY: y } = e
      for (let rowNodes of this.nodes) {
        for (let node of rowNodes) {
          if (node.active) continue
          if (inBounds(x, y, node.bounds)) {
            this.session.paths.push({ row: node.row, col: node.col })
            node.active = true
          }
        }
      }
    }, 50))
    this.canvas.addEventListener('mouseup', e => {
      setTimeout(() => {
        this.moving = false
        this.session = null
        for (let rowNodes of this.nodes) {
          for (let node of rowNodes) {
            node.active = false
          }
        }
      }, 500)
    })
  }

  _renderNodes() {
    const { rows, cols } = this.options
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        let rowNodes = this.nodes[i]
        if (!rowNodes) {
          rowNodes = []
          this.nodes[i] = rowNodes
        }
        rowNodes[j] = new Node(this, i, j)
      }
    }
  }

  _rerender() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
    for (let rowNodes of this.nodes) {
      for (let node of rowNodes) {
        node._render()
      }
    }
    if (this.session) {
      const { paths } = this.session
      for (let i  = 0, len = paths.length; i < len; i++) {
        const path = paths[i]
        const nextPath = paths[i + 1]
        if (!nextPath) break
        const node = this.nodes[path.row][path.col]
        const nextNode = this.nodes[nextPath.row][nextPath.col]
        this.ctx.save()
        this.ctx.strokeStyle = `${this.options.nodeActiveColor}`
        this.ctx.lineWidth = 3
        this.ctx.beginPath()
        this.ctx.moveTo(...node.center)
        this.ctx.lineTo(...nextNode.center)
        this.ctx.closePath()
        this.ctx.stroke()
        this.ctx.restore()
      }
    }
  }

}