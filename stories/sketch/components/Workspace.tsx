import isEqual from 'lodash/isEqual';
import React from 'react';
import { useEffect } from 'react';
import { IReactComponentStoreContext, useReactComponent, useSketch } from 'sunmao';

import { buildAside, useDispatch, useEditor, useSelector } from '../../../src';
import { SketchActionType } from '../reducer';
import { IComponentData } from '../typings';

function Workspace() {
  const editor = useEditor();
  const sketch = useSketch();
  const dispatch = useDispatch();

  const moveable = useSelector((state) => state.ui.scena.moveable);
  const data = useSelector<IComponentData>((state) => state.project.data, isEqual);

  const component = useReactComponent(data.template, data.props);

  useEffect(() => {
    return sketch.on('block-click', (id: string) => {
      const component = sketch.getComponent(id);
      const block = sketch.getBlock(id);
      // 设置选中
      moveable.setElements(`[id="${id}"]`);
      // 设置属性配置面板
      dispatch({
        type: SketchActionType.USER_CUSTOMIZER,
        payload: {
          // subscribe: com.subscribe,
          value: block.props,
          change: block.update,
          customizer: block.customizer,
        },
      });
      // 打开属性配置面板
      const tabs = buildAside(block.customizer!);
      const store = component.store;
      console.log('value ---> ', store.getState().blocks, block.key);
      editor.aside.open(tabs, {
        value: store.getState().blocks.find((item) => item.key === block.key).props,
        update: block.update,
        watchValue: (callback: (value: any) => void) => {
          const handleChange = () => {
            callback(store.getState().blocks.find((item) => item.key === block.key).props);
          };
          return store.subscribe(handleChange);
        },
      });
    });
  }, []);

  return React.createElement(component);
}

export default Workspace;
