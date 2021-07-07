import MoveableHelper from 'moveable-helper';
import { Frame } from 'scenejs';

import { IUIScenaMoveableState } from '../typings';
import Memory from './Memory';
import { getId } from './utils';

export default class MoveableData
  extends MoveableHelper
  implements IUIScenaMoveableState {
  private _selectedTargets: Array<HTMLElement | SVGElement> = [];
  constructor(private memory: Memory) {
    super({
      createAuto: true,
    });
  }
  get draggable(): boolean {
    return true;
  }
  set draggable(draggable: boolean) {
    console.log(draggable);
  }
  get resizable(): boolean {
    return true;
  }
  set resizable(resizable: boolean) {
    console.log(resizable);
  }
  get selectedTargets(): Array<HTMLElement | SVGElement> {
    return this._selectedTargets;
  }
  set selectedTargets(targets: Array<HTMLElement | SVGElement>) {
    this._selectedTargets = targets;
  }
  public getSelectedFrames(): Frame[] {
    return this.selectedTargets.map((target) => this.getFrame(target));
  }
  public renderFrames() {
    this.selectedTargets.forEach((target: any) => {
      this.render(target);
    });
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
      return properties.map(
        (property, i) => memory.get(property.join('///')) || defaultValues[i]
      );
    }

    return properties.map((property, i) => {
      const frameValues = frames.map((frame) => frame.get(...property));

      return frameValues.filter((color) => color)[0] || defaultValues[i];
    });
  }
}
