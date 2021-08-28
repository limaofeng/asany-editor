import React, {
  CSSProperties,
  forwardRef,
  useCallback,
  useImperativeHandle,
  useReducer,
  useRef,
  useState,
} from 'react';

import Icon from '@asany/icons';
import { Tabs } from 'antd';
import classnames from 'classnames';

import { sleep, useDeepCompareEffect } from '../../utils';

export interface TabPane {
  id?: string;
  title: string;
  content: React.ReactElement;
}

interface Extra {
  title: string;
  summary?: string;
  content: React.ReactElement;
}

export interface PropertiesPanelProps {
  className?: string;
  footer?: React.ReactElement;
  onClose: (e: React.MouseEvent) => void;
  title?: string;
  content?: React.ReactElement;
  tabs?: TabPane[];
  extras?: Extra[];
  children?: React.ReactElement;
  style?: CSSProperties;
}

interface PropertiesPanelState {
  next?: boolean;
  nextIndex: number;
  panels: Extra[];
}

export interface IPropertiesPanel {
  container: HTMLDivElement;
  width: number;
  back: () => Promise<void>;
  switch: (activeKey: string) => void;
  next: (title: string, content: React.ReactElement) => void;
}

function PropertiesPanel(props: PropertiesPanelProps, ref: React.ForwardedRef<IPropertiesPanel>) {
  const container = useRef<HTMLDivElement>(null);
  const { onClose, title, children, extras = [], content, style, className, tabs = [], footer } = props;
  const state = useRef<PropertiesPanelState>({
    next: false,
    nextIndex: -1,
    panels: extras,
  });
  const [, forceRender] = useReducer((s) => s + 1, 0);
  const [activeKey, setActiveKey] = useState<string | undefined>(tabs.length ? tabs[0].id || tabs[0].title : undefined);
  const handleOpenNextPanel = useCallback(
    (index: number) => () => {
      state.current.nextIndex = index;
      forceRender();
    },
    []
  );

  useDeepCompareEffect(() => {
    if (!tabs.length) {
      return;
    }
    if (!tabs.some((item) => item.title === activeKey)) {
      setActiveKey(tabs[0].id || tabs[0].title);
    }
    state.current.nextIndex = -1;
    state.current.panels = [];
  }, [tabs.map((item) => item.id || item.title)]);

  const handleChange = (activeKey: string) => {
    setActiveKey(activeKey);
  };

  const handleCloseNextPanel = async () => {
    if (state.current.nextIndex === -1) {
      return;
    }
    state.current.nextIndex--;
    forceRender();
    await sleep(250);
    state.current.panels.pop();
    forceRender();
  };

  useImperativeHandle<IPropertiesPanel, any>(
    ref,
    () => ({
      container: container.current,
      switch: (activeKey: string) => {
        setActiveKey(activeKey);
      },
      back: async () => {
        await handleCloseNextPanel();
      },
      next: async (title: string, content: React.ReactElement<any>) => {
        state.current.panels.push({
          title,
          content,
        });
        forceRender();
        // 为了让动画更流畅, 延时 50ms 让元素先渲染到页面
        await sleep(50);
        state.current.nextIndex++;
        forceRender();
      },
      get width() {
        return container.current?.getBoundingClientRect().width || 0;
      },
    }),
    []
  );

  const { nextIndex, panels } = state.current;
  const hasNextPanel = nextIndex !== -1;
  return (
    <div ref={container} className={classnames('settings-menu-container', className)} style={style}>
      <div id="entry-controls">
        <div
          className={classnames('settings-menu settings-menu-pane', {
            'settings-menu-pane-in': !hasNextPanel,
            'settings-menu-pane-out-left': hasNextPanel,
          })}
        >
          {!!tabs.length ? (
            <Tabs
              className="settings-menu-tabs"
              activeKey={activeKey}
              onChange={handleChange}
              tabBarExtraContent={
                <a className="close" onClick={onClose}>
                  <Icon name="Cross" />
                </a>
              }
            >
              {tabs.map((item) => (
                <Tabs.TabPane animated={false} tab={item.title} key={item.id || item.title}>
                  {item.content}
                </Tabs.TabPane>
              ))}
            </Tabs>
          ) : (
            <>
              <div className="settings-menu-header">
                <h4>{title}</h4>
                <a className="close" onClick={onClose}>
                  <Icon name="Cross" />
                </a>
              </div>
              <div className="settings-menu-content">
                {content || children}
                {!!extras.length && (
                  <ul className="nav-list-block">
                    {extras.map(({ title: extTitle, summary }, i) => {
                      const lis = [
                        <li
                          key={String(`${i}-${title}`)}
                          className="nav-list-item"
                          onClick={handleOpenNextPanel(i)}
                          role="none"
                        >
                          <button type="button">
                            <b>{extTitle}</b>
                            <span>{summary}</span>
                          </button>
                          {/* <RightOutlined /> */}
                        </li>,
                      ];
                      if (i !== extras.length - 1) {
                        lis.push(<li key={String(`${i}-${title}-divider`)} className="divider" />);
                      }
                      return lis;
                    })}
                  </ul>
                )}
              </div>
            </>
          )}
        </div>
        {panels.map(({ title, content }, index) => (
          <div
            key={title}
            className={classnames('settings-menu settings-menu-pane', {
              'settings-menu-pane-in': index === nextIndex,
              'settings-menu-pane-out-right': index > nextIndex,
              'settings-menu-pane-out-left': index < nextIndex,
            })}
          >
            <div className="ember-view active">
              <div className="settings-menu-header subview">
                <button className="back settings-menu-header-action" onClick={handleCloseNextPanel}>
                  {/* <LeftOutlined /> */}
                </button>
                <h4>{title}</h4>
                <div />
              </div>
              <div className="settings-menu-content">{content}</div>
            </div>
          </div>
        ))}
      </div>
      {footer}
    </div>
  );
}

export default React.memo(forwardRef(PropertiesPanel));
