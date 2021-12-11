import React, { useCallback, useEffect, useRef, useState } from 'react';

import { ComponentPropertyRendererSetting, ICustomizer, IField, IGroup, useDebugger, useSunmao } from 'sunmao';
import isEqual from 'lodash/isEqual';
import classnames from 'classnames';

import { DEFAULT_GROUP_ID } from '../typings';

import FormField from './FormField';
import FormFieldset from './FormFieldset';
import { useFormSelector, useFormState } from './FormStateContext';
import { getRenderer } from './renderers';

interface DynaActionFormProps {
  customizer: ICustomizer;
  library?: string;
  layout?: 'Inline' | 'Stacked';
  onChange?(value: any): void;
  value?: any;
}

interface FormItemWrapperProps {
  component: React.ComponentType<any>;
  field: IField;
  defaultValue?: any;
  size: string;
}

export function FormItemWrapper({ component: Item, field, defaultValue, ...props }: FormItemWrapperProps) {
  // console.log('FormItemWrapper', field, Item, defaultValue, props);
  const extProps = useFormSelector((state) => {
    if (Array.isArray(field.deps)) {
      return field.deps.reduce((data: any, key: any) => {
        if (typeof key === 'string') {
          const [name, value] = key.split(':');
          data[name] = state[value];
        }
        return data;
      }, {});
    } else if (typeof field.deps === 'function') {
      return field.deps(state);
    }
  }, isEqual);
  if (!field.deps || !field.deps.length) {
    return <Item placeholder={field.placeholder} {...props} />;
  }
  return <Item placeholder={field.placeholder} {...props} {...extProps} />;
}

export const visibleFilter = (props: any) => {
  return ({ visible }: any) => {
    if (typeof visible === 'function') {
      return visible(props);
    }
    return visible !== false;
  };
};

interface PanelBodyProps {
  group: string;
  layout: 'Inline' | 'Stacked';
  fields: IField[];
  value: any;
  Form: any;
}

const PanelBody = (props: PanelBodyProps) => {
  const { group, layout, fields, value, Form } = props;
  return (
    <React.Fragment>
      {fields.filter(visibleFilter(value)).map((item) => {
        const { component, props = {} } = item.renderer as ComponentPropertyRendererSetting;
        const ComponentForm = component as React.ComponentType<any>;
        const lable = item.hiddenLabel ? '' : !item.multiple && item.label;
        const valuePropName = item.type === 'Boolean' ? 'checked' : undefined;
        return (
          <Form.Item
            key={`${group}-${item.name}`}
            label={lable}
            name={item.name}
            valuePropName={valuePropName}
            noStyle={true}
          >
            <FormField
              field={item}
              layout={item.layout || layout}
              className={classnames(`form-item-${group}-${item.name}`, getComponentClassName(item))}
            >
              <FormItemWrapper {...props} field={item} component={ComponentForm} size="small" />
            </FormField>
          </Form.Item>
        );
      })}
    </React.Fragment>
  );
};

function getComponentClassName(item: IField) {
  if (typeof item.renderer.name === 'string') {
    return `form-component-${item.renderer.name.toLowerCase()}`;
  }
  return null;
}

PanelBody.defaultProps = {
  layout: 'Stacked',
};

const DynaActionForm = ({ library = 'cn.asany.ui.editor.properties', ...props }: DynaActionFormProps): JSX.Element => {
  const { value = {}, onChange, customizer } = props;

  const console = useDebugger();
  const sunmao = useSunmao();

  const [groups, setGroups] = useState<IGroup[]>([]);
  const defaultValue = useRef<any>({});
  const [form, Form] = useFormState();

  useEffect(() => {
    if (!customizer) {
      return;
    }
    defaultValue.current = {};
    groups.length = 0;
    setGroups(
      customizer.fields
        .reduce((groups: IGroup[], definition) => {
          const id = (typeof definition.group === 'boolean' ? definition.name : definition.group) || 'DEFAULT';
          let group: IGroup = groups.find((g: any) => g.id === id)!;
          if (group) {
            group.fields.push({
              ...definition,
              renderer: getRenderer(sunmao, library, definition),
            });
          } else {
            const _group = (customizer.groups || []).find((g) => g.id === id);
            if (_group) {
              groups.push((group = { ..._group, fields: [] }));
            } else {
              groups.push((group = { id, fields: [] } as any));
            }
            group.fields.push({
              ...definition,
              renderer: getRenderer(sunmao, library, definition),
            });
          }
          defaultValue.current[definition.name] = definition.defaultValue;
          return groups;
        }, [])
        .map((group) => {
          if (group.fields.length === 1 && !(group as any).visible) {
            (group as any).visible = group.fields[0].visible;
          }
          return group;
        })
    );
    const fieldsValue = { ...defaultValue.current, ...value };
    form.setFieldsValue(fieldsValue);
    console.log('表单配置:', customizer);
    console.log('表单初始数据:', 'DefaultValue = ', defaultValue.current, 'FieldsValue = ', fieldsValue);
    return () => {
      form.resetFields();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [customizer]);

  const handleValuesChange = useCallback((_: any, allValues: any) => {
    console.log('表单更新', allValues);
    onChange && onChange(allValues);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (value && !isEqual(form.getFieldsValue(), value)) {
      form.setFieldsValue({ ...defaultValue.current, ...value });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  console.log('groups', groups);

  return (
    <Form form={form} component={false} name="control-hooks" onValuesChange={handleValuesChange}>
      {groups.filter(visibleFilter(value)).map(({ id, name, layout, fields }) => (
        <FormFieldset title={!id.startsWith(DEFAULT_GROUP_ID) && name} key={id}>
          <PanelBody group={id} layout={layout!} fields={fields} value={value} Form={Form} />
        </FormFieldset>
      ))}
    </Form>
  );
};

DynaActionForm.defaultProps = {
  layout: 'Inline',
};

export default React.memo(DynaActionForm);
