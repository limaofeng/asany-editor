import {
  AsanyAction,
  EditorPlugin,
  GlobalAsanyAction,
  IPluginActionType,
} from '../typings';

export interface IPluginState {
  [key: string]: EditorPlugin;
}

const defaultState: IPluginState = {};

export default function reducer(
  state: IPluginState,
  action: AsanyAction<IPluginActionType | GlobalAsanyAction>
): IPluginState {
  if (GlobalAsanyAction.Init === action.type) {
    return { ...state, ...defaultState };
  }
  return state;
}
