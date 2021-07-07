import { ActionType } from '../reducers/actions';
import { IAsanyEditor, IUIToolbarState, ToolbarHelper } from '../typings';

export default class ToolbarHelperImpl implements ToolbarHelper {
  private editor: IAsanyEditor;
  constructor(editor: IAsanyEditor) {
    this.editor = editor;
  }
  get state(): IUIToolbarState {
    return this.editor.state.ui.toolbar;
  }

  hasSelected(key: string) {
    return this.editor.state.ui.toolbar.activeKeys.includes(key);
  }

  select(key: string) {
    const tools = this.tools();
    const item = tools.find((item) => item.id === key);
    const mutexs = item!.mutex
      ? tools.filter((t) => t.mutex === item!.mutex)
      : [];

    if (mutexs.length) {
      this.unselect(...mutexs.map((item) => item.id));
    }
    this.editor.dispatch({ type: ActionType.ToolbarSelect, payload: key });
  }

  unselect(...keys: string[]) {
    this.editor.store.dispatch({
      type: ActionType.ToolbarUnSelect,
      payload: keys,
    });
  }

  tools() {
    return this.editor.state.ui.toolbar.tools;
  }
}
