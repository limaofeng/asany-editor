import { IPluginActionType } from '../../../src/reducers/actions';
import { AsanyAction } from '../../../src/typings';

export enum IconActionType {
  /**
   * 更新 Block 定制器
   */
  UpdateBlockCustomizer = 'UpdateBlockCustomizer',
  Test = 'Form/Test',
}

export interface ISketchState {
  count: number;
}

const defaultState: ISketchState = {
  count: 0,
};

export default function reducer(
  state: ISketchState,
  action: AsanyAction<IconActionType | IPluginActionType>
): ISketchState {
  if (action.type === IPluginActionType.PluginStateInit) {
    return defaultState;
  }
  return state;
}
