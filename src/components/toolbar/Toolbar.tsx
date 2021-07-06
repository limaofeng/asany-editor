// import { EyeOutlined, LeftOutlined } from '@ant-design/icons';
import classnames from 'classnames';
import { isEqual } from 'lodash';
import React, { useCallback } from 'react';
import { AsanyTool } from '../..';
import Icon from '../../icon';
import { useAsanyStore, useSelector } from '../../hooks';
import useTools from '../../hooks/useTools';
import { ActionType } from '../../reducers';
import EnvironmentPicker from './EnvironmentPicker';

interface HeaderProps {
  onBack?: () => void;
}

function render(item: AsanyTool, focus: any) {
  const disabled = item.isDisabled!(focus[item.id]);
  return item.render ? (
    <item.render key={item.id} {...(item as any)} disabled={disabled} />
  ) : (
    <a
      key={item.id}
      className={classnames('toolbar-icon', { disabled })}
      onClick={item.onClick as any}
    >
      <Icon name={item.icon} />
      <span className="toolbar-icon-tip">{item.name}</span>
    </a>
  );
}

function Header(props: HeaderProps) {
  const { onBack } = props;
  const store = useAsanyStore();
  const dispatch = store.dispatch;

  const viewed = useSelector((state) => state.mode === 'VIEW');
  const name = useSelector((state) => state.project && state.project.name);

  const tools = useTools((state) => state.ui.toolbar.tools);

  const focus = useSelector(
    (state) =>
      state.ui.toolbar.tools.reduce((data, item) => {
        data[item.id] = item.useSelector && item.useSelector(state);
        return data;
      }, {} as any),
    isEqual
  );

  const handClickBack = useCallback(() => onBack && onBack(), []);
  const handlePreview = () => {
    dispatch({
      type: ActionType.ChangeMode,
      payload: viewed ? 'CONFIG' : 'VIEW',
    });
  };

  return (
    <div className="sketch-toolbar">
      <div className="toolbar-left" onClick={handClickBack}>
        {/* <LeftOutlined className="back-icon toolbar-icon" /> */}
        <span className="title">{name}</span>
      </div>
      <div className="toolbar-center">
        <div>
          {tools
            .filter(
              (item) =>
                item.position === 'left' && item.isVisibled!(focus[item.id])
            )
            .map(render, focus)}
        </div>
      </div>
      <div className="toolbar-right">
        <a className="toolbar-icon" onClick={handlePreview}>
          {/* <EyeOutlined className="toolbar-icon-wrapper" /> */}
          <span className="toolbar-icon-tip">
            {viewed ? '退出预览' : '预览'}
          </span>
        </a>
        <EnvironmentPicker />
      </div>
    </div>
  );
}

export default React.memo(Header);
