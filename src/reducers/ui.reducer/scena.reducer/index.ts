import screens from '../../../assets/devices';
import type { AsanyAction, UIScenaGlobalState } from '../../../typings';
import { dispatchWindowResize } from '../../../utils';
import { GlobalAsanyAction, UIScenaGlobalActionType } from '../../actions';
import { combineReducers } from '../../thunk';
import moveableReducer from './moveable.reducer';
import toolbarReducer from './toolbar.reducer';
import viewerReducer from './viewer.reducer';

export const defaultDeviceScreen = screens.find((i: any) => i.id === 'Desktop');

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
    const { workspace, toolbar } = action.payload;
    return {
      ...state,
      ...action.payload,
      workspace,
      toolbar: {
        ...(state as any).toolbar,
        ...toolbar,
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
