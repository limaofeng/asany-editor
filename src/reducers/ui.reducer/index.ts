import { combineReducers } from '../index';

import scenaReducer, {
  IUIScenaState,
  UIScenaActionType,
} from './scena.reducer';
import asideReducer, {
  IUIAsideState,
  UIAsideActionType,
} from './aside.reducer';
import sidebarReducer, {
  IUISidebarState,
  UISidebarActionType,
} from './sidebar.reducer';
import toolbarReducer, {
  IUIToolbarState,
  UIToolbarActionType,
} from './toolbar.reducer';
import { AsanyAction, GlobalAsanyAction } from '../../typings';

export interface IUIState {
  sidebar: IUISidebarState;
  aside: IUIAsideState;
  scena: IUIScenaState;
  toolbar: IUIToolbarState;
}

export const UIActionType = {
  ...UISidebarActionType,
  ...UIAsideActionType,
  ...UIScenaActionType,
  ...UIToolbarActionType,
};

export default combineReducers(
  {
    sidebar: sidebarReducer,
    aside: asideReducer,
    scena: scenaReducer,
    toolbar: toolbarReducer,
  },
  (state: any, action: AsanyAction<any>) => {
    if (action.type == GlobalAsanyAction.Init) {
      return { ...state, tools: [] };
    }
    return state;
  }
);
