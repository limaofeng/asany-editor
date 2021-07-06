import classnames from 'classnames';
import { isEqual } from 'lodash';
import React from 'react';

import Icon from '../../icon';
import { useSelector } from '../../hooks';
import useTools from '../../hooks/useTools';
import { AsanyTool } from '../../typings';

function Toolbar() {
  const toolboardKey = useSelector((state) => state.ui.sidebar.toolboardKey);

  const tools = useTools((state) => state.ui.sidebar.tools);

  const focus = useSelector(
    (state) =>
      state.ui.sidebar.tools.reduce((data, item) => {
        data[item.id] = item.useSelector && item.useSelector(state);
        return data;
      }, {} as any),
    isEqual
  );

  const buildClick = (item: AsanyTool) => (e: React.MouseEvent) => {
    return (item.onClick as any)(e);
  };

  return (
    <div className="panel-switcher">
      <ul className="panel-switcher-list tool-panel-list">
        {tools
          .filter(
            (item) =>
              item.position === 'top' && item.isVisibled!(focus[item.id])
          )
          .map((item, index: number) => (
            <li
              key={`${item.id}-${index}`}
              className={classnames('panel-switcher-list-item', {
                'tools-extra': toolboardKey !== item.id,
                selected: item.isSelected!(focus[item.id]),
              })}
              onClick={buildClick(item)}
            >
              <Icon name={item.icon} />
            </li>
          ))}
      </ul>
      <ul className="panel-switcher-list">
        {tools
          .filter(
            (item) =>
              item.position === 'bottom' && item.isVisibled!(focus[item.id])
          )
          .map((item) => (
            <li
              key={`${item.id}`}
              className={classnames('panel-switcher-list-item', {
                selected: item.isSelected!(focus[item.id]),
              })}
              onClick={buildClick(item)}
            >
              <Icon name={item.icon} />
            </li>
          ))}
      </ul>
    </div>
  );
}

export default React.memo(Toolbar);
