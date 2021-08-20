import classnames from 'classnames';
import React from 'react';
import { IComponentProperty } from 'sunmao';

interface FormFieldProps {
  field: IComponentProperty;
  layout: 'Inline' | 'Stacked';
  className?: string;
  children: React.ReactElement;
}

function FormField({ field, className, children, layout = 'Inline', ...props }: FormFieldProps) {
  return (
    <div
      className={classnames('smart-form-field', `smart-form-field-layout-${layout.toLocaleLowerCase()}`, className, {
        'inline-show-label': layout == 'Inline' && field.label && !field.hiddenLabel,
      })}
    >
      {field.label && !field.hiddenLabel && (
        <label className="smart-form-field-label">
          {field.label}
          {layout == 'Inline' && ':'}
        </label>
      )}
      <div
        className={classnames('smart-form-field-value flex items-center', {
          'justify-start': layout == 'Stacked',
        })}
      >
        {React.cloneElement(React.Children.only(children), props)}
      </div>
    </div>
  );
}

export default FormField;
