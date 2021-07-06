import { ISettings } from '../../components/aside/Aside';
import {
  AsanyAction,
  AsideTabPane,
  GlobalAsanyAction,
  PanelOptions,
} from '../../typings';
import { BlockActionType } from '../../typings';

export enum UIAsideActionType {
  /**
   * 打开右侧面板
   */
  OpenAside = 'OpenAside',
  /**
   * 关闭右侧面板
   */
  CloseAside = 'CloseAside',

  AsideRef = 'AsideRef',
}

export interface IUIAsideState {
  control?: React.RefObject<ISettings>;
  tabs: AsideTabPane[];
  options?: PanelOptions;
  visible: boolean;
}

const defaultState: IUIAsideState = {
  visible: false,
  tabs: [],
};

export default function reducer(
  state: IUIAsideState,
  action: AsanyAction<UIAsideActionType | GlobalAsanyAction | BlockActionType>
): IUIAsideState {
  if (action.type == UIAsideActionType.CloseAside) {
    return { ...state, visible: false };
  }
  if (action.type == UIAsideActionType.OpenAside) {
    return { ...state, visible: true, ...action.payload };
  }
  if (action.type == UIAsideActionType.AsideRef) {
    return { ...state, control: action.payload };
  }
  if (action.type == BlockActionType.SelectedBlock) {
    return { ...state, visible: true };
  }
  if (action.type == BlockActionType.UncheckBlock) {
    return { ...state, visible: true };
  }
  if (action.type == GlobalAsanyAction.Init) {
    return defaultState;
  }
  return state;
}
