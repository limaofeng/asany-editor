import {
  AsanyAction,
  AsanyProject,
  EditorPlugin,
  GlobalAsanyAction,
  IPluginActionType,
  WorkspaceActionType,
} from '../typings';
import { getFeatures, getScena, getSidebar, getToolbar } from '../utils/plugin';
import featureReducer, {
  IFeatureActionType,
  IFeatureState,
} from './features.reducer';
import pluginReducer, { IPluginState } from './plugin.reducer';
import projectReducer, {
  IProjectState,
  ProjectActionType,
} from './project.reducer';
import uiReducer, { IUIState, UIActionType } from './ui.reducer';
import workspaceReducer, { IWorkspaceState } from './workspace.reducer';

export type AsanyProviderMode = 'VIEW' | 'CONFIG';

export * from './ui.reducer';
export * from './workspace.reducer';
export * from './project.reducer';

type IReducer<T, D> = (state: T, action: AsanyAction<D>) => T;

export interface IAsanyState {
  save: (project: AsanyProject) => void;
  isReady: boolean;
  mode: AsanyProviderMode;
  ui: IUIState;
  project: IProjectState;
  workspace: IWorkspaceState;
  features: IFeatureState;
  plugins: IPluginState;
}

export const ActionType = {
  BindSave: 'BindSave',
  ...GlobalAsanyAction,
  ...UIActionType,
  ...ProjectActionType,
  ...WorkspaceActionType,
  ...IFeatureActionType,
  ...IPluginActionType,
};

export function combineReducers(
  reducers: { [key: string]: IReducer<any, any> },
  defaultReducer?: IReducer<any, any> | any
) {
  return function (state: IAsanyState | any, action: AsanyAction<any>) {
    for (const p in reducers) {
      state[p] = reducers[p](state[p] || {}, action);
    }
    if (typeof defaultReducer == 'function') {
      state = defaultReducer(state, action);
    }
    return { ...state };
  };
}

const defaultReducer = (
  state: IAsanyState,
  action: AsanyAction<GlobalAsanyAction>
): any => {
  if (action.type === GlobalAsanyAction.Init) {
    state.isReady = true;
  }
  if (action.type === GlobalAsanyAction.ChangeMode) {
    state.mode = action.payload;
  }
  if (action.type === ActionType.BindSave) {
    state.save = action.payload;
  }
  return state;
};

const reducers = combineReducers(
  {
    ui: uiReducer,
    workspace: workspaceReducer,
    project: projectReducer,
    features: featureReducer,
    plugins: pluginReducer,
  },
  defaultReducer
);

export const defaultValue = (
  mode: AsanyProviderMode,
  plugins: EditorPlugin[]
): IAsanyState => {
  return {
    isReady: false,
    mode,
    plugins: plugins.reduce((plugins: any, plugin) => {
      plugins[plugin.id] = plugin;
      return plugins;
    }, {}),
  } as any;
};

export default (state: IAsanyState, action: AsanyAction<any>) => {
  console.log('debug', action);
  if (action.type === ProjectActionType.ChangeCase) {
    const project = action.payload;
    let newState = reducers(state, action);
    newState = reducers(newState, {
      type: ActionType.SetToolbar,
      payload: getToolbar(state, project.type),
    });
    newState = reducers(newState, {
      type: ActionType.SetSidebar,
      payload: getSidebar(state, project.type),
    });
    newState = reducers(newState, {
      type: ActionType.SetFeatures,
      payload: getFeatures(state, project.type),
    });
    return reducers(newState, {
      type: ActionType.SetScena,
      payload: getScena(state, project.type),
    });
  }
  return reducers(state, action);
};
