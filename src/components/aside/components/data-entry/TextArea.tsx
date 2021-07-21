import React from 'react';
import classnames from 'classnames';
import { registerComponent } from '@asany/library-manager';
import ScrubbableControl, { AutoSizeType } from './ScrubbableControl';

interface TextAreaProps {
  value?: string;
  placeholder?: string;
  className?: string;
  autoSize?: boolean | AutoSizeType;
  onChange?: (value: string) => void;
}

function TextArea(props: TextAreaProps) {
  const { value, placeholder, onChange, className, autoSize } = props;
  return (
    <ScrubbableControl
      placeholder={placeholder}
      className={classnames('basic-input', className)}
      trigger="change"
      autoSelect={false}
      autoSize={autoSize}
      inputType="textarea"
      value={value}
      onChange={onChange}
    />
  );
}

export default registerComponent<TextAreaProps>(
  {
    id: 'com.thuni.him.asany.properties.TextArea',
    name: '文本域',
    library: 'AsanyEditor.Config',
  },
  TextArea
);
