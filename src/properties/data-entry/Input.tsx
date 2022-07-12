import React from 'react';

import classnames from 'classnames';

import ScrubbableControl from './ScrubbableControl';

interface InputProps {
  value?: string;
  placeholder?: string;
  className?: string;
  width?: number | 'adaptive';
  onChange?: (value: string) => void;
}

function Input(props: InputProps) {
  const { value, placeholder = '请输入字符', onChange, width, className } = props;
  return (
    <ScrubbableControl
      placeholder={placeholder}
      className={classnames('basic-input', className)}
      width={width}
      trigger="change"
      autoSelect={false}
      value={value}
      onChange={onChange}
    />
  );
}

export default Input;
