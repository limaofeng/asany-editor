import React, { useCallback, useEffect } from 'react';
import { Meta, Story } from '@storybook/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import AsanyEditor, {
  useEditor,
  buildAside,
  libraries,
  AlignPanel,
  CurrentElementInformation,
  SegmentedControl,
  ScrubbableControl,
  OptionButton,
  DsignAutoLayout,
  ObjectCombiner,
} from '../src';
import Sunmao, { ICustomizer, SunmaoProvider, useSunmao } from 'sunmao';

import DemoPlugin from './editors/demo';

import 'antd/dist/antd.css';
import { useMemo } from '@storybook/addons';
import cloneDeepWith from 'lodash/cloneDeepWith';
import WrapperPopover from '../src/properties/combine/WrapperPopover';
import MultipleWrapper from '../src/properties/combine/MultipleWrapper';

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
      name: 'align_panel',
      label: 'AlignPanel',
      type: 'String',
      renderer: {
        component: AlignPanel,
        props: {},
      },
    },
    // {
    //   name: 'current_element_information',
    //   label: 'CurrentElementInformation',
    //   type: 'String',
    //   renderer: {
    //     component: CurrentElementInformation,
    //     props: {},
    //   },
    // },
    {
      name: 'dsign_auto_layout',
      label: 'DsignAutoLayout',
      type: 'String',
      renderer: {
        component: DsignAutoLayout,
        props: {},
      },
    },
    {
      name: 'input',
      label: 'Input',
      type: 'String',
    },
    {
      name: 'select',
      type: 'String',
      label: 'Select',
      renderer: {
        component: 'Select',
        props: {
          options: [
            {
              label: '1',
              value: '1',
            },
            {
              label: '2',
              value: '2',
            },
            {
              label: '3',
              value: '3',
            },
          ],
        },
      },
    },
    {
      name: 'select_group',
      label: 'Select Group',
      type: 'String',
      renderer: {
        component: 'Select',
        props: {
          options: [
            {
              label: '1',
              options: [
                {
                  label: '1/1',
                  value: '1/1',
                },
                {
                  label: '1/2',
                  value: '1/2',
                },
              ],
            },
            {
              label: '2',
              options: [
                {
                  label: '2/1',
                  value: '2/1',
                },
                {
                  label: '2/2',
                  value: '2/2',
                },
              ],
            },
            {
              label: '3',
              options: [
                {
                  label: '3/1',
                  value: '3/1',
                },
                {
                  label: '3/2',
                  value: '3/2',
                },
              ],
            },
          ],
        },
      },
    },
    {
      name: 'input_number',
      label: 'InputNumber',
      type: 'String',
      renderer: {
        component: 'InputNumber',
        props: {},
      },
    },
    {
      name: 'checkbox',
      label: 'Checkbox',
      type: 'String',
      renderer: {
        component: 'Checkbox',
        props: {
          children: 'Checkbox',
        },
      },
    },
    {
      name: 'checkbox_group',
      label: 'CheckboxGroup',
      type: 'String',
      renderer: {
        component: 'CheckboxGroup',
        props: {
          options: [
            { label: 'Apple', value: 'Apple' },
            { label: 'Pear', value: 'Pear' },
            { label: 'Orange', value: 'Orange', disabled: false },
          ],
        },
      },
    },
    {
      name: 'radio_group',
      label: 'RadioGroup',
      type: 'String',
      renderer: {
        component: 'RadioGroup',
        props: {
          options: [
            { label: 'Apple', value: 'Apple' },
            { label: 'Pear', value: 'Pear' },
            { label: 'Orange', value: 'Orange', disabled: false },
          ],
        },
      },
    },
    {
      name: 'switch',
      label: 'Switch',
      type: 'String',
      renderer: {
        component: 'Switch',
        props: {
          checkedChildren: '开启',
          unCheckedChildren: '关闭',
        },
      },
    },
    {
      name: 'textarea',
      label: 'TextArea',
      type: 'String',
      renderer: {
        component: 'TextArea',
        props: {
          autoSize: {
            maxRows: 3,
          },
        },
      },
    },
    {
      name: 'dsign_color',
      label: 'DsignColor',
      type: 'String',
      renderer: {
        component: 'DsignColor',
        props: {},
      },
    },
    {
      name: 'segmented_control',
      label: 'SegmentedControl',
      type: 'String',
      renderer: {
        component: SegmentedControl,
        props: {
          options: [
            {
              label: '111',
              value: '111',
              icon: 'AsanyEditor/SketchFrame',
            },
            {
              label: '222',
              value: '222',
              icon: 'AsanyEditor/SketchImage',
            },
          ],
        },
      },
    },
    {
      name: 'scrubbable_control',
      label: 'ScrubbableControl',
      type: 'String',
      renderer: {
        component: ScrubbableControl,
        props: {
          icon: 'AsanyEditor/VectorRadiusRB',
        },
      },
    },
    {
      name: 'option_button',
      label: 'OptionButton',
      type: 'String',
      renderer: {
        component: OptionButton,
        props: {
          icon: 'AsanyEditor/VectorSpacing',
        },
      },
    },
    {
      name: 'wrapper_popover',
      label: 'WrapperPopover',
      type: 'String',
      multiple: true,
    },
    {
      name: 'object_combiner',
      label: 'ObjectCombiner',
      type: 'String',
      renderer: {
        component: ObjectCombiner,
        props: {
          fields: [
            {
              name: 'input',
              label: 'Input',
              type: 'String',
            },
            {
              name: 'select',
              type: 'String',
              label: 'Select',
              renderer: {
                component: 'Select',
                props: {
                  options: [
                    {
                      label: '1',
                      value: '1',
                    },
                    {
                      label: '2',
                      value: '2',
                    },
                    {
                      label: '3',
                      value: '3',
                    },
                  ],
                },
              },
            },
          ],
        },
      },
    },
    {
      name: 'object_combiner2',
      label: 'ObjectCombiner2',
      type: 'String',
      renderer: {
        component: ObjectCombiner,
        props: {
          fields: [
            {
              name: 'input',
              type: 'String',
            },
            {
              name: 'select',
              type: 'String',
              renderer: {
                component: 'Select',
                props: {
                  options: [
                    {
                      label: '1',
                      value: '1',
                    },
                    {
                      label: '2',
                      value: '2',
                    },
                    {
                      label: '3',
                      value: '3',
                    },
                  ],
                },
              },
            },
          ],
        },
      },
    },
  ],
};

const custom1 = { ...customizer };
const custom2 = { ...customizer };

plugin.scena!.workspace = function () {
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
