import React, { useRef, useState } from 'react';
import { IComponentVersion, ComponentPropertyType } from '../library/typings';
import ConfigurationPanel from '../library/ConfigurationPanel';
import { AutoComplete, Select, Divider } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import LibraryManager from '@asany/library-manager';

const GroupInput = ({ value, ...props }: any) => {
  const groups = LibraryManager.getGroups();
  return (
    <AutoComplete
      defaultValue={value}
      style={{ width: '100%' }}
      onChange={props.onChange}
      dataSource={groups.map((g: any) => g.id)}
    />
  );
};

interface VersionSelectProps {
  value: string;
  versions: IComponentVersion[];
  onChange: (value: string) => void;
}

const VersionSelect = ({ value, versions, onChange }: VersionSelectProps) => {
  const addItem = () => {
    console.log('addItem');
  };

  return (
    <Select
      style={{ width: '100%' }}
      value={value}
      onChange={onChange}
      dropdownRender={(menu: any) => (
        <div>
          {menu}
          <Divider style={{ margin: '4px 0' }} />
          <div
            style={{ padding: '4px 8px', cursor: 'pointer' }}
            onMouseDown={(e) => e.preventDefault()}
            onClick={addItem}
          >
            <PlusOutlined /> 添加新版本
          </div>
        </div>
      )}
    >
      {versions.map((item) => (
        <Select.Option key={item.id} value={item.version}>
          {item.version}
        </Select.Option>
      ))}
    </Select>
  );
};

interface ComponentIDProps {
  value: string;
  versions: IComponentVersion[];
  onChange: (value: string) => void;
}

function ComponentID({ onChange, value, versions }: ComponentIDProps) {
  const point = value ? value.lastIndexOf('.') : 0;
  const group = value ? value.substring(0, point) : '';
  const [artifact, version = 'letest'] = value
    ? value.substr(point + 1).split(':')
    : ['', 'letest'];
  const [state, setState] = useState({
    group,
    artifact,
    version,
  });
  const customizer = useRef({
    fields: [
      {
        name: 'group',
        label: '组织',
        type: ComponentPropertyType.Text,
        defaultValue: '',
        renderer: GroupInput,
      },
      {
        name: 'artifact',
        label: '组件',
        type: ComponentPropertyType.Text,
        defaultValue: '',
      },
      {
        name: 'version',
        label: '版本',
        type: ComponentPropertyType.Text,
        defaultValue: '',
        renderer: {
          component: VersionSelect,
          props: {
            versions: versions || [],
          },
        },
      },
    ],
  });

  const handleChange = (state: any) => {
    setState(state);
    onChange(`${state.group}.${state.artifact}:${state.version}`);
  };

  return (
    <ConfigurationPanel
      customizer={customizer.current}
      value={state}
      onChange={handleChange}
    />
  );
}

export default ComponentID;
