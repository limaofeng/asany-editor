import type { AsanyAction, ViewerState } from '../../../typings';
import { GlobalAsanyAction, UIScenaViewerActionType } from '../../actions';

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
