import type { AsanyAction, IAsanyState, IReducer } from '../typings';

export function combineReducers(
  reducers: { [key: string]: IReducer<any, any> },
  defaultReducer?: IReducer<any, any> | any
) {
  return function (state: IAsanyState | any, action: AsanyAction<any>) {
    for (const p in reducers) {
      state[p] = reducers[p](state[p] || {}, action);
    }
    if (typeof defaultReducer == 'function') {
      state = defaultReducer(state, action);
    }
    return { ...state };
  };
}
