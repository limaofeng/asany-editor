import { BlockActionType, ProjectActionType } from '../../../typings';
import { AsanyAction, GlobalAsanyAction } from '../../../typings';
import MoveableData from '../../../utils/MoveableData';
import Memory from '../../../utils/Memory';
import MoveableState from './MoveableState';

export enum UIScenaMoveableActionType {
  /**
   * 设置选中的元素
   */
  MoveableSelectedTargets = 'MoveableSelectedTargets',
  /**
   * 禁用 Moveable
   */
  MoveableDisable = 'UI/Scena/Moveable/Disable',
  /**
   * 启用 Moveable
   */
  MoveableEnable = 'UI/Scena/Moveable/Enable',
  /**
   * 忽略
   */
  MoveableIgnoreTargets = 'UI/Scena/Moveable/IgnoreTargets',
}

export interface IUIScenaMoveableState {
  draggable: boolean;
  resizable: boolean;
  visible?: boolean;
  selectedTargets: Array<HTMLElement | SVGElement>;
  targets?: {
    id: string;
    element: React.RefObject<HTMLElement>;
  }[];
  data?: MoveableData;
}

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
