---
order: 0
title: 基本
---

组件设计器，提供组件配置功能

```jsx
import { useState } from 'react';
import { Select } from 'antd';
import { AsanyEditor, Panel, LibraryManager, useSketchComponent } from 'asany';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import project from './project.json';
import basicLayoutData from './basic-layout.json';
import portal from './portal.json';

import LoadData from './LoadData';

LibraryManager.loadDefaultLibrarys();

LibraryManager.addComponents([
  {
    id: 'com.thuni.his.table.column.render.ProjectType',
    tags: ['列表渲染器/测试/代码库'],
    name: '项目类型',
    component: (text: string, data: any, index: number) => {
      return <div>{text} - 执行转换逻辑</div>;
    },
  },
]);

const client = new ApolloClient({
  uri: 'http://api.dev.thuni-h.com/graphql',
  cache: new InMemoryCache(),
});

const projects = [
  {
    label: '登录',
    value: 'com.thuni.him.base.login.BasicLogin',
    project: {
      id: 'login',
      name: '登录',
      type: 'component',
      data: {
        id: 'com.thuni.him.base.login.BasicLogin',
      },
    },
  },
  {
    label: '表格',
    value: 'com.thuni-h.components.custom.Table',
    project: {
      id: 'table',
      name: '表格',
      type: 'component',
      data: {
        id: 'com.thuni-h.components.custom.Table',
      },
    },
  },
  {
    label: '表单',
    value: 'com.thuni-h.components.layout.FormLayout',
    project: {
      id: 'formlayout',
      name: '表单',
      type: 'component',
      data: {
        id: 'com.thuni-h.components.layout.FormLayout',
      },
    },
  },
  {
    label: '仿真表单',
    value: 'com.thuni-h.components.layout.WordFormLayout',
    project: {
      id: 'worldformlayout',
      name: '仿真表单',
      type: 'component',
      data: {
        id: 'com.thuni-h.components.layout.WordFormLayout',
      },
    },
  },
  {
    label: '门户',
    value: 'com.thuni-h.components.Portal',
    project: portal,
  },
  {
    label: '布局',
    value: 'com.thuni.his.layout.BasicLayout',
    project: basicLayoutData,
  },
  {
    label: '基础布局 - 页面容器',
    value: 'com.thuni.his.layout.BasicLayoutPageContainer',
    project: {
      id: 'BasicLayoutPageContainer',
      name: '基础布局 - 页面容器',
      type: 'component',
      data: {
        id: 'com.thuni.his.layout.BasicLayoutPageContainer',
      },
    },
  },
  {
    label: 'ProLayout',
    value: 'com.thuni.his.layout.AntDesignProLayout',
    project: {
      id: 'AntDesignProLayout',
      name: 'ProLayout',
      type: 'component',
      data: {
        id: 'com.thuni.his.layout.AntDesignProLayout',
      },
    },
  },
  {
    label: '基础布局 - 分栏容器',
    value: 'com.thuni.his.layout.BlockColumnContainer',
    project: {
      id: 'ColumnContainer',
      name: '基础布局 - 分栏容器',
      type: 'component',
      data: {
        id: 'com.thuni.his.layout.BlockColumnContainer',
      },
    },
  },
  {
    label: 'iFrame',
    value: 'com.thuni.his.common.iFrameContainer',
    project: {
      id: 'iFrameContainer',
      name: 'iFrame 容器',
      type: 'component',
      data: {
        id: 'com.thuni.his.common.iFrameContainer',
      },
    },
  },
  {
    label: 'Html',
    value: 'com.thuni.his.common.HtmlContainer',
    project: {
      id: 'HtmlContainer',
      name: 'Html 容器',
      type: 'component',
      data: {
        id: 'com.thuni.his.common.HtmlContainer',
      },
    },
  },
  {
    label: '排序树组件',
    value: 'com.thuni.his.layout.SortableTree',
    project: {
      id: 'SortableTree',
      name: '排序树组件',
      type: 'component',
      data: {
        id: 'com.thuni.his.layout.SortableTree',
      },
    },
  },
  {
    label: '空白页',
    value: 'com.thuni.his.sketch.BlankPage',
    project: {
      id: 'view',
      name: '空白页',
      type: 'form',
      data: {
        id: 'com.thuni.his.sketch.BlankPage',
      },
    },
  },
  {
    id: 'application',
    label: '应用',
    value: 'application',
    project,
  },
];

function SketchWrapper() {
  const [value, setValue] = useState('com.thuni.his.sketch.BlankPage');
  const handleChange = (value) => {
    console.log(value, projects.find((item) => item.value === value).project);
    setValue(value);
  };
  const BasicLayout = useSketchComponent('com.thuni.his.layout.BasicLayout');
  const Container = ({ children }) => {
    console.log('Container -> ', children);
    return (
      <ApolloProvider client={client}>
        <BasicLayout>{children}</BasicLayout>
      </ApolloProvider>
    );
  };
  // container={Container}
  return (
    <div>
      变更组件: <Select options={projects} onChange={handleChange} value={value} style={{ width: 120 }} />
      <br />
      <Panel supportFullscreen fullscreen>
        <AsanyEditor
          plugins={[]}
          onSave={(data) => console.log(data)}
          project={projects.find((item) => item.value === value).project}
          // container={Container}
        ></AsanyEditor>
      </Panel>
    </div>
  );
}

ReactDOM.render(
  <ApolloProvider client={client}>
    <DndProvider backend={HTML5Backend}>
      <SketchWrapper />
    </DndProvider>
  </ApolloProvider>,
  mountNode
);
```

```css
[id^='components-asany-editor-demo-'] .fullscreen > .panel-body {
  padding: 0;
}
```
