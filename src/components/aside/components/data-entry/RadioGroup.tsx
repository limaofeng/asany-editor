import React from 'react';
import { registerComponent } from '@asany/library-manager';

import SegmentedControl, { SegmentedControlOption } from './SegmentedControl';

interface RadioGroupProps {
  value: string;
  onChange: (value: string) => void;
  options: SegmentedControlOption[];
}

function RadioGroup(props: RadioGroupProps) {
  const { value, onChange, options } = props;
  return <SegmentedControl options={options} value={value} onChange={onChange} />;
}

export default registerComponent(
  {
    id: 'com.thuni.him.asany.properties.RadioGroup',
    name: '组件信息',
    library: 'AsanyEditor.Config',
  },
  RadioGroup
);
