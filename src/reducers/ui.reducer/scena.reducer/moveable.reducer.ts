import type { AsanyAction } from '../../../typings';
import { GlobalAsanyAction, ProjectActionType, UIScenaMoveableActionType } from '../../actions';
import MoveableState from './MoveableState';

export default function reducer(
  state: MoveableState,
  action: AsanyAction<UIScenaMoveableActionType | GlobalAsanyAction | ProjectActionType>
): MoveableState {
  // if (action.type === UIScenaMoveableActionType.MoveableSelectedTargets) {
  //   return state;
  // }
  // if (action.type === BlockActionType.RegistrationBlock) {
  //   state.addElement(action.payload.key, {
  //     ...action.payload,
  //     ...action.payload.options,
  //   });
  //   return state;
  // }
  // if (action.type === BlockActionType.UninstallBlock) {
  //   // state.data.removeFrame(action.payload.element);
  //   // return { ...state, targets: state.targets.filter(item => item.id != action.payload.id) };
  //   return state;
  // }
  // if (action.type === UIScenaMoveableActionType.MoveableDisable) {
  //   state.setEnable(false);
  //   return state;
  // }
  // if (action.type === UIScenaMoveableActionType.MoveableEnable) {
  //   state.setEnable(true);
  //   return state;
  // }
  // if (action.type === UIScenaMoveableActionType.MoveableIgnoreTargets) {
  //   // return {
  //   //   ...state,
  //   //   ignoreTargets: action.payload,
  //   // };
  //   return state;
  // }
  if (action.type === ProjectActionType.ChangeCase) {
    return new MoveableState();
  }
  if (action.type === GlobalAsanyAction.Init) {
    return new MoveableState();
  }
  return state;
}
