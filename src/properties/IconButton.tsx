import React, { MutableRefObject, forwardRef, useRef } from 'react';

import Icon from '@asany/icons';
import { Tooltip } from 'antd';
import classnames from 'classnames';

interface IconButtonProps {
  tooltip?: string;
  className?: string;
  icon: string;
  checked?: boolean;
  onClick?: () => void;
}

const IconButton = (props: IconButtonProps, externalRef: React.ForwardedRef<HTMLSpanElement>) => {
  const { tooltip, onClick, icon, className, checked } = props;
  const ref = useRef<HTMLSpanElement>(null);
  const handleClick = () => {
    onClick && onClick();
  };
  const handleMouseDown = () => {
    ((externalRef as MutableRefObject<any>) || ref).current?.focus();
  };
  const handleMouseUp = () => {
    ((externalRef as MutableRefObject<any>) || ref).current?.blur();
  };
  return (
    <Tooltip transitionName="" mouseEnterDelay={0.6} mouseLeaveDelay={0.01} placement="bottom" title={tooltip}>
      <span
        ref={externalRef || ref}
        tabIndex={0}
        onMouseDown={handleMouseDown}
        onMouseUp={handleMouseUp}
        className={classnames('icon-button', className, { checked })}
        onClick={handleClick}
      >
        <Icon name={icon} />
      </span>
    </Tooltip>
  );
};

export default React.memo(forwardRef<HTMLSpanElement, IconButtonProps>(IconButton));
