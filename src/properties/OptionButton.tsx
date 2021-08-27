import React, { CSSProperties, useEffect, useRef, useState } from 'react';

import Icon from '@asany/icons';
import { Tooltip } from 'antd';
import classnames from 'classnames';

export interface OptionButtonProps {
  onChange?: (value: boolean) => void;
  value?: boolean;
  icon: string;
  disabled?: boolean;
  className?: string;
  tooltip?: string;
  style?: CSSProperties;
  classString?: string;
}

const OptionButton = (props: OptionButtonProps) => {
  const { onChange, tooltip, icon, className, style = {}, value = false } = props;
  const ref = useRef<HTMLDivElement>(null);
  const [internalState, setInternalState] = useState<boolean>(value);

  useEffect(() => {
    setInternalState(value);
  }, [value]);

  const handleMouseDown = () => {
    setInternalState(!internalState);
    ref.current?.focus();
  };
  const handleMouseUp = () => {
    ref.current?.blur();
  };

  const onClick = () => {
    onChange && onChange(internalState);
  };

  return (
    <Tooltip transitionName="" mouseEnterDelay={0.6} mouseLeaveDelay={0.01} placement="bottom" title={tooltip}>
      <div
        ref={ref}
        style={style}
        className={classnames('option-button', { active: internalState }, className)}
        tabIndex={0}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        onClick={onClick}
      >
        {icon && (
          <div className="icons-pane">
            <Icon name={icon} />
          </div>
        )}
      </div>
    </Tooltip>
  );
};

export default React.memo(OptionButton);
