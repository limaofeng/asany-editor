import React, { ComponentType } from 'react';

import { Radio, Select } from 'antd';
import Sunmao from 'sunmao';
import { ComponentPropertyRenderer, ComponentPropertyRendererSetting, IField } from 'sunmao';

import MultipleWrapper from '../combine/MultipleWrapper';

const EmptyRenderer = () => <></>;

function lgc(sunmao: Sunmao, name: string) {
  return sunmao.getComponent(name)?.component;
}

function cr(sunmao: Sunmao, name: string) {
  return {
    name: name.split('.').reverse()[0],
    component: lgc(sunmao, name) || EmptyRenderer,
    props: {},
  };
}

function cre() {
  return { component: EmptyRenderer, props: {} };
}

function crbc(component: ComponentType<any>, props: any = {}, name?: string) {
  return { name, component: component || EmptyRenderer, props };
}

export function getDefaultRenderer(sunmao: Sunmao, library: string, item: IField): ComponentPropertyRendererSetting {
  switch (item.type) {
    case 'Integer':
      return cr(sunmao, `${library}.InputNumber`);
    case 'String':
      return cr(sunmao, `${library}.Input`);
    case 'Boolean':
      const comTemp = cr(sunmao, `${library}.Checkbox`);
      return crbc(comTemp.component, { children: item.label }, comTemp.name);
    case 'Enum':
      const props: any = { style: { width: '100%' } };
      if (item.enumeration) {
        props.children = item.enumeration.values.map((v: any) => (
          <Select.Option key={v.value} value={v.value}>
            {v.name}
          </Select.Option>
        ));
      }
      return { component: Select, props };
    default:
      return cre();
  }
}

function getBasisRenderer(sunmao: Sunmao, library: string, item: IField): ComponentPropertyRenderer {
  if (!item.renderer) {
    return getDefaultRenderer(sunmao, library, item);
  }
  if (typeof item.renderer === 'string') {
    switch (item.type) {
      case 'Enum': // 枚举类型
        const props: any = { style: { width: '100%' } };
        if (item.enumeration) {
          props.children = item.enumeration.values.map((v: any) => (
            <Radio.Button key={v.value} value={v.value}>
              {v.name}
            </Radio.Button>
          ));
        }
        return { component: Radio.Group, props };
      default:
        return cr(sunmao, `${library}.${item.renderer}`);
    }
  }
  // item.renderer
  if (!item.renderer.hasOwnProperty('component')) {
    return crbc(item.renderer as any, {});
  }
  if (typeof item.renderer['component'] === 'string') {
    if (item.renderer['props']) {
      const { component, name } = cr(sunmao, `${library}.${item.renderer['component']}`);
      return crbc(component, item.renderer['props'], name);
    }
    return cr(sunmao, `${library}.${item.renderer['component']}`);
  }
  return crbc(item.renderer['component'] as any, item.renderer['props']);
}

export function getRenderer(sunmao: Sunmao, library: string, item: IField): ComponentPropertyRenderer {
  const render = getBasisRenderer(sunmao, library, item);
  if (item.wrappers) {
    if ((item as any).wrapperRender) {
      return (item as any).wrapperRender;
    }
    let root = render;
    for (const wrap of [...item.wrappers].reverse()) {
      const wrapper = getBasisRenderer(sunmao, library, { renderer: wrap } as any);
      const { component: ChildrenRender, props: childProps } = root;
      wrapper.component = ((Wrapper: any) => (props: any) => {
        return (
          <Wrapper {...props}>
            <ChildrenRender {...childProps} />
          </Wrapper>
        );
      })(wrapper.component);
      root = wrapper;
    }
    return ((item as any).wrapperRender = root);
  }
  if (item.multiple) {
    return {
      component: MultipleWrapper,
      props: {
        title: item.label,
      },
    };
  }
  return render;
}
