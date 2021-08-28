import { useState } from 'react';
import React, { ComponentType, useCallback, useEffect, useReducer } from 'react';

import { isElement, isValidElementType } from 'react-is';
import classnames from 'classnames';
import 'overlayscrollbars/css/OverlayScrollbars.css';

import { AsanyProvider } from './AsanyContext';
import Aside from './components/aside';
import Scena from './components/scena';
import DefaultLoadingComponent, { LoadingComponentProps } from './components/scena/LoadingComponent';
import Sidebar from './components/sidebar';
import Toolbar from './components/toolbar/Toolbar';
import { useDispatch, useSelector } from './hooks';
import { ActionType } from './reducers/actions';
import RuntimeContainer from './RuntimeContainer';
import { AsanyProject, EditorPlugin, WorkspaceProps } from './typings';
import './icons';

import './style/tailwind.css';
import './style/index.less';

interface AsanyProps {
  className?: string;
  onSave?: (data: AsanyProject) => void;
  onBack?: () => void;
  loading?: React.ComponentType<LoadingComponentProps>;
  container: React.ComponentType<any>;
  children?: React.ReactNode;
}

function Editor({
  className,
  onSave,
  container,
  loading: LoadingComponent = DefaultLoadingComponent,
  children,
  ...props
}: AsanyProps) {
  const dispatch = useDispatch();

  const [offsetLeft, setOffsetLeft] = useState(0);
  const workspace = useSelector((state) => state.ui.scena.workspace);

  const WorkComponent = useCallback(
    (props: WorkspaceProps) => {
      if (isElement(workspace)) {
        return React.cloneElement(workspace, props);
      }
      if (isValidElementType(workspace)) {
        const { children, ...otherProps } = props;
        return React.createElement(workspace, otherProps, children);
      }
      return <div>插件未配置 Workspace 组件</div>;
    },
    [workspace]
  );

  const visible = useSelector((state) => state.ui.aside.visible);
  const scenaToolbarVisible = useSelector((state) => state.ui.scena.toolbar.visible);
  const loading = useSelector((state) => state.ui.scena.loading);
  const control = useSelector((state) => state.ui.aside.control);

  useEffect(() => {
    if (!onSave) {
      return;
    }
    dispatch({ type: ActionType.BindSave, payload: onSave });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onSave]);

  const handleResize = useCallback((x) => {
    setOffsetLeft(x);
  }, []);

  return (
    <div className={classnames('asany-editor sketch-container', className)}>
      <Toolbar {...props} />
      <div className="asany-editor-body-container">
        <div
          className={classnames('sketch-body', {
            'settings-menu-expanded': visible,
          })}
        >
          <Sidebar onResize={handleResize} />
          <Scena offsetLeft={offsetLeft}>
            <WorkComponent />
          </Scena>
          <Aside />
        </div>
        <LoadingComponent
          className={classnames({
            'scena-toolbar-visible': scenaToolbarVisible,
          })}
          loading={loading}
          style={{
            paddingRight: visible ? control?.current?.width : 0,
          }}
        />
      </div>
    </div>
  );
}

interface AsanyWarpperProps {
  className?: string;
  loading?: React.ComponentType<LoadingComponentProps>;
  project: AsanyProject;
  wrapper?: ComponentType<any>;
  container?: ComponentType<any>;
  plugins?: EditorPlugin[];
  onSave?: (data: AsanyProject) => void;
  onBack?: () => void;
  children?: React.ReactNode;
}

export default function AsanyEditor(props: AsanyWarpperProps) {
  const { children, project, onSave, onBack, container = RuntimeContainer, plugins = [], loading, className } = props;
  const [version, forceRender] = useReducer((s) => s + 1, 0);
  useEffect(() => {
    if (!project) {
      return;
    }
    forceRender();
  }, [project]);
  return (
    <AsanyProvider version={version} plugins={[...plugins]} value={project}>
      <Editor className={className} onSave={onSave} loading={loading} container={container} onBack={onBack}>
        {children}
      </Editor>
    </AsanyProvider>
  );
}
