import { combineReducers } from '../thunk';
import type { AsanyAction } from '../../typings';
import { GlobalAsanyAction, IPluginActionType, WorkspaceActionType } from '../actions';

export interface IWorkspaceState {
  [key: string]: any;
}

export default combineReducers({}, function (state: any, action: AsanyAction<any>) {
  let newState = state;
  let { reducers } = newState;
  if (WorkspaceActionType.ChangeStateByPlugin === action.type) {
    const { reducers, project } = action.payload;
    if (reducers) {
      newState = reducers(newState, {
        type: IPluginActionType.PluginStateInit,
        payload: project,
      });
      newState.reducers = reducers;
    }
  }
  newState = reducers ? reducers(newState, action) : newState;
  if (action.type === GlobalAsanyAction.Init) {
    return { ...newState };
  }
  return newState;
});
