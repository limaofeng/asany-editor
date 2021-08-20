import Icon from '@asany/icons';
import { Tooltip } from 'antd';
import classnames from 'classnames';
import React, { CSSProperties, useEffect, useState } from 'react';

export interface SegmentedControlOption {
  label: string;
  value: string;
  icon?: string;
}
interface SegmentedControlProps {
  style?: CSSProperties;
  className?: string;
  options: SegmentedControlOption[];
  value?: string;
  onChange?: (state: string) => void;
}
const SegmentedControl = (props: SegmentedControlProps) => {
  const { style = {}, className, options = [], value: defaultValue, onChange } = props;
  const [value, setValue] = useState(defaultValue || (options.length && options[0].value));
  useEffect(() => {
    if (!defaultValue || defaultValue === value) {
      return;
    }
    setValue(defaultValue);
  }, [defaultValue]);

  const handleClick = (value: string) => () => {
    onChange ? onChange(value) : setValue(value);
  };
  return (
    <div
      style={style}
      className={classnames('segmented-control-container', className, {
        first: value && options.length && options[0].value === value,
        last: value && options.length && options[options.length - 1].value === value,
      })}
    >
      {options.map(({ icon, value: itemValue, label }) => {
        return (
          <Tooltip
            key={itemValue}
            transitionName=""
            mouseEnterDelay={0.6}
            mouseLeaveDelay={0.01}
            placement="bottom"
            title={label}
          >
            <div
              onClick={handleClick(itemValue)}
              className={classnames('segmented-control', {
                active: itemValue === value,
              })}
            >
              <Icon name={icon || itemValue} />
            </div>
          </Tooltip>
        );
      })}
    </div>
  );
};
export default SegmentedControl;
