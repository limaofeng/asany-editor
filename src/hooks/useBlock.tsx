// import { ApolloClient, useApolloClient } from '@apollo/client';
import classnames from 'classnames';
import { EventEmitter } from 'events';
import { isEqual } from 'lodash-es';
import React, {
  DependencyList,
  MouseEventHandler,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from 'react';
import { CSSProperties } from 'react';
import { OnResize, OnResizeEnd, OnResizeStart } from 'react-moveable';

import BlockObserver from '../components/Observer';
import { father } from '../typings';
import { dispatchWindowResize, sleep } from '../utils';
import useDispatch from './useDispatch';
import useEditor from './useEditor';
import useSelector from './useSelector';

// import { IComponentProperty } from '../../library-manager/typings';
import type {
  IBlockData,
  IBlockDataProps,
  IBlockOptions,
  IComponentProperty,
  ICustomizer,
} from '../typings';
import { BlockActionType, WorkspaceActionType } from '../reducers/actions';
// import { MoveableOptions } from 'moveable';
export interface IBlockContext {
  parentBlockKey: string;
}

export const BlockContext = React.createContext<IBlockContext>({
  parentBlockKey: '',
});

// TODO 会导致不能刷新 / 或者频繁刷新
const buildBlockProvider = (
  blockKey: string,
  cache: React.RefObject<IUseBlock<any>>
) => {
  const keys = blockKey.split('/');
  const lastKey = keys[keys.length - 1];
  return React.forwardRef(
    (
      {
        style,
        children,
        deps,
        clickable,
        onClick: exitOnClick,
        className,
        ...props
      }: IBlockProviderProps,
      ref
    ) => {
      const disabled = useSelector(
        (state) => !!(state.mode === 'VIEW' || !state.features.block)
      );
      const context = useRef({ parentBlockKey: blockKey });
      return useMemo(
        () => {
          const [{ onClick }, blockRef] = cache.current!;
          const handleClick = exitOnClick || onClick;
          return (
            <BlockContext.Provider value={context.current}>
              {(clickable || exitOnClick) && !disabled ? (
                <div
                  {...props}
                  className={classnames(`block-${lastKey}-provider`, className)}
                  onClick={handleClick}
                  style={style}
                  ref={ref ? blockRef(ref) : blockRef}
                >
                  {children}
                </div>
              ) : (
                children
              )}
            </BlockContext.Provider>
          );
        },
        deps ? [disabled, className, style, ...deps] : undefined
      );
    }
  );
};

interface IBlockProviderProps {
  ref?: any;
  children?: any;
  onClick?: MouseEventHandler<HTMLDivElement>;
  clickable?: boolean;
  style?: CSSProperties;
  className?: string;
  deps?: DependencyList | undefined;
}

type UpdateFunc<T> = (props: T | string, value?: any) => void;

export interface IUseBlockState<T> extends IBlockData<T> {
  onClick: (e?: React.MouseEvent) => void;
  update: UpdateFunc<T>;
  props: T;
  Provider: React.ComponentType<IBlockProviderProps>;
}
type IUseBlock<T> = [IUseBlockState<T>, (ref: any) => any];

function initialize(fields: IComponentProperty[], props: any = {}) {
  for (const field of fields) {
    const { init } = field.hooks || {};
    if (!init) {
      continue;
    }
    props[field.name] = init(props[field.name]);
  }
  return props;
}

interface BlockListenerOptions {
  resizable: boolean;
  draggable: boolean;
  // client: ApolloClient<any>;
  onChange: UpdateFunc<any>;
}

function buildListeners(
  observer: BlockObserver<any>,
  customizer: ICustomizer,
  props: any,
  forceRender: () => void,
  options: BlockListenerOptions
) {
  observer.clear();
  const fields = customizer.fields || [];
  const general =
    options.draggable || options.resizable
      ? [{ name: 'frame' } as IComponentProperty]
      : [];
  for (const field of [...fields, ...general]) {
    const { before, convert, after } = field.hooks || {};
    observer.on(field.name, async (value: any) => {
      const _options = {
          ...options,
          onChange: (value: any) => options.onChange(field.name, value),
        },
        oldValue = props[field.name],
        _field = { value, oldValue };
      // 前置处理
      if (before) {
        props[field.name] = before(_field, _options);
        forceRender();
      }

      // 转换逻辑
      if (convert) {
        const newValue = await convert(_field, _options);
        if (!isEqual(newValue, oldValue)) {
          if (field.hooks?.options?.merge) {
            Object.assign(props, newValue);
          } else {
            props[field.name] = newValue;
          }
          forceRender();
        }
      } else if (!isEqual(value, oldValue)) {
        props[field.name] = value;
      }

      // 后置处理
      if (after) {
        props[field.name] = after({ value: props[field.name] }, _options);
        forceRender();
      }
    });
  }
}

export function useBlockContext(key: string) {
  const context = useContext(BlockContext);
  const [state] = useState(() => {
    if (key === father) {
      return { key };
    }
    return {
      parentBlockKey: context.parentBlockKey,
      key: context.parentBlockKey ? context.parentBlockKey + '/' + key : key,
    };
  });
  return state;
}

// {}: /*areas = ['hover', 'active'], moveable: moveableOptions*/
export default function useBlock<T extends IBlockDataProps>(
  origin: IBlockOptions<T>
): IUseBlock<T> {
  // 初始化状态 - 向 Sketch 注册之后标示为 true
  const editor = useEditor();
  const initialized = useRef(false);
  const emitter = useRef<EventEmitter>(new EventEmitter());
  const cacheResult = useRef<IUseBlock<T>>([] as any);
  // 创建 ref 用于生成定位框指向元素的位置
  const block = useRef<HTMLDivElement>();
  // 获取 block 的 key 即原来的 parentBlockKey + key
  const { key } = useBlockContext(origin.key);
  // 使用生成的 key 组合新的 data 数据
  const dataRef = useRef<IBlockOptions<T>>({ ...origin, key });
  const data = dataRef.current;
  // 创建 BlockProvider，组合 useBlockContext 使用
  const Provider = useRef(buildBlockProvider(data.key, cacheResult));
  // 通过 customizer.fields 及 data.props 生成配置默认数据
  const props = useRef<any>(
    initialize(data.customizer?.fields || [], { ...data.props })
  );
  // 监听 store 中对应 block 的值变化, 即下面的 values 变量
  const observer = useRef<BlockObserver<T>>(
    new BlockObserver(data.key, emitter.current)
  );
  // 是否显示选框
  const isMoveable = useRef<boolean>(false);
  const handleScenaClick = useSelector((state) => state.ui.scena.onClick);

  const dispatch = useDispatch<BlockActionType>();

  // const client = useApolloClient();
  const [version, forceRender] = useReducer((s) => s + 1, 0);
  const disabled = useSelector(
    (state) => state.mode === 'VIEW' || !state.features.block
  );
  const values = useSelector(
    (state) =>
      state.workspace.block.blocks.find(
        ({ key: itemKey }) => itemKey === data.key
      )?.props,
    isEqual
  );

  const handleChange = useCallback((props: T | string, value: string) => {
    if (!initialized.current) {
      return;
    }
    if (value) {
      dispatch({
        type: WorkspaceActionType.UpdateBlockProps,
        payload: {
          key: data.key,
          props: { ...dataRef.current.props, [props as string]: value },
        },
      });
    } else {
      dispatch({
        type: WorkspaceActionType.UpdateBlockProps,
        payload: {
          key: data.key,
          props,
        },
      });
    }
  }, []);

  const handleMouseEnter = useCallback(() => {
    dispatch({
      type: WorkspaceActionType.PushBlock,
      payload: { key: data.key },
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    dispatch({
      type: WorkspaceActionType.PopBlock,
      payload: { key: data.key },
    });
  }, []);

  const handleMouseDown = useCallback((e: MouseEvent) => {
    const className = (e.target as any).className;
    if (!className || typeof className !== 'string') {
      isMoveable.current = false;
    } else {
      isMoveable.current = className.includes('moveable-control');
    }
  }, []);

  const handleClick = useCallback(
    (e?: React.MouseEvent) => {
      if (disabled) {
        return;
      }
      e && e.stopPropagation();
      if (isMoveable.current) {
        return;
      }
      // TODO 如果为 moveable 事件，不触发 SelectedBlock 逻辑
      if (
        e &&
        (e.target as any).className.includes &&
        (e.target as any).className.includes('moveable-control')
      ) {
        return;
      }
      handleScenaClick &&
        handleScenaClick(editor, {
          ...data,
          onClick: handleClick,
          update: handleChange,
          props: props.current,
          Provider: Provider.current,
        });
      dispatch({ type: WorkspaceActionType.SelectedBlock, payload: data });
    },
    [handleScenaClick, disabled]
  );

  // 向 workspace 中注册当前 block
  useEffect(() => {
    if (disabled) {
      initialized.current = true;
      return;
    }
    (data as any).onChange = handleChange;
    data.customizer = data.customizer || { fields: [] };
    dispatch({
      type: WorkspaceActionType.RegistrationBlock,
      payload: {
        ...data,
        element: block,
        emitter: emitter.current,
        update: handleChange,
        click: handleClick,
        render: data.options?.render,
      },
    });
    initialized.current = true;
    return () => {
      dispatch({
        type: WorkspaceActionType.UninstallBlock,
        payload: data,
      });
    };
  }, [disabled]);

  // 为了解决，resize 时，选框与 click 事件冲突的问题。
  // TODO 处理鼠标移入/移出时的选框
  const buildMouseEffect = useCallback(() => {
    const blockRef = block.current!;
    if (!blockRef || disabled) {
      return;
    }
    blockRef.addEventListener('mouseenter', handleMouseEnter);
    blockRef.addEventListener('mouseleave', handleMouseLeave);
    blockRef.addEventListener('mousedown', handleMouseDown);
  }, []);
  const unbuildMouseEffect = useCallback(() => {
    const blockRef = block.current!;
    if (!blockRef || disabled) {
      return;
    }
    blockRef.removeEventListener('mouseenter', handleMouseEnter);
    blockRef.removeEventListener('mouseleave', handleMouseLeave);
    blockRef.removeEventListener('mousedown', handleMouseDown);
  }, []);
  useEffect(() => {
    buildMouseEffect();
    return unbuildMouseEffect;
  }, [block.current, disabled]);

  const loadBlockRef = useCallback(async (ref: any) => {
    if (ref.hasOwnProperty('current')) {
      if (!ref.current) {
        await sleep(100);
        await loadBlockRef(ref);
        return;
      }
      if (block.current == ref.current) {
        return;
      }
      block.current = ref.current;
      buildMouseEffect();
    } else {
      block.current = ref;
    }
  }, []);

  // 将 ref 包装为单独的函数
  const refCallback = useCallback((ref: any) => {
    if (!ref) {
      return;
    }
    loadBlockRef(ref);
    return ref;
  }, []);

  // 通过 data.customizer 为 block 添加监听处理 hook 逻辑
  useEffect(() => {
    if (data.customizer?.dynamic) {
      return;
    }
    buildListeners(
      observer.current,
      data.customizer!,
      props.current,
      forceRender,
      {
        // client,
        onChange: handleChange,
        resizable: !!data.options?.resizable,
        draggable: !!data.options?.draggable,
      }
    );
    observer.current.observe(values);
    forceRender();
  }, []);

  useEffect(() => {
    if (!data.customizer?.dynamic) {
      return;
    }
    data.customizer = origin.customizer;
    if (!disabled) {
      dispatch({
        type: WorkspaceActionType.UpdateBlockCustomizer,
        payload: data,
      });
    }
    buildListeners(
      observer.current,
      data.customizer!,
      props.current,
      forceRender,
      {
        // client,
        onChange: handleChange,
        resizable: !!data.options?.resizable,
        draggable: !!data.options?.draggable,
      }
    );
    // TODO: 可能会存在 318 行类似的 BUG
  }, [origin.customizer]);

  // 触发监听
  observer.current.observe(values);

  // 值改变时，触发一次 resize 操作
  useEffect(() => {
    dispatchWindowResize();
    dataRef.current.props = values;
  }, [values, version]);

  // const { height, width, top, left } = useHTMLElementResize(block as any);
  // useEffect(() => {
  //   setTimeout(dispatchWindowResize, 60);
  // }, [[height, width, top, left].join('-')]);

  const handleResizeStart = useCallback((e: OnResizeStart) => {
    const onResizeStart = dataRef.current.options?.onResizeStart;
    onResizeStart && onResizeStart(e);
  }, []);
  const handleResize = useCallback((e: OnResize) => {
    const onResize = dataRef.current.options?.onResize;
    onResize && onResize(e);
  }, []);
  const handleResizeStop = useCallback((e: OnResizeEnd) => {
    const onResizeStop = dataRef.current.options?.onResizeStop;
    onResizeStop && onResizeStop(e);
  }, []);

  useEffect(() => {
    emitter.current.on('resize.start', handleResizeStart);
    emitter.current.on('resize.resizing', handleResize);
    emitter.current.on('resize.stop', handleResizeStop);
    return () => {
      emitter.current.off('resize.start', handleResizeStart);
      emitter.current.off('resize.resizing', handleResize);
      emitter.current.off('resize.stop', handleResizeStop);
    };
  }, []);

  return (cacheResult.current = [
    {
      ...data,
      onClick: handleClick,
      update: handleChange,
      props: props.current,
      Provider: Provider.current,
    },
    refCallback,
  ]);
}
