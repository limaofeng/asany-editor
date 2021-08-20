import React from 'react';
import classnames from 'classnames';
import ScrubbableControl from './ScrubbableControl';
import { numberFormat } from '../utils';

interface InputNumberProps {
  value?: number;
  placeholder?: string;
  className?: string;
  onChange?: (number: string) => void;
}

function InputNumber(props: InputNumberProps) {
  const { value, placeholder, onChange, className } = props;
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
