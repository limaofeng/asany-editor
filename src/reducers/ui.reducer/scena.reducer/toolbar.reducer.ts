import { AsanyAction, AsanyTool, GlobalAsanyAction } from '../../../typings';

export enum UIScenaToolbarActionType {
  /**
   * 切换工具
   */
  ScenaToolbarSelect = 'UIScenaToolbar/ToolSelect',
  /**
   * 切换工具
   */
  ScenaToolbarUnSelect = 'UIScenaToolbar/ToolbarUnSelect',
  ScenaToggleVisible = 'UIScenaToolbar/ScenaToggleVisible',
  ScenaSetToolbar = 'UIScenaToolbar/SetToolbar',
}

export interface IUIScenaToolbarState {
  tools: AsanyTool[];
  activeKeys: string[];
  visible: boolean;
}

const defaultState: IUIScenaToolbarState = {
  tools: [],
  activeKeys: [],
  visible: false,
};

export default function reducer(
  state: IUIScenaToolbarState,
  action: AsanyAction<UIScenaToolbarActionType | GlobalAsanyAction>
): IUIScenaToolbarState {
  if (action.type == UIScenaToolbarActionType.ScenaToolbarSelect) {
    return { ...state, activeKeys: [...state.activeKeys, action.payload] };
  }
  if (action.type == UIScenaToolbarActionType.ScenaToggleVisible) {
    return { ...state, visible: action.payload };
  }
  if (action.type == UIScenaToolbarActionType.ScenaToolbarUnSelect) {
    return {
      ...state,
      activeKeys: state.activeKeys.filter(
        (item) => !action.payload.includes(item)
      ),
    };
  }
  if (action.type == UIScenaToolbarActionType.ScenaSetToolbar) {
    return { ...state, tools: action.payload };
  }
  if (action.type == GlobalAsanyAction.Init) {
    return defaultState;
  }
  return state;
}
