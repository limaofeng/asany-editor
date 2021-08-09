import 'antd/dist/antd.css';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { IconProvider } from '@asany/icons';
import { Meta, Story } from '@storybook/react';
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BrowserRouter as Router } from 'react-router-dom';

import AsanyEditor from '../src';
import IconPlugin from '../src/plugins/Icon';

const meta: Meta = {
  title: '编辑器/图标',
  parameters: {
    options: { showPanel: false },
  },
};

const client = new ApolloClient({
  uri: 'https://api.asany.cn/graphql',
  cache: new InMemoryCache(),
});

export default meta;

const Template: Story<any> = (_args) => {
  const plugin = { ...IconPlugin };

  return (
    <DndProvider backend={HTML5Backend}>
      <ApolloProvider client={client}>
        <IconProvider>
          <Router>
            <AsanyEditor
              plugins={[plugin]}
              onSave={(data) => console.log(data)}
              className="icon-editor"
              project={{
                id: 'test',
                name: (<div style={{ color: '#727d83', fontSize: 16 }}>项目名称展示区域</div>) as any,
                type: 'icon',
                data: {
                  id: '111',
                  props: [],
                },
              }}
            />
          </Router>
        </IconProvider>
      </ApolloProvider>
    </DndProvider>
  );
};

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.storyName = '图标';

Default.args = {};
