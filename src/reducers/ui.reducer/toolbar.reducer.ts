import { AsanyAction, AsanyTool, GlobalAsanyAction } from '../../typings';

export enum UIToolbarActionType {
  /**
   * 切换工具
   */
  ToolbarSelect = 'UIToolbar/ToolSelect',
  /**
   * 切换工具
   */
  ToolbarUnSelect = 'UIToolbar/ToolbarUnSelect',
  /**
   * 设置工具栏
   */
  SetToolbar = 'UI/SetToolbar',
}

export interface IUIToolbarState {
  tools: AsanyTool[];
  activeKeys: string[];
}

const defaultState: IUIToolbarState = {
  tools: [],
  activeKeys: [],
};

export default function reducer(
  state: IUIToolbarState,
  action: AsanyAction<UIToolbarActionType | GlobalAsanyAction>
): IUIToolbarState {
  if (action.type == UIToolbarActionType.ToolbarSelect) {
    return { ...state, activeKeys: [...state.activeKeys, action.payload] };
  }
  if (action.type == UIToolbarActionType.ToolbarUnSelect) {
    return {
      ...state,
      activeKeys: state.activeKeys.filter(
        (item) => !action.payload.includes(item)
      ),
    };
  }
  if (action.type == UIToolbarActionType.SetToolbar) {
    return { ...state, tools: action.payload.tools };
  }
  if (action.type == GlobalAsanyAction.Init) {
    return defaultState;
  }
  return state;
}
