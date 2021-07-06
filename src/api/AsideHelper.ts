import React from 'react';
import { ComponentType } from 'react';

import { TabPane } from '../components/aside/Aside';
import { ActionType } from '../reducers';
import { IUIAsideState } from '../reducers/ui.reducer/aside.reducer';
import {
  AsideHelper,
  AsideTabPane,
  IAsanyEditor,
  PanelOptions,
  UndoFunc,
} from '../typings';

export default class AsideHelperImpl implements AsideHelper {
  private editor: IAsanyEditor;
  constructor(editor: IAsanyEditor) {
    this.editor = editor;
  }
  get state(): IUIAsideState {
    return this.editor.state.ui.aside;
  }
  next(title: string, body: ComponentType<any>): void {
    const aside = this.editor.state.ui.aside;
    if (!aside.visible || !aside.control || !aside.control.current) {
      return;
    }
    aside.control.current.next(title, React.createElement(body));
  }
  open(tabs: AsideTabPane[], options?: PanelOptions): void | UndoFunc;
  open(
    title: string,
    body: ComponentType<any>,
    options?: PanelOptions
  ): void | UndoFunc;
  open(title: any, body?: any) {
    let options;
    const tabs: TabPane[] = [];
    if (typeof title === 'string') {
      tabs.push({ title, content: body });
    } else {
      tabs.push(...(title as any));
    }
    if (arguments.length == 3) {
      options = arguments[2];
    } else if (Array.isArray(title)) {
      options = arguments[1];
    }
    this.editor.store.dispatch({
      type: ActionType.OpenAside,
      payload: { tabs, options },
    });
  }
  close(): void {
    this.editor.store.dispatch({ type: ActionType.CloseAside });
    // throw new Error('Method not implemented.');
  }
}
