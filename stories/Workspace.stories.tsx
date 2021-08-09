import '../src/icons';
 import 'antd/dist/antd.css';

 import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
 import Icon, { IconProvider, useStore } from '@asany/icons';
 import { Meta, Story } from '@storybook/react';
 import React from 'react';
 import { DndProvider } from 'react-dnd';
 import { HTML5Backend } from 'react-dnd-html5-backend';

 import AsanyEditor from '../src';
 import DemoPlugin from './editors/demo';
 import { useEffect } from 'react';
 import { useState } from 'react';
 import { IconLibrary } from '@asany/icons/dist/store/IconDatabase';

 const meta: Meta = {
   title: '编辑器/工作区',
   parameters: {
     options: { showPanel: false },
   },
 };

 const client = new ApolloClient({
   uri: 'http://api.asany.cn/graphql',
   cache: new InMemoryCache(),
 });

 export default meta;

 const Template: Story<any> = (_args) => {
   DemoPlugin.scena.workspace = () => {
     const store = useStore();
     const [lib, setLib] = useState<IconLibrary | undefined>();
     useEffect(() => {
       store.local().then((lib) => {
         setLib(lib);
       });
     }, []);

     if (!lib) {
       return <></>;
     }

     return (
       <div
         style={{
           width: '100%',
           padding: 20,
         }}
       >
         <h3>{lib.description}</h3>
         <hr />
         <div style={{ display: 'flex', flexWrap: 'wrap' }}>
           {lib.icons.map((item) => (
             <Icon key={item.id} style={{ padding: 16 }} name={item.name} />
           ))}
         </div>
       </div>
     );
   };
   return (
     <DndProvider backend={HTML5Backend}>
       <ApolloProvider client={client}>
         <IconProvider>
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
         </IconProvider>
       </ApolloProvider>
     </DndProvider>
   );
 };

 // By passing using the Args format for exported stories, you can control the props for a component for reuse in a test
 // https://storybook.js.org/docs/react/workflows/unit-testing
 export const Default = Template.bind({});

 Default.storyName = '工作区';

 Default.args = {};