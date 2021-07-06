import { AsanyAction, GlobalAsanyAction } from '../typings';

export enum IFeatureActionType {
  /**
   * 缩放
   */
  FeatureZoom = 'Features/Zoom',
  /**
   * 标尺
   */
  FeatureRuler = 'Features/Ruler',
  /**
   * 配置块
   */
  FeatureBlock = 'Features/block',

  SetFeatures = 'SetFeatures',

  FeatureDrag = 'FeatureDrag',

  FeatureSelecto = 'FeatureSelecto',
}

export interface IFeatureState {
  zoom: boolean;
  ruler: boolean;
  block: boolean;
  drag: boolean;
  selecto: boolean;
}

const defaultState: IFeatureState = {
  zoom: false,
  ruler: false,
  block: false,
  drag: false,
  selecto: false,
};

export default function reducer(
  state: IFeatureState,
  action: AsanyAction<IFeatureActionType | GlobalAsanyAction>
): IFeatureState {
  if (action.type == GlobalAsanyAction.Init) {
    return defaultState;
  }
  if (action.type == IFeatureActionType.SetFeatures) {
    return Object.keys(defaultState).reduce(
      (state: any, key) => {
        state[key] = action.payload.includes(key);
        return state;
      },
      { ...state }
    );
  }
  if (action.type == IFeatureActionType.FeatureDrag) {
    return {
      ...state,
      selecto: action.payload ? false : state.selecto,
      drag: action.payload,
    };
  }
  if (action.type == IFeatureActionType.FeatureSelecto) {
    return {
      ...state,
      drag: action.payload ? false : state.drag,
      selecto: action.payload,
    };
  }
  if (action.type == IFeatureActionType.FeatureZoom) {
    return { ...state, zoom: action.payload };
  }
  if (action.type == IFeatureActionType.FeatureRuler) {
    return { ...state, ruler: action.payload };
  }
  if (action.type == IFeatureActionType.FeatureBlock) {
    return { ...state, block: action.payload };
  }
  return state;
}
