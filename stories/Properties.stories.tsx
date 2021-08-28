import React, { useCallback, useEffect } from 'react';
import { Meta, Story } from '@storybook/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import AsanyEditor, { useEditor, buildAside, libraries } from '../src';
import Sunmao, { ICustomizer, SunmaoProvider, useSunmao } from 'sunmao';

import DemoPlugin from './editors/demo';

import 'antd/dist/antd.css';
import { useMemo } from '@storybook/addons';
import { cloneDeepWith } from 'lodash-es';

const meta: Meta = {
  title: '编辑器/属性面板',
  parameters: {
    options: { showPanel: false },
  },
};

export default meta;

const plugin = cloneDeepWith(DemoPlugin);

const customizer: ICustomizer = {
  fields: [
    {
      name: 'title',
      type: 'String',
    },
  ],
};
const custom1 = { ...customizer };
const custom2 = { ...customizer };

plugin.scena.workspace = function () {
  const editor = useEditor();
  const sunmao = useSunmao();

  const hanndleOpen1 = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    const tabs = buildAside(custom1);
    editor.aside.open({
      customizer: custom1,
      value: { title: '面板1' },
      update: () => {},
    });
  }, []);
  const hanndleOpen2 = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    editor.aside.open({
      customizer: custom2,
      value: { title: '面板2' },
      update: () => {},
    });
    // const tabs = buildAside(custom2);
    // editor.aside.open(tabs, {
    //   value: { title: '面板2' },
    // });
  }, []);
  return (
    <div style={{ flex: 1 }}>
      <a onClick={hanndleOpen1}>面板1</a>
      <br />
      <a onClick={hanndleOpen2}>面板2</a>
    </div>
  );
};

const Template: Story<any> = (_args) => {
  const sunmao = useMemo(() => new Sunmao(), []);

  useEffect(() => {
    sunmao.addLibrary(...libraries);
  }, []);

  return (
    <DndProvider backend={HTML5Backend}>
      <SunmaoProvider sunmao={sunmao}>
        <AsanyEditor
          plugins={[plugin]}
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
      </SunmaoProvider>
    </DndProvider>
  );
};

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.storyName = '属性面板';

Default.args = {};
