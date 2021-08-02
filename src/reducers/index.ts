import type { AsanyAction, AsanyProviderMode, EditorPlugin, IAsanyState } from '../typings';
import { getFeatures, getScena, getSidebar, getToolbar } from '../utils/plugin';
import { ActionType, GlobalAsanyAction, ProjectActionType } from './actions';
import featureReducer from './features.reducer';
import pluginReducer from './plugin.reducer';
import projectReducer from './project.reducer';
import { combineReducers } from './thunk';
import uiReducer from './ui.reducer';
import workspaceReducer from './workspace.reducer';

export const defaultReducer = (state: IAsanyState, action: AsanyAction<GlobalAsanyAction>): any => {
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

export const defaultValue = (mode: AsanyProviderMode, plugins: EditorPlugin[]): IAsanyState => {
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
