import { AsanyAction, IPluginState } from '../typings';

import { GlobalAsanyAction, IPluginActionType } from './actions';

const defaultState: IPluginState = {};

export default function reducer(
  state: IPluginState,
  action: AsanyAction<IPluginActionType | GlobalAsanyAction>
): IPluginState {
  if (GlobalAsanyAction.Init === action.type) {
    console.log('GlobalAsanyAction', '--->', action);
    return { ...state, ...defaultState };
  }
  return state;
}
