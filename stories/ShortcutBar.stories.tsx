import React from 'react';
import { Meta, Story } from '@storybook/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import AsanyEditor from '../src';

import DemoPlugin from './editors/demo';

import 'antd/dist/antd.css';

const meta: Meta = {
  title: '编辑器/快捷栏',
  parameters: {
    options: { showPanel: false },
  },
};

export default meta;

const Template: Story<any> = (_args) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <AsanyEditor
        plugins={[DemoPlugin]}
        onSave={(data) => console.log(data)}
        project={{
          id: 'test',
          name: (
            <div style={{ color: '#727d83', fontSize: 16 }}>
              项目名称展示区域
            </div>
          ) as any,
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

Default.storyName = '快捷栏';

Default.args = {};
