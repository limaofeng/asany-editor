import { IAsanyStoreContext } from '../AsanyContext';
import {
  AsanyProject,
  AsideHelper,
  FeaturesHelper,
  IAsanyEditor,
  ScenaHelper,
  SidebarHelper,
  ToolbarHelper,
} from '../typings';

import AsideHelperImpl from './AsideHelper';
import FeaturesHelperImpl from './FeaturesHelper';
import SidebarHelperImpl from './SidebarHelper';
import ToolbarHelperImpl from './ToolbarHelper';
import ScenaHelperImpl from './ScenaHelper';

export default class AsanyEditorObject implements IAsanyEditor {
  private _store: IAsanyStoreContext<any>;
  private _features: FeaturesHelper;
  private _toolbar: ToolbarHelper;
  private _sidebar: SidebarHelper;
  private _aside: AsideHelper;
  private _scena: ScenaHelper;

  constructor(store: IAsanyStoreContext<any>) {
    this._store = store;
    this._toolbar = new ToolbarHelperImpl(this);
    this._features = new FeaturesHelperImpl(this);
    this._sidebar = new SidebarHelperImpl(this);
    this._aside = new AsideHelperImpl(this);
    this._scena = new ScenaHelperImpl(this);
  }
  get scena(): ScenaHelper {
    return this._scena;
  }
  get toolbar(): ToolbarHelper {
    return this._toolbar;
  }
  get aside(): AsideHelper {
    return this._aside;
  }
  get sidebar(): SidebarHelper {
    return this._sidebar;
  }
  get features(): FeaturesHelper {
    return this._features;
  }
  get store() {
    return this._store;
  }
  get dispatch() {
    return this._store.dispatch;
  }
  get state() {
    return this._store.getState();
  }
  save(project: AsanyProject): void {
    const save = this.state.save;
    if (!this.state.save) {
      return console.warn('组件 AsanyEditor 未绑定 save 函数');
    }
    save(project);
  }
}
