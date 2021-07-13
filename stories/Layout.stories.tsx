import React from 'react';
import { Meta, Story } from '@storybook/react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import AsanyEditor from '../src';

const meta: Meta = {
  title: 'Welcome',
  component: AsanyEditor,
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
  },
  parameters: {
    controls: { expanded: true },
  },
};

export default meta;

const Template: Story<any> = (args) => {
  return (
    <DndProvider backend={HTML5Backend}>
      <AsanyEditor
        plugins={[]}
        onSave={(data) => console.log(data)}
        project={{
          id: '',
          name: '',
          type: '',
          data: {
            id: '',
            props: '',
          },
        }}
      />
    </DndProvider>
  );
};

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.args = {};
