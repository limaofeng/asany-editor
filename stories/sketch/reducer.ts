import { IPluginActionType, UISidebarActionType } from '../../src/reducers/actions';
import { AsanyAction } from '../../src/typings';

export enum IconActionType {
  /**
   * 更新 Block 定制器
   */
  UpdateBlockCustomizer = 'UpdateBlockCustomizer',
  SELECTO = 'ICON/SELECTO',
  MOVE = 'ICON/MOVE',
}

export interface ISketchState {
  count: number;
  selecto: boolean;
  move: boolean;
}

const defaultState: ISketchState = {
  count: 0,
  selecto: true,
  move: false,
};

export default function reducer(
  state: ISketchState,
  action: AsanyAction<IconActionType | IPluginActionType | UISidebarActionType>
): ISketchState {
  if (action.type === IPluginActionType.PluginStateInit) {
    return defaultState;
  }
  if (action.type === IconActionType.SELECTO) {
    return { ...defaultState, selecto: action.payload };
  }
  if (action.type === UISidebarActionType.SidebarSelect) {
    console.log(action);
    return {
      ...defaultState,
      selecto: action.payload.includes('selecto'),
      move: action.payload.includes('move'),
    };
  }
  if (action.type === UISidebarActionType.SidebarUnSelect) {
    console.log(action);
    return { ...defaultState, selecto: !action.payload.includes('selecto'), move: !action.payload.includes('move') };
  }
  return state;
}
