import { EventEmitter } from 'events';
import { isEqual } from 'lodash-es';

type CallbackFunc = (value: any, prevValue: any) => void | boolean | Promise<void>;

class BlockObserver<T> {
  private key: string;
  private values: any = {};
  private eventEmitter: EventEmitter;

  constructor(key: string, values?: T) {
    this.key = key;
    this.eventEmitter = new EventEmitter();
    this.values = { ...values };
  }

  on(name: string, callback: CallbackFunc) {
    this.eventEmitter.on(name, callback);
  }

  off(name: string, callback: CallbackFunc) {
    this.eventEmitter.off(name, callback);
  }

  observe(values: T | any) {
    for (var key of Object.keys(values || {})) {
      if (!isEqual(this.values[key], values[key])) {
        if (!this.eventEmitter.eventNames().includes(key)) {
          console.warn(this.key, 'key = ', key, '在 customizer.fields 中未声明!');
        }
        if (this.eventEmitter.emit(key, values[key], this.values[key])) {
          this.values[key] = values[key];
        }
      }
    }
  }

  clear() {
    this.eventEmitter.eventNames().forEach(this.eventEmitter.removeAllListeners.bind(this.eventEmitter));
  }
}

export default BlockObserver;
