import React from 'react';
import { Select } from 'antd';

function EnvironmentPicker() {
  return (
    <Select
      placeholder="请选择环境"
      defaultValue="development"
      options={[
        { value: 'development', label: '开发环境' },
        { value: 'production', label: '生产环境' },
      ]}
    ></Select>
  );
}

export default EnvironmentPicker;
