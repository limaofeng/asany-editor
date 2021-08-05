import './icons';
import './style/index.less';
import './style/tailwind.css';

import classnames from 'classnames';
import React, { ComponentType, useCallback, useEffect, useReducer, useRef } from 'react';
import { useState } from 'react';

import { AsanyProvider } from './AsanyContext';
import Aside from './components/aside';
import Scena from './components/scena';
import DefaultLoadingComponent, { LoadingComponentProps } from './components/scena/LoadingComponent';
import Sidebar from './components/sidebar';
import Toolbar from './components/toolbar/Toolbar';
import { useDispatch, useSelector } from './hooks';
import { ActionType } from './reducers/actions';
import RuntimeContainer from './RuntimeContainer';
import { AsanyProject, EditorPlugin } from './typings';

// import { NotFound, useReactComponent } from '../library-manager/LibraryManager';
// const LinkRender = ({ children, to, ...props }: any) => {
//   const handleClick = (e: React.MouseEvent) => {
//     e.stopPropagation();
//     e.preventDefault();
//     props.onClick && props.onClick(e);
//     console.log('ignore click', e);
//   };
//   return (
//     <a {...props} onClick={handleClick}>
//       {children}
//     </a>
//   );
// };

function NotFound() {
  return <>404</>;
}

function useComponent(_RootContainer: React.ComponentType<any>, _children?: React.ReactNode): React.ComponentType<any> {
  const project = useSelector((state) => state.project);
  const ReactComponent = useRef<ComponentType<any>>(NotFound);
  // const [, forceRender] = useReducer((s) => s + 1, 0);

  if (!project || !project.type) {
    console.warn('project is null !');
  }
  // const data = project.data as IComponentData;
  // const Component: any = () => <></>;
  // const Component = useReactComponent(data ? data.id : 'notFound', {
  //   linkElement: LinkRender,
  // });
  // TODO: 需要修补
  // console.log(Component, forceRender, RootContainer, children);
  // useEffect(() => {
  //   if (project.type !== 'component') {
  //     ReactComponent.current = () => <>{children}</>;
  //     forceRender();
  //     return;
  //   }
  //   ReactComponent.current = () => {
  //     // const [, forceRender] = useReducer((s) => s + 1, 0);
  //     // useLayoutEffect(() => {
  //     //   if (!document.getElementsByClassName('canvas').length) {
  //     //     return;
  //     //   }
  //     //   console.log(document.getElementsByClassName('canvas')[0]);
  //     //   ReactDOM.render(
  //     //     <RootContainer children={<div id="canvas-portal" />} />,
  //     //     document.getElementsByClassName('canvas')[0]
  //     //   );
  //     //   forceRender();
  //     // }, []);

  //     // const target = document.querySelector(`#canvas-portal`);
  //     // if (!target) {
  //     //   return <></>;
  //     // }
  //     // return createPortal(<Component />, target);
  //     return <RootContainer children={<Component />} />;
  //   };
  //   (ReactComponent.current as any)['info'] = Component.info;
  //   forceRender();
  // }, [project.type, Component, RootContainer]);

  return ReactComponent.current;
}

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

  const WorkComponent = useComponent(container, children);

  const visible = useSelector((state) => state.ui.aside.visible);
  const scenaToolbarVisible = useSelector((state) => state.ui.scena.toolbar.visible);
  const loading = useSelector((state) => state.ui.scena.loading);
  const control = useSelector((state) => state.ui.aside.control);

  useEffect(() => {
    if (!onSave) {
      return;
    }
    dispatch({ type: ActionType.BindSave, payload: onSave });
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
