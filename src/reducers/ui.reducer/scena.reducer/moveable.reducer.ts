import type { AsanyAction } from '../../../typings';
import Memory from '../../../utils/Memory';
import {
  BlockActionType,
  GlobalAsanyAction,
  ProjectActionType,
  UIScenaMoveableActionType,
} from '../../actions';
import MoveableState from './MoveableState';

export default function reducer(
  state: MoveableState,
  action: AsanyAction<
    | UIScenaMoveableActionType
    | GlobalAsanyAction
    | BlockActionType
    | ProjectActionType
  >
): MoveableState {
  if (action.type == BlockActionType.UncheckBlock) {
    state.selectedTargetKeys = [];
    return state;
  }
  if (action.type == BlockActionType.SelectedBlock) {
    state.selectedTargetKeys = [action.payload.key];
    return state;
  }
  if (action.type == UIScenaMoveableActionType.MoveableSelectedTargets) {
    return state;
  }
  if (action.type == BlockActionType.RegistrationBlock) {
    state.addElement(action.payload.key, {
      ...action.payload,
      ...action.payload.options,
    });
    return state;
  }
  if (action.type == BlockActionType.UninstallBlock) {
    // state.data.removeFrame(action.payload.element);
    // return { ...state, targets: state.targets.filter(item => item.id != action.payload.id) };
    return state;
  }
  if (action.type == UIScenaMoveableActionType.MoveableDisable) {
    state.setEnable(false);
    return state;
  }
  if (action.type == UIScenaMoveableActionType.MoveableEnable) {
    state.setEnable(true);
    return state;
  }
  if (action.type == UIScenaMoveableActionType.MoveableIgnoreTargets) {
    // return {
    //   ...state,
    //   ignoreTargets: action.payload,
    // };
    return state;
  }
  if (action.type == ProjectActionType.ChangeCase) {
    return new MoveableState(new Memory());
  }
  if (action.type == GlobalAsanyAction.Init) {
    return new MoveableState(new Memory());
  }
  return state;
}
