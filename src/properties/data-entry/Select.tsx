import React, { memo, useCallback, useEffect, useRef, useState } from 'react';

import Icon from '@asany/icons';
import { Popover } from 'antd';
import classnames from 'classnames';
import { useClickAway } from 'react-use';

import {
  ElementType,
  OptionCompare,
  SelectOption,
  SelectOptionGroup,
  SelectPopoverProps,
  SelectProps,
} from '../typings';

function defaultRenderTitle(value?: SelectOption, placeholder?: string) {
  return value?.label || placeholder;
}

function defaultCompare(value: string, option: SelectOption) {
  return value === option.value;
}

const renderSelectOption =
  (compare: OptionCompare, onChange: (option: SelectOption) => void) => (option: SelectOption | SelectOptionGroup) => {
    const { label } = option;
    if (option.hasOwnProperty('value')) {
      const item = option as SelectOption;
      const handleClick = () => {
        onChange(item.value as any);
      };
      return (
        <li className="asayneditor-select-option" key={item.value} onClick={handleClick}>
          <span className="left-icon">{compare(item) && <Icon name="VectorCorrect" />}</span>
          <span className="center-text">{item.label}</span>
        </li>
      );
    } else {
      const { options } = option as SelectOptionGroup;
      return (
        <li className="asayneditor-select-option-group" key={label.toString()}>
          <ul>{(options || []).map(renderSelectOption(compare, onChange))}</ul>
        </li>
      );
    }
  };

// 列表组件
const SelectModal = React.memo((props: SelectPopoverProps) => {
  const { compare, onChange, options, close } = props;

  const ref = useRef<HTMLDivElement>(null);

  useClickAway(ref, () => {
    close();
  });

  return (
    <div ref={ref}>
      <ul className="dsign-list">{options.map(renderSelectOption(compare, onChange))}</ul>
    </div>
  );
});

const renderIcon = (icon: ElementType) => {
  if (typeof icon === 'string') {
    return <Icon className="select-icon" name={icon} />;
  }
  return React.cloneElement(icon as any, {
    className: 'select-icon',
  });
};

const defaultGetOption = (
  options: (SelectOption | SelectOptionGroup)[],
  value: string | undefined
): SelectOption | undefined => {
  if (!value) {
    return;
  }
  if (typeof value !== 'string') {
    return value;
  }
  let val: SelectOption | undefined;
  for (const option of options) {
    if (option.hasOwnProperty('options')) {
      val = defaultGetOption((option as any).options, value);
    } else if ((option as any).value === value) {
      val = option as any;
    }
    if (val) {
      return val;
    }
  }
  return;
};

// 列表套件
const Select = (props: SelectProps) => {
  const {
    options = [],
    onChange,
    renderTitle = defaultRenderTitle,
    icon,
    value: initialValue,
    compare = defaultCompare,
    getOption = defaultGetOption,
    placeholder,
    popover: SelectPopover = SelectModal,
    popoverClassName,
    className,
  } = props;
  const ref = useRef<HTMLDivElement>(null);

  const [visible, setVisible] = useState(false);
  const [value, setValue] = useState<string | undefined>(initialValue);

  useEffect(() => {
    if (initialValue === value) {
      return;
    }
    setValue(initialValue);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValue]);

  const handleClick = useCallback(() => {
    setVisible(!visible);
  }, [visible]);
  const handleChangeValue = useCallback((value: string) => {
    onChange && onChange(value);
    !initialValue && setValue(value);
    setVisible(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const optionCompare = useCallback(
    (option: SelectOption) => {
      if (!value) {
        return false;
      }
      return compare(value, option);
    },
    [value, compare]
  );

  const handleClose = useCallback(() => {
    setVisible(false);
  }, []);

  const popoverContent = (
    <SelectPopover
      visible={visible}
      value={value}
      close={handleClose}
      compare={optionCompare}
      options={options}
      onChange={handleChangeValue}
    />
  );
  return (
    <Popover
      placement="bottomLeft"
      visible={visible}
      align={{
        targetOffset: [0, 0],
        offset: [0, -32],
      }}
      arrowPointAtCenter={false}
      overlayClassName={classnames('asanyeditor-dsign-popover', popoverClassName)}
      content={popoverContent}
      transitionName=""
    >
      <div
        ref={ref}
        className={classnames('dsign-popover-select', className, {
          'exist-icon': !!icon,
        })}
        onClick={handleClick}
      >
        {icon && renderIcon(icon)}
        <div className="select-title">{renderTitle(getOption(options, value!), placeholder)}</div>
        <div className="indicator">
          <Icon name="AsanyEditor/DownArrow" />
        </div>
      </div>
    </Popover>
  );
};

export default memo(Select);
