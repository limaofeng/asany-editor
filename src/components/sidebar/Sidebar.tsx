import React, { useEffect, useRef, useState } from 'react';

import classnames from 'classnames';

import { useDispatch, useEditor, useSelector } from '../../hooks';
import { ActionType } from '../../reducers/actions';
import { IToolboard } from '../../typings';

import Toolbar from './Toolbar';
import Toolboard, { ToolPanel } from './Toolboard';

type SiderBarProps = {
  onResize: (x: number) => void;
};

function SiderBar(props: SiderBarProps) {
  const control = useRef<IToolboard>(null);

  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(true);
  const visible = useSelector((state) => state.ui.sidebar.visible);
  const scenaToolbarVisible = useSelector((state) => state.ui.scena.toolbar.visible);

  const Content = useSelector((state) => state.ui.sidebar.content);

  const editor = useEditor();

  useEffect(() => {
    dispatch({ type: ActionType.ToolboardRef, payload: control });
  }, [dispatch]);

  return (
    <div
      className={classnames('sketch-sidebar', 'asany-editor-sidebar', {
        collapsed: visible && collapsed,
        'sidebar-out': !visible,
        falling: scenaToolbarVisible,
      })}
    >
      <Toolbar />
      <Toolboard onResize={props.onResize} editor={editor} ref={control} setCollapsed={setCollapsed}>
        {Content && (
          <ToolPanel className="tool-panel-content">
            <Content />
          </ToolPanel>
        )}
      </Toolboard>
    </div>
  );
}

export default React.memo(SiderBar);
