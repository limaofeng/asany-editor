import React, { CSSProperties } from 'react';
import useBlock from '../../asany-editor/hooks/useBlock';
import { ComponentPropertyType } from '../typings';

interface LabelProps {
  id: string;
  style: CSSProperties;
}

function Label(props: LabelProps) {
  const [{ onClick, props: blockProps }, ref] = useBlock<any>({
    key: props.id,
    icon: '',
    title: 'xxx',
    props: {
      text: '测试',
    },
    options: {
      resizable: true,
      draggable: true,
    },
    customizer: {
      fields: [
        {
          name: 'text',
          label: '内容',
          type: ComponentPropertyType.String,
        },
        {
          name: 'color1',
          group: '颜色',
          type: ComponentPropertyType.String,
          renderer: {
            component: 'ColorPicker',
          },
        },
        {
          name: 'color',
          type: ComponentPropertyType.String,
          group: '颜色',
          renderer: {
            component: 'ColorPicker',
            props: {
              theme: 'Sketch',
              title: '背景颜色',
            },
          },
        },
      ],
    },
  });

  return (
    <div
      ref={ref}
      onClick={onClick}
      style={{
        position: 'absolute',
        backgroundColor: 'red',
        width: 120,
        height: 120,
        ...props.style,
      }}
    >
      {blockProps.text}
    </div>
  );
}

export default Label;
