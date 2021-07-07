import { ComponentType } from 'react';

import { ActionType } from '../reducers/actions';
import { IAsanyEditor, IUISidebarState, SidebarHelper } from '../typings';

export default class SidebarHelperImpl implements SidebarHelper {
  private editor: IAsanyEditor;
  constructor(editor: IAsanyEditor) {
    this.editor = editor;
  }
  content(content: ComponentType, width?: number, minWidth?: number): void {
    this.editor.dispatch({
      type: ActionType.SidebarSetContent,
      payload: {
        content,
        width,
        minWidth,
      },
    });
  }
  removeContent(): void {
    this.editor.dispatch({ type: ActionType.SidebarRemoveContent });
  }
  get state(): IUISidebarState {
    return this.editor.state.ui.sidebar;
  }
  visible(visible: boolean): void {
    this.editor.dispatch({ type: ActionType.SidebarVisible, payload: visible });
  }

  hasSelected(key: string) {
    return this.editor.state.ui.sidebar.activeKeys.includes(key);
  }

  select(key: string, toolboard?: boolean) {
    const tools = this.tools();
    const item = tools.find((item) => item.id === key);
    const mutexs = item!.mutex
      ? tools.filter((t) => t.mutex === item!.mutex)
      : [];

    if (mutexs.length) {
      this.unselect(...mutexs.map((item) => item.id));
    }
    this.editor.dispatch({
      type: toolboard ? ActionType.ToolboardKey : ActionType.SidebarSelect,
      payload: key,
    });
  }

  unselect(...keys: string[]) {
    this.editor.store.dispatch({
      type: ActionType.SidebarUnSelect,
      payload: keys,
    });
  }

  reopen(toolKey: string): void {
    this.editor.state.ui.sidebar.control!.current!.reopen(toolKey);
  }

  next(content: ComponentType<any>, width?: number): void;
  next(title: string, content: ComponentType<any>): void;
  next(title: string, content: ComponentType<any>, width?: number): void;
  next(index: number, content: ComponentType<any>, width?: number): void;
  next(
    index: number,
    title: string,
    content: ComponentType<any>,
    width?: number
  ): void;
  next(index: any, title?: any, content?: any, width?: any) {
    const toolboard = this.editor.state.ui.sidebar.control!.current!;
    if (typeof index === 'number') {
      if (typeof title === 'function' || title?.prototype?.isReactComponent) {
        toolboard.next(index, undefined, title, content || 250);
      } else {
        toolboard.next(index, title, content, width || 250);
      }
    } else if (
      typeof index === 'function' ||
      (index.prototype && index.prototype.isReactComponent)
    ) {
      toolboard.next(-1, undefined, index, title || 250);
    } else {
      toolboard.next(-1, index, title, content || 250);
    }
  }

  open(key: string, title: string, body: ComponentType): any {
    this.select(key, true);
    this.editor.state.ui.sidebar.control!.current!.open(key, title, body);
    return this.close.bind(this);
  }

  async close(index?: number) {
    this.editor.state.ui.sidebar.control!.current!.close(
      typeof index === 'number' ? index : undefined
    );
  }

  back(): void {
    this.editor.state.ui.sidebar.control!.current!.back();
  }

  tools() {
    return this.editor.state.ui.sidebar.tools;
  }
}
