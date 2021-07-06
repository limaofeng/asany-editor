import { combineReducers } from '../index';
import {
  AsanyAction,
  GlobalAsanyAction,
  IBlockState,
  IPluginActionType,
  WorkspaceActionType,
} from '../../typings';
import blockReducer from './block.reducer';
export interface IWorkspaceState {
  block: IBlockState;
  [key: string]: any;
}

export default combineReducers(
  {
    block: blockReducer,
  },
  function (state: any, action: AsanyAction<any>) {
    let newState = state;
    let { reducers } = newState;
    if (WorkspaceActionType.ChangeStateByPlugin === action.type) {
      const { reducers, project } = action.payload;
      newState = reducers
        ? reducers(newState, {
            type: IPluginActionType.PluginStateInit,
            payload: project,
          })
        : newState;
      newState.reducers = reducers;
    }
    newState = reducers ? reducers(newState, action) : newState;
    if (action.type == GlobalAsanyAction.Init) {
      return { ...newState };
    }
    return newState;
  }
);
