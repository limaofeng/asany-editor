import React, { memo, useEffect, useState } from 'react';

import { ICustomizer, IField } from 'sunmao';

import DynaActionForm from '../DynaActionForm';

import './style/WrapperPopoverContent.less';
export interface PopoverFields<T> {
  /** 传递 fields 或者 根据当前的 value 某些值获得 fields 的函数 */
  fields: ((value: T) => IField[]) | IField[];
}

export interface WrapperPopoverContentProps<T> extends PopoverFields<T> {
  /** 目前只用于点击内部, popover-content 不消失 */
  contentRef: any;
  /** content 宽度，目前只支持 px 和 百分比，后期可以提供 sm md lg 等 */
  width: string;
  /** content 最大高度，最大高度， 目前只支持 px 和 百分比 */
  maxHeight: string;

  value: T;
  onClose: () => void;
  onChange: (item: T) => void;
}

WrapperPopoverContent.defaultProps = {
  maxHeight: '600px',
  width: '300px',
};

function WrapperPopoverContent(props: WrapperPopoverContentProps<any>) {
  const { contentRef, fields: fieldsProp, value, maxHeight, width, onClose, onChange } = props;

  const [fields, setFields] = useState<IField[]>([] as IField[]);

  const [customizer, setCustomizer] = useState<ICustomizer>({
    groups: [
      {
        id: 'DEFAULT',
        name: '默认',
        layout: 'Inline',
      },
    ],
    fields,
  });

  useEffect(() => {
    const currentFields: IField[] = Array.isArray(fieldsProp) ? fieldsProp : fieldsProp(value);
    setFields(currentFields);
    setCustomizer({
      groups: [
        {
          id: 'DEFAULT',
          name: '默认',
          layout: 'Inline',
        },
      ],
      fields: currentFields,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fieldsProp]);

  return (
    <div
      style={{
        width,
        maxHeight,
        overflowY: 'auto',
      }}
      ref={contentRef}
    >
      <div className="popover-content__title">
        <a onClick={onClose}>CloseOutlined</a>
      </div>
      {/* 使用 contentRef 中的组件
       有弹出层的需要配置(如 select ) 基于 弹出层基于父组件而不是 body 上
     */}
      <div className="popover-content__form">
        <DynaActionForm customizer={customizer} onChange={onChange} value={value} />
      </div>
    </div>
  );
}

export default memo(WrapperPopoverContent);
