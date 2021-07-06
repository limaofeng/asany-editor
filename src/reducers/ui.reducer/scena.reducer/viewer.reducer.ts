import { AsanyAction, GlobalAsanyAction } from '../../../typings';

export enum UIScenaViewerActionType {
  DUSTBIN_ACCEPT = 'DUSTBIN_ACCEPT',
}

export interface ViewerState {
  dustbin: string[];
}

const defaultState: ViewerState = {
  dustbin: [],
};

export default function reducer(
  state: ViewerState,
  action: AsanyAction<UIScenaViewerActionType | GlobalAsanyAction>
): ViewerState {
  if (action.type == GlobalAsanyAction.Init) {
    return defaultState;
  }
  if (action.type == UIScenaViewerActionType.DUSTBIN_ACCEPT) {
    return {
      ...state,
      dustbin: Array.from(new Set([...state.dustbin, ...action.payload])),
    };
  }
  return state;
}
