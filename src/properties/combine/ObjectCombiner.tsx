import { Form } from 'antd';
import { isEqual } from 'lodash-es';
import React, { useEffect } from 'react';
import { ComponentPropertyRendererSetting, ComponentPropertyType, IComponentProperty, useSunmao } from 'sunmao';

import { FormItemWrapper, visibleFilter } from '../DynaActionForm';
import { getRenderer } from '../renderers';

interface ObjectCombinerProps {
  value?: any;
  onChange?: (value: any) => void;
  className?: string;
  fields: IComponentProperty[];
}

function ObjectCombiner(props: ObjectCombinerProps) {
  const { className, value, onChange } = props;

  const sunmao = useSunmao();

  const fields = props.fields.map((item) => ({
    ...item,
    renderer: getRenderer(sunmao, 'cn.asany.editor.form', item),
  }));
  const [form] = Form.useForm();
  const handleValuesChange = (_: any, allValues: any) => {
    console.log('handleValuesChange', _, allValues);
    onChange && onChange(allValues);
  };
  useEffect(() => {
    if (value && !isEqual(form.getFieldsValue(), value)) {
      form.setFieldsValue({ ...value });
    }
  }, [value]);
  return (
    <Form form={form} className={className} layout="inline" component={'div'} onValuesChange={handleValuesChange}>
      {fields.filter(visibleFilter(props.value)).map((item) => {
        const { component, props = {} } = item.renderer as ComponentPropertyRendererSetting;
        const ComponentForm = component as React.ComponentType<any>;
        const lable = item.hiddenLabel ? '' : !item.multiple && item.label;
        const valuePropName = item.type === ComponentPropertyType.Boolean ? 'checked' : undefined;
        return (
          <Form.Item
            className={`object-combiner-field-${item.name}`}
            key={`${item.name}`}
            label={lable}
            name={item.name}
            valuePropName={valuePropName}
          >
            <FormItemWrapper {...props} field={item} component={ComponentForm} size="small" />
          </Form.Item>
        );
      })}
    </Form>
  );
}

export default React.memo(ObjectCombiner);
