import { AsanyTool, DeviceScreen, IAsanyEditor, IUIScenaState, ScenaHelper } from '../typings';
import { sleep } from '../utils';
import { getScena } from '../utils/plugin';
import devices from '../assets/devices';
import { ActionType } from '../reducers/actions';

class ScenaHelperImpl implements ScenaHelper {
  private editor: IAsanyEditor;
  constructor(editor: IAsanyEditor) {
    this.editor = editor;
  }
  toolbar = {
    has: (key: ':visible') => {
      if (key === ':visible') {
        return this.editor.scena.state.toolbar.visible;
      }
      return false;
    },
    /**
     *
     * @param key
     */
    select: (key: string) => {
      const tools = this.editor.state.ui.scena.toolbar.tools;
      const item = tools.find((item) => item.id === key);
      const mutexs = item!.mutex ? tools.filter((t) => t.mutex === item!.mutex) : [];

      if (mutexs.length) {
        this.toolbar.unselect(...mutexs.map((item) => item.id));
      }
      this.editor.dispatch({
        type: ActionType.ScenaToolbarSelect,
        payload: key,
      });
    },

    unselect: (...keys: string[]) => {
      this.editor.store.dispatch({
        type: ActionType.ScenaToolbarUnSelect,
        payload: keys,
      });
    },

    /**
     * 设置工具栏是否可见
     * @param enable
     */
    visible: (enable: boolean) => {
      this.editor.dispatch({
        type: ActionType.ScenaToggleVisible,
        payload: enable,
      });
    },

    /**
     * 重设工具栏
     * @param tools
     */
    tools: (tools: AsanyTool[]) => {
      this.editor.dispatch({
        type: ActionType.ScenaSetToolbar,
        payload: tools,
      });
    },

    /**
     * 重设工具栏
     * @param tools
     */
    reset: () => {
      const scena = getScena(this.editor.state, this.editor.state.project.type);
      this.editor.dispatch({
        type: ActionType.ScenaSetToolbar,
        payload: scena.toolbar.tools,
      });
      this.editor.dispatch({
        type: ActionType.ScenaToggleVisible,
        payload: scena.toolbar.visible,
      });
    },
  };
  get state(): IUIScenaState {
    return this.editor.state.ui.scena;
  }
  async mask(): Promise<void> {
    this.editor.dispatch({ type: ActionType.Loading, payload: true });
  }
  async unmask(delay?: number): Promise<void> {
    if (delay) {
      await sleep(delay);
      this.editor.dispatch({ type: ActionType.Loading, payload: false });
    } else {
      this.editor.dispatch({ type: ActionType.Loading, payload: false });
    }
  }
  viewport(id: string): void;
  viewport(width: number, height: number): void;
  viewport(width: any, height?: any) {
    if (arguments.length === 1) {
      const device = devices.find((item) => item.id === width);
      device &&
        this.editor.dispatch({
          type: ActionType.ChangeScreenSize,
          payload: device,
        });
    } else {
      this.editor.dispatch({
        type: ActionType.ChangeScreenSize,
        payload: {
          id: 'custom',
          name: 'Custom',
          size: [width, height],
        } as DeviceScreen,
      });
    }
  }
  reset(): void {
    const reset = this.editor.scena.state.reset;
    reset && reset();
  }
}

export default ScenaHelperImpl;
