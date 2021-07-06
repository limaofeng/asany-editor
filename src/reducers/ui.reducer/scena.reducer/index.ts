import { combineReducers } from '../../index';
import { AsanyAction, GlobalAsanyAction, IAsanyEditor } from '../../../typings';
import { dispatchWindowResize } from '../../../utils';
import { DeviceScreen } from '../../../components/scena/viewport/ScreenViewport';
import screens from '../../../assets/devices';

import moveableReducer, { UIScenaMoveableActionType } from './moveable.reducer';
import viewerReducer, {
  UIScenaViewerActionType,
  ViewerState,
} from './viewer.reducer';
import toolbarReducer, {
  UIScenaToolbarActionType,
  IUIScenaToolbarState,
} from './toolbar.reducer';
import MoveableState from './MoveableState';
import { IUseBlockState } from '../../../hooks/useBlock';

export const defaultDeviceScreen = screens.find((i: any) => i.id === 'Desktop');

interface GuidelinesDataSet {
  horizontal: number[];
  vertical: number[];
}

export enum UIScenaGlobalActionType {
  /**
   * 改变屏幕尺寸
   */
  ChangeScreenSize = 'ChangeScreenSize',
  /**
   * 改变屏幕尺寸拖拽方式
   */
  ChangeMoveWay = 'ChangeMoveWay',
  /**
   * 切换鼠标选区操作
   */
  ToggleSelecto = 'ChangeSelecto',
  /**
   * 画布缩放
   */
  CanvasZoom = 'CanvasZoom',
  /**
   * 画布缩小
   */
  CanvasZoomOut = 'CanvasZoomOut',
  /**
   * 画布放大
   */
  CanvasZoomIn = 'CanvasZoomIn',
  /**
   * 参考线
   */
  ChangeSnapGuides = 'ChangeSnapGuides',
  SetScena = 'SetScena',
  Loading = 'Loading',
  ScenaReset = 'ScenaSetResetFunc',
}

export const UIScenaActionType = {
  ...UIScenaGlobalActionType,
  ...UIScenaMoveableActionType,
  ...UIScenaViewerActionType,
  ...UIScenaToolbarActionType,
};

export interface UIScenaGlobalState {
  loading: boolean;
  // 缩放比例
  zoom: number;
  reset?: () => void;
  snaps: GuidelinesDataSet;
  // 屏幕设置
  screen: DeviceScreen;
  // 点击事件
  onClick?: (editor: IAsanyEditor, block?: IUseBlockState<any>) => void;
}

export interface IUIScenaState extends UIScenaGlobalState {
  moveable: MoveableState;
  viewer: ViewerState;
  toolbar: IUIScenaToolbarState;
}

const scales = [20, 25, 33, 50, 66, 100, 150, 200, 300, 400, 500, 800, 1000];
const minScale = scales[0];
const maxScale = scales[scales.length - 1];

export function calculateScaling(
  zoom: number,
  type: 'out' | 'in' | 'change' = 'change'
) {
  let newZoom = zoom;
  if (type == 'out') {
    newZoom = [...scales].reverse().find((item) => item < newZoom) || newZoom;
  } else if (type === 'in') {
    newZoom = scales.find((item) => item > newZoom) || newZoom;
  }
  const scale = Math.max(Math.min(newZoom, maxScale), minScale);
  return Math.floor(scale);
}

const defaultState: UIScenaGlobalState = {
  zoom: 1,
  loading: false,
  snaps: {
    vertical: [],
    horizontal: [],
  },
  screen: defaultDeviceScreen!,
};

export function reducer(
  state: UIScenaGlobalState,
  action: AsanyAction<UIScenaGlobalActionType | GlobalAsanyAction>
): UIScenaGlobalState {
  if (action.type == UIScenaGlobalActionType.SetScena) {
    return {
      ...state,
      ...action.payload,
      toolbar: {
        ...(state as any).toolbar,
        ...action.payload.toolbar,
      },
    };
  }
  if (action.type == UIScenaGlobalActionType.Loading) {
    return { ...state, loading: action.payload };
  }
  if (action.type == UIScenaGlobalActionType.ScenaReset) {
    return { ...state, reset: action.payload };
  }
  if (action.type == UIScenaGlobalActionType.ChangeScreenSize) {
    setTimeout(dispatchWindowResize, 10);
    return { ...state, screen: action.payload };
  }
  if (
    action.type === UIScenaGlobalActionType.CanvasZoom &&
    action.payload !== state.zoom
  ) {
    return {
      ...state,
      zoom: calculateScaling(action.payload * 100) / 100,
    };
  }
  if (action.type === UIScenaGlobalActionType.ChangeSnapGuides) {
    return {
      ...state,
      snaps: {
        ...state.snaps,
        horizontal: action.payload.horizontal,
        vertical: action.payload.vertical,
      },
    };
  }
  if (action.type === UIScenaGlobalActionType.CanvasZoomOut) {
    return {
      ...state,
      zoom: calculateScaling(state.zoom * 100, 'out') / 100,
    };
  }
  if (action.type === UIScenaGlobalActionType.CanvasZoomIn) {
    return {
      ...state,
      zoom: calculateScaling(state.zoom * 100, 'in') / 100,
    };
  }
  if (action.type == GlobalAsanyAction.Init) {
    return { ...state, ...defaultState };
  }
  return state;
}

export default combineReducers(
  {
    moveable: moveableReducer,
    viewer: viewerReducer,
    toolbar: toolbarReducer,
  },
  reducer
);
