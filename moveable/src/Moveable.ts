function css(el: HTMLElement, styles: Partial<CSSStyleDeclaration>) {
  Object.keys(styles).forEach((name) => {
    el.style[name] = styles[name]
  })
}

export default class Moveable {
  public readonly el: HTMLElement
  private bounds: DOMRect
  private dragEl: HTMLElement
  private isDragging: boolean = false
  private isMoving: boolean = false

  constructor(el: HTMLElement) {
    this.el = el
    this.init()
  }

  private init() {
    this.bounds = this.el.getBoundingClientRect()
    this.createDragEl()
    document.body.addEventListener('mousemove', this.onMove.bind(this))

    this.dragEl.addEventListener('mousedown', this.onDragStart.bind(this))
    this.dragEl.addEventListener('mousemove', () => {})
    document.body.addEventListener('mouseup', this.onMoveEnd.bind(this))
  }

  private createDragEl() {
    const el = document.createElement('div')
    const size = 8
    css(el, {
      width: `${size}px`,
      height: `${size}px`,
      position: 'fixed',
      zIndex: '999',
      borderRadius: '50%',
      backgroundColor: 'orange',
      cursor: 'se-resize',
    })
    document.body.appendChild(el)

    const observer = new MutationObserver((mutations) => {
      this.resetDragPosition()
    })
    observer.observe(this.el, {
      attributes: true,
      attributeFilter: ['style']
    })
    
    this.dragEl = el
    this.resetDragPosition()
  }


  private resetDragPosition() {
    const size = this.dragEl.clientWidth
    const { right, bottom } = this.el.getBoundingClientRect()
    const left = right - size / 2
    const top = bottom - size / 2
    css(this.dragEl, {
      left: `${left}px`,
      top: `${top}px`,
    })
  }

  private resize(width: number, height: number) {
    css(this.el, {
      width: `${width}px`,
      height: `${height}px`,
    })
  }

  private onMove(e: MouseEvent) {
    if (this.isDragging) {
      const { clientX: x, clientY: y } = e
      const offset = [
        x - this.bounds.right,
        y - this.bounds.bottom
      ]
      this.resize(this.bounds.width + offset[0], this.bounds.height + offset[1])
    }
  }

  private onMoveEnd() {
    this.isDragging = false
    this.isMoving = false
  }

  private onDragStart(e: MouseEvent) {
    this.isDragging = true
  }
}
