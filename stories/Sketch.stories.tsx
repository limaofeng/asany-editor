import 'antd/dist/antd.css';

import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { IconProvider } from '@asany/icons';
import { Meta, Story } from '@storybook/react';
import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { BrowserRouter as Router } from 'react-router-dom';

import Sunmao, { SketchProvider, library, component, SunmaoProvider } from 'sunmao';
import AsanyEditor from '../src';
import SketchPlugin from './sketch';
import Showme from './sketch/components/Showme';

const meta: Meta = {
  title: '编辑器/Sketch',
  parameters: {
    options: { showPanel: false },
  },
};

const client = new ApolloClient({
  uri: 'https://api.asany.cn/graphql',
  cache: new InMemoryCache(),
});

export default meta;

@library({ name: 'test', description: '测试库', namespace: 'cn.asany.ui.sunmao.test' })
class TestLibrary {
  @component()
  showme = Showme;

  @component({ name: 'Boot' })
  boot() {
    return () => <div>---boot---</div>;
  }
}

const Template: Story<any> = (_args) => {
  const plugin = { ...SketchPlugin };
  const sunmao = new Sunmao();
  const x = new TestLibrary();
  sunmao.addLibrary(x as any);
  return (
    <DndProvider backend={HTML5Backend}>
      <SunmaoProvider sunmao={sunmao}>
        <ApolloProvider client={client}>
          <IconProvider>
            <Router>
              <SketchProvider>
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
              </SketchProvider>
            </Router>
          </IconProvider>
        </ApolloProvider>
      </SunmaoProvider>
    </DndProvider>
  );
};

// By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
// https://storybook.js.org/docs/react/workflows/unit-testing
export const Default = Template.bind({});

Default.storyName = 'Sketch';

Default.args = {};
