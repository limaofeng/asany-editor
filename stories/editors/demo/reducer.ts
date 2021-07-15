import { IPluginActionType } from '../../../src/reducers/actions';
import { AsanyAction } from '../../../src/typings';

export enum SketchActionType {
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
  action: AsanyAction<SketchActionType | IPluginActionType>
): ISketchState {
  if (action.type === IPluginActionType.PluginStateInit) {
    return defaultState;
  }
  if (action.type === SketchActionType.Test) {
    return { ...state, count: state.count + 1 };
  }
  return state;
}
