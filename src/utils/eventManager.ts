export interface Callback {
  (arg: any): void;
}

export interface EventListeners {
  [event: string]: Array<Callback>;
}

export interface EventManager {
  on(type: string, callback: Callback): void;
  off(type: string, callback: Callback): void;
  emit<T>(type: string, arg: T): void;
}

export class SimpleEventManager implements EventManager {
  private readonly eventListeners: EventListeners = {};

  on<T>(type: string, callback: (arg: T) => void) {
    const callbacks = this.eventListeners[type] || [];
    this.eventListeners[type] = [...callbacks, callback];
  }

  off<T>(type: string, callback: (arg: T) => void) {
    const callbacks = this.eventListeners[type] || [];
    this.eventListeners[type] = callbacks.filter(cb => cb !== callback);
  }

  emit<T>(type: string, arg: T) {
    const callbacks = this.eventListeners[type] || [];

    for (const callback of callbacks) {
      setTimeout(() => callback.call(this, arg), 0);
    }
  }
}

export const eventManagers: Array<EventManager> = [new SimpleEventManager()];

export function setDefaultEventManager(events: EventManager) {
  eventManagers.splice(0, 1, events);
}
