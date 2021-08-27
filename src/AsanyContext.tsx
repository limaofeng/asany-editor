import React, { useCallback, useEffect, useMemo, useReducer, useState } from 'react';

import sketchReducer, { defaultValue } from './reducers';
import { ActionType } from './reducers/actions';
import { getReducers } from './utils/plugin';
import type { AsanyAction, AsanyProject, AsanyProviderMode, EditorPlugin, IAsanyState } from './typings';
type UnsubscribeFunc = () => void;

type SubscribeCallback = () => void;

type SubscribeFunc = (callback: SubscribeCallback) => UnsubscribeFunc;

export type DispatchWithoutAction<T> = (action: AsanyAction<T>) => void;

export type IAsanyStoreContext<D> = {
  getState: () => IAsanyState;
  subscribe: SubscribeFunc;
  dispatch: DispatchWithoutAction<D>;
};

/**
 * 创建Content状态
 */
export const AsanyContext = React.createContext<IAsanyStoreContext<any>>([] as any);

export interface AsanyProviderProps {
  children: JSX.Element;
  mode?: AsanyProviderMode;
  plugins?: EditorPlugin[];
  value?: AsanyProject;
  version?: number;
}

function useStore(mode: AsanyProviderMode, plugins: EditorPlugin[] = []): IAsanyStoreContext<any> {
  const [state, dispatch] = useReducer<React.ReducerWithoutAction<IAsanyState>>(
    sketchReducer as any,
    defaultValue(mode, plugins)
  );
  const [listeners] = useState<SubscribeCallback[]>([]);
  const handleUnsubscribe = (callback: SubscribeCallback) => () => {
    const index = listeners.indexOf(callback);
    if (index > -1) {
      listeners.splice(index, 1);
    }
  };

  const handleSubscribe = useCallback(
    (callback: SubscribeCallback) => {
      listeners.unshift(callback);
      return handleUnsubscribe(callback);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [listeners]
  );
  // TODO 后期需要优化，解决由于 hover 导致的频繁触发
  const handleDispatchSubscribe = useCallback(() => {
    for (const listener of listeners) {
      listener();
    }
  }, [listeners]);

  const initStore = {
    getState: () => state,
    dispatch,
    subscribe: handleSubscribe,
  };
  const [store] = useState(initStore);
  useEffect(() => {
    store.getState = () => state;
    handleDispatchSubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state]);
  return store;
}

export const AsanyProvider = (props: AsanyProviderProps) => {
  const { children, version, value, plugins } = props;
  const store = useStore(props.mode || 'CONFIG', plugins);
  const { dispatch } = store;
  useEffect(() => {
    dispatch({ type: ActionType.Init });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (!value) {
      return;
    }
    dispatch({ type: ActionType.ChangeCase, payload: value });
    const reducers = getReducers(store.getState(), value.type);
    dispatch({
      type: ActionType.ChangeStateByPlugin,
      payload: { reducers, project: value },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);
  return useMemo(
    () => <AsanyContext.Provider value={store}>{store.getState().isReady && children}</AsanyContext.Provider>,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [version, store.getState().isReady]
  );
};
export interface IAsanyStateContext extends IAsanyState {}
