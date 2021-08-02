import MoveableHelper from 'moveable-helper';
import { OnDrag, OnDragEnd, OnDragStart, OnResize, OnResizeEnd, OnResizeStart } from 'react-moveable';
import { EventEmitter } from 'events';
import { Frame } from 'scenejs';

import Memory from '../../../utils/Memory';
import { getId } from '../../../utils/utils';

interface MoveableElement {
  element: React.RefObject<HTMLElement>;
  emitter: EventEmitter;
  render?: (target: HTMLElement | SVGElement, frame: Frame) => void;
  update: (props: any | string, value: string | any) => void;
  resizable?: boolean;
  onResizeStart?: (e: OnResizeStart) => void;
  onResize?: (e: OnResize) => void;
  onResizeStop?: (e: OnResizeEnd) => void;
  draggable?: boolean;
  onDragStart?: (e: OnDragStart) => void;
  onDrag?: (e: OnDrag) => void;
  onDragStop?: (e: OnDragEnd) => void;
}

export default class MoveableState extends MoveableHelper {
  private _selectedTargetKeys: string[] = [];
  private _elements = new Map<string, MoveableElement>();
  private _enable = true;
  constructor(private memory: Memory) {
    super({ createAuto: true });
  }
  setEnable(enable: boolean) {
    this._enable = enable;
  }
  get draggable(): boolean {
    const elements = this.elements;
    return elements.length === 1 ? !!elements[0].draggable : false;
  }
  get resizable(): boolean {
    const elements = this.elements;
    return elements.length === 1 ? !!elements[0].resizable : false;
  }
  get elements(): MoveableElement[] {
    return this._selectedTargetKeys.map((item) => this._elements.get(item)) as MoveableElement[];
  }
  get enable(): boolean {
    return this._enable;
  }
  get selectedTargets(): Array<HTMLElement> {
    if (!this._enable) {
      return [];
    }
    return this._selectedTargetKeys
      .map((item) => this._elements.get(item)?.element.current)
      .filter((item) => !!item) as HTMLElement[];
  }
  set selectedTargetKeys(keys: string[]) {
    this._selectedTargetKeys = keys;
  }
  public getSelectedFrames(): Frame[] {
    return this.selectedTargets.map((target) => this.getFrame(target));
  }
  public renderFrames() {
    this.selectedTargets.forEach((target: any) => {
      this.render(target);
    });
  }
  addElement(key: string, { draggable, element, ...item }: MoveableElement) {
    this._elements.set(key, {
      ...item,
      element,
      draggable,
    });
  }
  getHTMLElements(keys: string[]): HTMLElement[] {
    return keys
      .filter((item) => item)
      .map((key) => (this._elements.has(key) ? this._elements.get(key)!.element : null))
      .map((item) => item?.current) as HTMLElement[];
  }
  public setProperty(names: string[], value: any) {
    const targets = this.selectedTargets;

    const infos = targets.map((target) => {
      const frame = this.getFrame(target);
      const prev = frame.get();
      frame.set(...names, value);
      const next = frame.get();

      return { id: getId(target), prev, next };
    });
    this.renderFrames();

    return infos;
  }
  public removeProperties(...names: string[]) {
    return this.selectedTargets.map((target) => {
      const frame = this.getFrame(target);
      const prev = frame.get();

      names.forEach((name) => {
        frame.remove(name);
        target.style.removeProperty(name);
      });
      const next = frame.get();

      return { id: getId(target), prev, next };
    });
  }
  public getProperties(properties: string[][], defaultValues: any[]) {
    const frames = this.getSelectedFrames();
    const memory = this.memory;

    if (!frames.length) {
      return properties.map((property, i) => memory.get(property.join('///')) || defaultValues[i]);
    }

    return properties.map((property, i) => {
      const frameValues = frames.map((frame) => frame.get(...property));

      return frameValues.filter((color) => color)[0] || defaultValues[i];
    });
  }
  private get(target: HTMLElement | SVGElement) {
    return Array.from(this._elements.values()).find((ele) => ele.element.current === target);
  }
  onResizeStart = (e: OnResizeStart) => {
    e.dragStart && this.onDragStart(e.dragStart);
    e.setOrigin(['%', '%']);
    this.get(e.target)?.emitter.emit('resize.start', e);
  };
  onResize = (e: OnResize) => {
    const _super: any = this;
    _super.testResize(e);
    _super.testRender(e.target);
    this.get(e.target)?.emitter.emit('resize.resizing', e);
  };
  public render = (target: HTMLElement | SVGElement, frame: Frame = this.getFrame(target)) => {
    const element = Array.from(this._elements.values()).find((ele) => ele.element.current === target);
    if (element && element.render) {
      element.render(target, frame);
    } else {
      target.style.cssText += frame.toCSS();
    }
  };
  onResizeStop = (e: OnResizeEnd) => {
    this.get(e.target)?.emitter.emit('resize.stop', e);
  };
}
