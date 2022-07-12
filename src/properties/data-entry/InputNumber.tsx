import React from 'react';

import classnames from 'classnames';

import { numberFormat } from '../utils';

import ScrubbableControl from './ScrubbableControl';

interface InputNumberProps {
  value?: number;
  placeholder?: string;
  className?: string;
  onChange?: (number: string) => void;
}

function InputNumber(props: InputNumberProps) {
  const { value, placeholder = '请输入数字', onChange, className } = props;
  return (
    <ScrubbableControl
      placeholder={placeholder}
      className={classnames('basic-input', className)}
      trigger="change"
      inputType="number"
      format={numberFormat}
      autoSelect={false}
      value={value}
      onChange={onChange}
    />
  );
}

export default InputNumber;
