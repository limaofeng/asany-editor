import { merge } from 'lodash-es';

import { combineReducers } from '../reducers/thunk';

import type { AsanyProjectType, IAsanyState } from '../typings';

export const getPlugins = (
  state: IAsanyState,
  projectType: AsanyProjectType
) => {
  const allPlugins = Object.keys(state.plugins).map(
    (key) => state.plugins[key]
  );
  return allPlugins.filter((plugin) => plugin.types.includes(projectType));
};

export const getReducers = (
  state: IAsanyState,
  projectType: AsanyProjectType
) => {
  const plugins = getPlugins(state, projectType);
  const reducers = plugins
    .filter((p) => !!p.reducer)
    .reduce((reducers, p) => {
      reducers[p.id] = p.reducer;
      return reducers;
    }, {} as any);
  if (!Object.keys(reducers).length) {
    return undefined;
  }
  return combineReducers(reducers);
};

export const getScena = (state: IAsanyState, projectType: AsanyProjectType) => {
  const [plugin, ...plugins] = getPlugins(state, projectType);
  if (!plugin) {
    return {};
  }
  const scena = merge(plugin.scena, ...plugins.map((item) => item.scena));
  if (scena.toolbar) {
    scena.toolbar.visible = !!(
      scena.toolbar.visible ||
      (typeof scena.toolbar.visible != 'boolean' && scena.toolbar.tools.length)
    );
  }
  return scena;
};

export function getFeatures(state: IAsanyState, projectType: AsanyProjectType) {
  const plugins = getPlugins(state, projectType);
  const features = plugins.reduce((previous, current) => {
    for (const feature of current.features || []) {
      previous.add(feature);
    }
    return previous;
  }, new Set<string>());
  return Array.from<string>(features.values());
}

export function getToolbar(state: IAsanyState, projectType: AsanyProjectType) {
  const plugins = getPlugins(state, projectType);
  if (!plugins.length) {
    return { tools: [] };
  }
  return merge({ tools: [] }, ...plugins.map((item) => item.toolbar));
}

export function getSidebar(state: IAsanyState, projectType: AsanyProjectType) {
  const plugins = getPlugins(state, projectType);
  if (!plugins.length) {
    return { tools: [] };
  }
  return merge({ tools: [] }, ...plugins.map((item) => item.sidebar));
}

// TODO 获取工具栏
// export function getTools(state: IAsanyState, projectType: AsanyProjectType) {
//   const plugins = getPlugins(state, projectType);
//   const tools = plugins.reduce((previous, current) => {
//     for (const tool of current.tools) {
//       previous.set(tool.id, tool);
//     }
//     return previous;
//   }, new Map<string, AsanyTool>());
//   return Array.from<AsanyTool>(tools.values());
// }
