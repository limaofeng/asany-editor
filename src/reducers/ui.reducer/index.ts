import { combineReducers } from '../thunk';
import type { AsanyAction } from '../../typings';
import asideReducer from './aside.reducer';
import scenaReducer from './scena.reducer';
import sidebarReducer from './sidebar.reducer';
import toolbarReducer from './toolbar.reducer';
import { GlobalAsanyAction } from '../actions';

export default combineReducers(
  {
    sidebar: sidebarReducer,
    aside: asideReducer,
    scena: scenaReducer,
    toolbar: toolbarReducer,
  },
  (state: any, action: AsanyAction<any>) => {
    if (action.type === GlobalAsanyAction.Init) {
      return { ...state, tools: [] };
    }
    return state;
  }
);
