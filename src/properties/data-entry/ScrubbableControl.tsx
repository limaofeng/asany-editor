import { Input, InputNumber, Tooltip } from 'antd';
import classnames from 'classnames';
import { isEqual } from 'lodash-es';
import React, { ChangeEvent, CSSProperties, memo, useCallback, useRef, useState } from 'react';

import Icon from '@asany/icons';
import { useDeepCompareEffect } from '../../utils';
import { InputFormat, InputText } from '../typings';

const { TextArea } = Input;

export interface AutoSizeType {
  minRows?: number;
  maxRows?: number;
}

export interface ScrubbableControlProps {
  icon?: string | React.ReactElement;
  autoSelect?: boolean;
  width?: number | 'adaptive';
  className?: string;
  disabled?: boolean;
  format?: InputFormat;
  placeholder?: string;
  inputType?: 'input' | 'textarea' | 'number';
  autoSize?: boolean | AutoSizeType;
  label?: string;
  value?: InputText;
  trigger?: 'change' | 'blur';
  onChange?: (value: InputText) => void;
  style?: CSSProperties;
}

const ScrubbableControl = (props: ScrubbableControlProps) => {
  const {
    inputType,
    onChange,
    trigger = 'blur',
    label,
    autoSelect = true,
    icon,
    disabled,
    className,
    value,
    format,
    style = {},
  } = props;

  const input = useRef<Input>(null);
  const [internalValue, setInternalValue] = useState<string>('');

  const handleInputFormat = useCallback((value: InputText) => {
    return (format && format.input && format.input(value)) || String(value);
  }, []);

  useDeepCompareEffect(() => {
    if (value == null || value == undefined) {
      return;
    }
    setInternalValue(handleInputFormat(value));
  }, [value]);

  const handleBlur = useCallback(() => {
    if (isEqual(internalValue, handleInputFormat(value))) return;
    if (trigger === 'change' || !onChange) {
      return;
    }
    const foramtValue = (format && format.output && format.output(internalValue)) || internalValue;
    internalValue && onChange(foramtValue);
  }, [internalValue, onChange]);

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    const { value } = inputType === 'number' ? { value: event } : event.target;
    const internalValue = handleInputFormat(value);
    setInternalValue(internalValue);
    if (trigger === 'change' && onChange) {
      const foramtValue = (format && format.output && format.output(internalValue)) || internalValue;
      onChange(foramtValue);
    }
  }, []);

  const handleFocus = useCallback(() => {
    autoSelect && input.current?.select();
  }, []);

  return (
    <Tooltip transitionName="" mouseEnterDelay={0.6} mouseLeaveDelay={0.01} placement="bottom" title={label}>
      <div
        style={style}
        onClick={handleFocus}
        className={classnames('scrubbable-control left-col design-input design-rows-items', className, {
          disabled,
          is_textarea: inputType === 'textarea',
        })}
      >
        {renderIcon(icon)}
        {renderInput(props, input, internalValue, handleFocus, handleBlur, handleChange)}
      </div>
    </Tooltip>
  );
};

function renderIcon(icon: string | React.ReactElement | undefined) {
  if (!icon) {
    return undefined;
  }
  if (typeof icon === 'string') {
    return (
      <div className="icons-pane">
        <Icon name={icon} />
      </div>
    );
  }
  return icon;
}

function renderInput(
  props: ScrubbableControlProps,
  input: any,
  internalValue: string,
  handleFocus: () => void,
  handleBlur: () => void,
  handleChange: (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> & any) => void
) {
  const { inputType = 'input', placeholder, disabled, width, autoSize } = props;
  if (inputType === 'textarea') {
    return (
      <TextArea
        ref={input}
        autoSize={autoSize}
        placeholder={placeholder}
        onFocus={handleFocus}
        disabled={disabled}
        value={internalValue}
        onBlur={handleBlur}
        onChange={handleChange}
      />
    );
  }
  if (inputType === 'number') {
    return (
      <InputNumber
        ref={input}
        placeholder={placeholder}
        onFocus={handleFocus}
        disabled={disabled}
        value={internalValue}
        onBlur={handleBlur}
        onChange={handleChange}
      />
    );
  }
  if (inputType === 'input') {
    if (width === 'adaptive') {
      return (
        <div
          ref={input}
          contentEditable={true}
          suppressContentEditableWarning={true}
          style={{ display: 'flex', alignItems: 'center' }}
          className={classnames('ant-input', { disabled, placeholder })}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChange={handleChange as any}
        >
          {internalValue || placeholder}
        </div>
      );
    }
    return (
      <Input
        ref={input}
        placeholder={placeholder}
        onFocus={handleFocus}
        disabled={disabled}
        value={internalValue}
        onBlur={handleBlur}
        onChange={handleChange}
      />
    );
  }
  return <></>;
}

export default memo(ScrubbableControl);
