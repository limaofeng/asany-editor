import LibraryManager from '@asany/library-manager';
import { Radio, Select } from 'antd';
import React, { ComponentType } from 'react';

import MultipleWrapper from '../components/MultipleWrapper';
import {
  ComponentPropertyRenderer,
  ComponentPropertyRendererSetting,
  ComponentPropertyType,
  IComponentProperty,
} from '../typings';

const EmptyRenderer = () => <></>;

function lgc(name: string) {
  return LibraryManager.getComponent(name)?.component;
}

function cr(name: string) {
  return {
    name: name.split('.').reverse()[0],
    component: lgc(name) || EmptyRenderer,
    props: {},
  };
}

function cre() {
  return { component: EmptyRenderer, props: {} };
}

function crbc(component: ComponentType<any>, props: any = {}, name?: string) {
  return { name, component: component || EmptyRenderer, props };
}

export function getDefaultRenderer(library: string, item: IComponentProperty): ComponentPropertyRendererSetting {
  switch (item.type) {
    case ComponentPropertyType.Integer:
      return cr(`${library}.InputNumber`);
    case ComponentPropertyType.Text:
    case ComponentPropertyType.String:
      return cr(`${library}.Input`);
    case ComponentPropertyType.Boolean:
      const comTemp = cr(`${library}.Checkbox`);
      return crbc(comTemp.component, { children: item.label }, comTemp.name);
    case ComponentPropertyType.Enum:
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

function getBasisRenderer(library: string, item: IComponentProperty): ComponentPropertyRenderer {
  if (!item.renderer) {
    return getDefaultRenderer(library, item);
  }
  if (typeof item.renderer === 'string') {
    switch (item.type) {
      case ComponentPropertyType.Enum: // 枚举类型
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
        return cr(`${library}.${item.renderer}`);
    }
  }
  // item.renderer
  if (!item.renderer.hasOwnProperty('component')) {
    return crbc(item.renderer as any, {});
  }
  if (typeof item.renderer['component'] === 'string') {
    if (item.renderer['props']) {
      const { component, name } = cr(`${library}.${item.renderer['component']}`);
      return crbc(component, item.renderer['props'], name);
    }
    return cr(`${library}.${item.renderer['component']}`);
  }
  return crbc(item.renderer['component'] as any, item.renderer['props']);
}

export function getRenderer(library: string, item: IComponentProperty): ComponentPropertyRenderer {
  const render = getBasisRenderer(library, item);
  if (item.wrappers) {
    if ((item as any).wrapperRender) {
      return (item as any).wrapperRender;
    }
    let root = render;
    for (const wrap of [...item.wrappers].reverse()) {
      const wrapper = getBasisRenderer(library, { renderer: wrap } as any);
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
