export interface IObserver {
  update(): void
}

type Action = (...args: any[]) => any

export default class Observer implements IObserver {

  private readonly action: Action

  constructor(action: Action) {
    this.action = action
  }

  update(): void {
    this.action && this.action()
  }

}

