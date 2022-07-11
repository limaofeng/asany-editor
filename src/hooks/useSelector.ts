import { useEffect, useReducer, useRef } from 'react';

import { IAsanyStateContext, IAsanyStoreContext } from '../AsanyContext';

import useAsanyStore from './useAsanyStore';

export type Selector<Selected> = (state: IAsanyStateContext) => Selected;
export type EqualityFn<Selected> = (theNew: Selected, latest: Selected) => boolean;

function toAsanyState(store: IAsanyStoreContext<any>): IAsanyStateContext {
  return store.getState();
}

const defaultEqualityFn = (a: any, b: any) => a === b;

/**
 * 模仿 Redux 的 useSelector
 * @param selector
 * @param equalityFn
 */
export default function useSelector<Selected>(
  selector: Selector<Selected>,
  equalityFn: EqualityFn<Selected> = defaultEqualityFn
) {
  const store = useAsanyStore();
  // 强制让当前组件渲染的方法
  const [, forceRender] = useReducer((s) => s + 1, 0);
  // 存储上一次selector的返回值。
  const latestSelectedState = useRef<Selected>();
  // 根据用户传入的selector，从store中拿到用户想要的值。
  const selectedState = selector(toAsanyState(store));
  // 检查是否需要强制更新
  function checkForUpdates() {
    const newSelectedState = selector(toAsanyState(store));
    // 如果比较相等，就啥也不做
    if (equalityFn(newSelectedState, latestSelectedState.current!)) {
      return;
    }
    // 否则更新ref中保存的上一次渲染的值
    latestSelectedState.current = newSelectedState;
    // 然后强制渲染
    forceRender();
  }
  // 组件第一次渲染后 执行订阅store的逻辑
  useEffect(() => {
    // 在用户调用了dispatch后，执行checkForUpdates
    const unsubscribe = store.subscribe(checkForUpdates);
    // 组件被销毁后 需要调用unsubscribe停止订阅
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return selectedState;
}
