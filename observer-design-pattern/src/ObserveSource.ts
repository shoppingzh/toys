import { IObserver } from './Observer'

export interface IObserveSource {
  addObserver(observer: IObserver): void
  notify(): void
}

/**
 * 观察源
 */
export default class ObserveSource implements IObserveSource {
  private readonly observers: Set<IObserver>

  constructor() {
    this.observers = new Set()
  }

  addObserver(observer: IObserver): void {
    this.observers.add(observer)  
  }

  notify(): void {
    for (const observer of this.observers) {
      observer.update()
    }
  }
}
