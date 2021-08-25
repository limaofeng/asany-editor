import { AsanyAction, IUIScenaToolbarState } from '../../../typings';
import { GlobalAsanyAction, UIScenaToolbarActionType } from '../../actions';

const defaultState: IUIScenaToolbarState = {
  tools: [],
  activeKeys: [],
  visible: false,
};

export default function reducer(
  state: IUIScenaToolbarState,
  action: AsanyAction<UIScenaToolbarActionType | GlobalAsanyAction>
): IUIScenaToolbarState {
  if (action.type === UIScenaToolbarActionType.ScenaToolbarSelect) {
    return { ...state, activeKeys: [...state.activeKeys, action.payload] };
  }
  if (action.type === UIScenaToolbarActionType.ScenaToggleVisible) {
    return { ...state, visible: action.payload };
  }
  if (action.type === UIScenaToolbarActionType.ScenaToolbarUnSelect) {
    return {
      ...state,
      activeKeys: state.activeKeys.filter((item) => !action.payload.includes(item)),
    };
  }
  if (action.type === UIScenaToolbarActionType.ScenaSetToolbar) {
    return { ...state, tools: action.payload };
  }
  if (action.type === GlobalAsanyAction.Init) {
    return defaultState;
  }
  return state;
}
