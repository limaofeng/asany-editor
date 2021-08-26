import type { AsanyAction, IUIAsideState } from '../../typings';
import { GlobalAsanyAction, UIAsideActionType } from '../actions';

const defaultState: IUIAsideState = {
  visible: false,
  tabs: [],
};

export default function reducer(
  state: IUIAsideState,
  action: AsanyAction<UIAsideActionType | GlobalAsanyAction>
): IUIAsideState {
  if (action.type === UIAsideActionType.CloseAside) {
    return { ...state, visible: false };
  }
  if (action.type === UIAsideActionType.OpenAside) {
    return { ...state, visible: true, ...action.payload };
  }
  if (action.type === UIAsideActionType.AsideRef) {
    return { ...state, control: action.payload };
  }
  if (action.type === GlobalAsanyAction.Init) {
    return defaultState;
  }
  return state;
}
