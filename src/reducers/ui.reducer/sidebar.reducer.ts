import { IToolboard } from '../../components/sidebar/Toolboard';
import {
  AsanyAction,
  AsanyTool,
  GlobalAsanyAction,
  IComponentLibrary,
} from '../../typings';

export enum UISidebarActionType {
  /**
   * 改变组件库
   */
  ChangeSymbols = 'ChangeSymbols',
  /**
   * 切换工具
   */
  SidebarSelect = 'UISidebar/ToolSelect',
  /**
   * 切换工具
   */
  SidebarUnSelect = 'UISidebar/SidebarUnSelect',
  /**
   * 工具面板对应的 Key
   */
  ToolboardKey = 'UISidebar/ToolboardKey',
  /**
   * 选择的API
   */
  API = 'API',
  /**
   * 工具版引用对象
   */
  ToolboardRef = 'UISidebar/ToolboardRef',
  /**
   * 设置可见性
   */
  SidebarVisible = 'UISidebar/SidebarVisible',
  SidebarRemoveContent = 'UI/SetSidebar/RemoveContent',
  SidebarSetContent = 'UI/SetSidebar/Content',
  /**
   * 面板最小化
   */
  SidebarContentMinimize = 'UI/SetSidebar/minimizeContent',
  /**
   *设置面板
   */
  SetSidebar = 'UI/SetSidebar',
  /**
   * 设置侧边栏固定面板宽度
   */
  SidebarContentWidth = 'UI/SetSidebar/ContentWidth',
}

export interface IUISidebarState {
  minWidth: number;
  control?: React.RefObject<IToolboard>;
  library?: IComponentLibrary;
  tools: AsanyTool[];
  activeKeys: string[];
  width: number;
  minimizable: boolean;
  content?: React.ComponentType<any>;
  toolboardKey?: string;
  visible: boolean;
  api?: any;
}

const defaultState: IUISidebarState = {
  tools: [],
  width: 250,
  visible: true,
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
      toolboardKey:
        state.toolboardKey === action.payload ? undefined : state.toolboardKey,
      activeKeys: state.activeKeys.filter(
        (item) => !action.payload.includes(item)
      ),
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
      minimizable,
      tools: action.payload.tools,
      visible: action.payload.visible != false,
    };
  }
  if (action.type == GlobalAsanyAction.Init) {
    return defaultState;
  }
  return state;
}
