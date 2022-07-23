import React, { useEffect } from 'react';
import { Meta, Story } from '@storybook/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import AsanyEditor, { useEditor, useSelector } from '../src';

import DemoPlugin from './editors/demo';

import 'antd/dist/antd.css';

const meta: Meta = {
  title: '编辑器/状态管理',
  parameters: {
    options: { showPanel: false },
  },
};

function MoveableTest() {
  const editor = useEditor();

  const moveable = useSelector((state) => state.ui.scena.moveable.ref);

  useEffect(() => {
    editor.scena.setSelectedTargets([document.getElementById('moveable_test')!]);

    document.getElementById('moveable_test')?.addEventListener('moveable.resizeStart', (e) => {
      console.log('moveable.resizeStart', e);
    });
    document.getElementById('moveable_test')?.addEventListener('moveable.resize', (e) => {
      console.log('moveable.resize', e);
    });
    document.getElementById('moveable_test')?.addEventListener('moveable.resizeStop', (e) => {
      console.log('moveable.resizeStop', e);
      console.log('moveable', moveable);
    });
  }, []);

  return (
    <div data-resizable style={{ background: 'red', color: '#fff' }} id="moveable_test">
      MoveableTest
    </div>
  );
}

export default meta;

const Template: Story<any> = (_args) => {
  DemoPlugin.scena!.workspace = () => {
    return (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          color: '#727d83',
          fontSize: 18,
          paddingTop: 20,
        }}
      >
        <div style={{ textAlign: 'center' }}>
          工作区
          <div style={{ fontSize: 12, paddingTop: 10 }}>点击工作区，可以唤出属性配置面板</div>
          <MoveableTest />
        </div>
      </div>
    );
  };
  return (
    <DndProvider backend={HTML5Backend}>
      <AsanyEditor
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

Default.storyName = '状态管理';

Default.args = {};
