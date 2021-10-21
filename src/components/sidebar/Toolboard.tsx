import React, {
  ComponentType,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useReducer,
  useRef,
  useState,
} from 'react';

import Icon from '@asany/icons';
import classnames from 'classnames';

import { useDispatch, useSelector } from '../../hooks';
import { ActionType, UISidebarActionType } from '../../reducers/actions';
import { IAsanyEditor, IToolboard } from '../../typings';
import { sleep } from '../../utils';
import Resizer from '../resizer';

interface Panel {
  title: string;
  content: ComponentType<any>;
  width: number;
  collapsed?: boolean;
}

interface ToolboardState {
  index: number;
  width: number;
  offset: number;
  activeKey?: string;
  minimizable: boolean;
  panels: { [key: string]: Panel[] };
}

interface ToolboardProps {
  editor: IAsanyEditor;
  setCollapsed(collapsed: boolean): void;
  children: React.ReactNode;
  onResize: (x: number) => void;
}

function Toolboard(props: ToolboardProps, ref: React.ForwardedRef<IToolboard>) {
  const { editor, setCollapsed, children, onResize } = props;

  const state = useRef<ToolboardState>({
    index: -1,
    width: 0,
    offset: 0,
    minimizable: false,
    panels: {},
  });
  const [, forceRender] = useReducer((s) => s + 1, 0);

  const dispatch = useDispatch();

  const visible = useSelector((state) => state.ui.sidebar.visible);
  const minimizable = useSelector((state) => state.ui.sidebar.minimizable);
  const keepOpen = useSelector((state) => !!state.ui.sidebar.content);
  const width = useSelector((state) => state.ui.sidebar.width);
  const minWidth = useSelector((state) => state.ui.sidebar.minWidth);

  const handleCloseNext = async () => {
    await handleClose(state.current.index);
  };

  const handleOpen = useCallback(
    async (index: number, title: string, content: ComponentType, width: number, key?: string) => {
      const originalIndex = state.current.index;
      key = state.current.activeKey = key || state.current.activeKey!;
      const panels = state.current.panels[key] ? state.current.panels[key] : (state.current.panels[key] = []);
      const currentIndex = index === -1 ? originalIndex + 1 : Math.min(index, originalIndex + 1);
      if (originalIndex > currentIndex) {
        handleClose(currentIndex + 1);
      }
      if (index === 0) {
        panels.length = 0;
      }
      if (originalIndex >= currentIndex) {
        panels[currentIndex] = {
          title,
          content,
          width,
          collapsed: false,
        };
      } else {
        panels.push({
          title,
          content,
          width,
          collapsed: true,
        });
      }
      state.current.index = currentIndex;
      forceRender();
      if (originalIndex >= currentIndex) {
        return;
      }
      // 为了让动画更流畅, 延时 50ms 让元素先渲染到页面
      await sleep(50);
      if (panels.length === 1) {
        setCollapsed(false);
      } else if (originalIndex < state.current.index) {
        panels[panels.length - 1].collapsed = false;
      }
      forceRender();
    },
    []
  );

  const handleReopen = useCallback((key: string) => {
    const { panels: allPanels, activeKey } = state.current;
    if (!allPanels[key]) {
      return;
    }
    const _panels = activeKey ? allPanels[activeKey] : [];
    if (!_panels || !_panels.length) {
      return;
    }
    state.current.activeKey = key;
    editor.sidebar.select(key!, true);
    forceRender();
    return;
  }, []);

  useImperativeHandle(
    ref,
    () => ({
      open(key: string, title: string, content: ComponentType) {
        handleOpen(0, title, content, 250, key);
      },
      next(index: number, title: string, content: ComponentType, width: number) {
        handleOpen(index, title, content, width);
      },
      reopen(key: string) {
        handleReopen(key);
      },
      back: handleCloseNext,
      close: handleClose,
    }),
    []
  );

  const { panels: all, activeKey } = state.current;

  const handleClose = useCallback(async (index: number = 0) => {
    const { panels: allPanels, activeKey } = state.current;
    const _panels = activeKey ? allPanels[activeKey] : [];
    if (!_panels.length) {
      return;
    }
    state.current.index = index - 1;
    if (index === 0) {
      const panels = _panels.slice(index);
      panels.forEach((item) => (item.collapsed = true));
      forceRender();
      setCollapsed(true);
      const toolboardKey = editor.state.ui.sidebar.toolboardKey;
      dispatch({ type: ActionType.SidebarUnSelect, payload: toolboardKey });
      await sleep(400);
      _panels.length = 1;
      state.current.activeKey = undefined;
      forceRender();
    } else {
      const panels = _panels.slice(index);
      panels.forEach((item) => (item.collapsed = true));
      forceRender();
      await sleep(400);
      _panels.splice(index);
      forceRender();
    }
  }, []);

  const getCollapseLocation = (panels: Panel[], index: number) => {
    if (index === 0 || panels.length === state.current.index + 1) {
      return 0;
    }
    const collapsedStartIndex = state.current.index + 1;
    return -panels.slice(collapsedStartIndex, index).reduce((location, item) => location + item.width, 0);
  };
  const getLeft = (panels: Panel[], index: number): number => {
    if (index === 0) {
      return 0;
    }
    return (
      getLeft(panels, index - 1) +
      (index === 1 ? 0 : panels[index - 1].width) +
      panels[index - 1].width -
      panels[index].width
    );
  };

  state.current.width = width;
  state.current.minimizable = minimizable;

  const handleResize = useCallback((x) => {
    state.current.offset += x;
    forceRender();
    onResize(calculateOffsetLeft(state.current.offset));
  }, []);

  const handleResizeEnd = useCallback(() => {
    const newWidth = state.current.width + state.current.offset;
    state.current.offset = 0;
    state.current.width = newWidth;
    dispatch({
      type: UISidebarActionType.SidebarContentWidth,
      payload: newWidth,
    });
    onResize(calculateOffsetLeft(state.current.offset));
    console.log('resizing', state.current.offset);
  }, []);

  const calculateOffsetLeft = useCallback(
    (offsetLeft) => {
      const width = state.current.width;
      if (width + offsetLeft < minWidth) {
        return minWidth - width;
      }
      return offsetLeft;
    },
    [minWidth]
  );

  const calculateWidth = useCallback(
    (width, offsetLeft) => {
      return Math.max(minWidth, width + offsetLeft);
    },
    [minWidth, minimizable]
  );

  const vw = calculateWidth(width, state.current.offset);

  useEffect(() => {
    if (!visible) {
      return;
    }
    let newMinimizable = false;
    const newWidth = state.current.width + state.current.offset;
    if (minWidth - newWidth > minWidth / 2 || newWidth <= 30) {
      newMinimizable = true;
    }
    if (state.current.minimizable != newMinimizable) {
      dispatch({
        type: UISidebarActionType.SidebarContentMinimize,
        payload: newMinimizable,
      });
    }
  }, [visible, minWidth, state.current.offset]);

  return (
    <Resizer
      className={classnames('sidebar-resizer', {
        disabled: !keepOpen,
        minimizable,
      })}
      style={{ width: !children ? 0 : minimizable ? 3 : vw }}
      onResize={handleResize}
      onResizeEnd={handleResizeEnd}
    >
      {children}
      {Object.keys(all).map((key) =>
        all[key].map((item, index) => (
          <ToolPanel
            key={`tool_panel_${key}_${index}`}
            collapsed={activeKey === key ? !!item.collapsed : true}
            visible={activeKey === key}
            index={index}
            left={getLeft(all[key], index)}
            collapseLocation={getCollapseLocation(all[key], index)}
            width={item.width}
            closable
            title={item.title}
            onClose={handleClose}
          >
            <item.content visible={activeKey === key} />
          </ToolPanel>
        ))
      )}
    </Resizer>
  );
}

interface ToolPanelProps {
  visible?: boolean;
  index?: number;
  title?: string;
  left?: number;
  width?: number;
  collapsed?: boolean;
  closable?: boolean;
  collapseLocation?: number;
  className?: string;
  onClose?: (index: number) => void;
  children: React.ReactNode;
}

export function ToolPanel(props: ToolPanelProps) {
  const {
    title,
    className,
    onClose,
    children,
    left,
    index = 0,
    visible = true,
    closable,
    collapsed,
    width,
    collapseLocation,
  } = props;
  const [style, setStyle] = useState<any>({ zIndex: 10 - index, width });

  const handleClose = useCallback(() => {
    onClose && onClose(index);
  }, [index]);

  useEffect(() => {
    if (!index) {
      return;
    }
    if (collapsed) {
      setStyle({
        ...style,
        left,
        width,
        transform: `translate3d(${collapseLocation}px, 0, 0)`,
      });
      return;
    }
    setStyle({
      ...style,
      left,
      width,
      transform: `translate3d(${width}px, 0, 0)`,
    });
  }, [collapsed, width, left, collapseLocation]);

  return (
    <div
      className={classnames('panel-container', className, {
        'panel-container-hidden': !visible,
      })}
      style={style}
    >
      {title && (
        <div className="panel-header">
          <span className="panel-header-title">{title}</span>
          {closable && (
            <a className="panel-header-info" onClick={handleClose}>
              <Icon name="AsanyEditor/Cross" />
            </a>
          )}
        </div>
      )}
      <div className="panel-view">{children}</div>
    </div>
  );
}

export default React.memo(forwardRef(Toolboard));
