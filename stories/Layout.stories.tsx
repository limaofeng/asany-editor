import React, { useEffect, useRef } from 'react';
import { Meta, Story } from '@storybook/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import AsanyEditor, { IAsanyEditor } from '../src';

import DemoPlugin from './editors/demo';

import 'antd/dist/antd.css';

const meta: Meta = {
  title: '编辑器/布局说明',
  parameters: {
    options: { showPanel: false },
  },
};

export default meta;

const Template: Story<any> = (_args) => {
  const api = useRef<IAsanyEditor>(null);

  useEffect(() => {
    setTimeout(() => {
      api.current?.features.ruler(false);
    }, 5000);
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <AsanyEditor
        ref={api}
        plugins={[DemoPlugin]}
        onSave={(data) => console.log(data)}
        project={{
          id: 'test',
          name: (<div style={{ color: '#727d83', fontSize: 16 }}>项目名称展示区域</div>) as any,
          type: 'demo',
          data: {
            id: '111',
            props: [],
          },
        }}
      />
    </DndProvider>
  );
};

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.storyName = '布局说明';

Default.args = {};
