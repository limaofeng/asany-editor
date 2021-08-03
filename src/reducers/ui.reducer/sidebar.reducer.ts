import type { AsanyAction, IUISidebarState } from '../../typings';
import { GlobalAsanyAction, UISidebarActionType } from '../actions';

const defaultState: IUISidebarState = {
  tools: [],
  width: 250,
  visible: false,
  library: undefined,
  activeKeys: [],
  minWidth: 170,
  minimizable: true,
};

export default function reducer(
  state: IUISidebarState,
  action: AsanyAction<UISidebarActionType | GlobalAsanyAction>
): IUISidebarState {
  if (action.type == UISidebarActionType.ChangeSymbols) {
    return { ...state, library: action.payload };
  }
  if (action.type == UISidebarActionType.ToolboardRef) {
    return { ...state, control: action.payload };
  }
  if (action.type == UISidebarActionType.API) {
    return { ...state, api: action.payload };
  }
  if (action.type == UISidebarActionType.SidebarSelect) {
    return { ...state, activeKeys: [...state.activeKeys, action.payload] };
  }
  if (action.type == UISidebarActionType.SidebarUnSelect) {
    return {
      ...state,
      toolboardKey: state.toolboardKey === action.payload ? undefined : state.toolboardKey,
      activeKeys: state.activeKeys.filter((item) => !action.payload.includes(item)),
    };
  }
  if (action.type == UISidebarActionType.ToolboardKey) {
    return {
      ...state,
      toolboardKey: action.payload,
      activeKeys: [action.payload, ...state.activeKeys],
    };
  }
  if (action.type == UISidebarActionType.SidebarVisible) {
    return {
      ...state,
      visible: action.payload,
    };
  }
  if (action.type == UISidebarActionType.SidebarSetContent) {
    const content = action.payload.content;
    const width = action.payload.width || state.width;
    const minWidth = action.payload.minWidth || state.minWidth;
    return {
      ...state,
      content,
      width,
      minWidth,
    };
  }
  if (action.type == UISidebarActionType.SidebarRemoveContent) {
    return {
      ...state,
      content: undefined,
    };
  }
  if (action.type == UISidebarActionType.SidebarContentMinimize) {
    return {
      ...state,
      minimizable: action.payload,
    };
  }
  if (action.type == UISidebarActionType.SidebarContentWidth) {
    return {
      ...state,
      width: action.payload,
    };
  }
  if (action.type == UISidebarActionType.SetSidebar) {
    const content = action.payload.content;
    const width = action.payload.width || state.width;
    const minimizable = action.payload.minimizable || state.minimizable;
    const minWidth = action.payload.minWidth || state.minWidth;
    return {
      ...state,
      minWidth,
      width,
      content,
      minimizable: !action.payload.visible || minimizable,
      tools: action.payload.tools,
      visible: action.payload.visible != false,
    };
  }
  if (action.type == GlobalAsanyAction.Init) {
    return defaultState;
  }
  return state;
}
