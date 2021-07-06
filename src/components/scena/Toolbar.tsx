import { isEqual } from 'lodash';
import React from 'react';
import classnames from 'classnames';
import Icon from '../../icon';
import { useSelector } from '../../hooks';
import useTools from '../../hooks/useTools';

function Toolbar() {
  const tools = useTools((state) => state.ui.scena.toolbar.tools);
  const focus = useSelector(
    (state) =>
      state.ui.scena.toolbar.tools.reduce((data, item) => {
        data[item.id] = item.useSelector && item.useSelector(state);
        return data;
      }, {} as any),
    isEqual
  );

  return (
    <div className="asany-editor-scena-toolbar">
      <div className="layout-left">
        {tools
          .filter(
            (item) =>
              (!item.position || item.position === 'left') &&
              item.isVisibled!(focus[item.id])
          )
          .map((item, index) =>
            item.id === 'vertical-divider' ? (
              <span key={`${item.id}-${index}`} className="vertical-divider" />
            ) : (
              <a
                key={`${item.id}-${index}`}
                onClick={item.onClick as any}
                className={classnames('toolbar-icon', {
                  disabled: item.isDisabled!(focus[item.id]),
                  active: item.isSelected!(focus[item.id]),
                })}
              >
                <Icon name={item.icon} />
                {item.name && (
                  <span className="toolbar-icon-tip">{item.name}</span>
                )}
              </a>
            )
          )}
      </div>
      <div className="layout-right">
        {tools
          .filter(
            (item) =>
              item.position === 'right' && item.isVisibled!(focus[item.id])
          )
          .map((item, index) =>
            item.id === 'vertical-divider' ? (
              <span key={`${item.id}-${index}`} className="vertical-divider" />
            ) : (
              <a
                key={`${item.id}-${index}`}
                onClick={item.onClick as any}
                className={classnames('toolbar-icon', {
                  disabled: item.isDisabled!(focus[item.id]),
                  active: item.isSelected!(focus[item.id]),
                })}
              >
                <Icon name={item.icon} />
                {item.name && (
                  <span className="toolbar-icon-tip">{item.name}</span>
                )}
              </a>
            )
          )}
      </div>
    </div>
  );
}

export default React.memo(Toolbar);
