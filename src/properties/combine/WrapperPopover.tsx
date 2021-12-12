import React, { memo, useCallback, useEffect, useRef, useState } from 'react';

import { Popover } from 'antd';
import { useClickAway } from 'react-use';
import isEqual from 'lodash/isEqual';

import { IMultipleWrapperData } from './MultipleWrapper';
import WrapperPopoverContent, { PopoverFields } from './WrapperPopoverContent';

import './style/WrapperPopover.less';

interface WrapperPopoverProps<T> extends IMultipleWrapperData<T>, PopoverFields<T> {
  /**
   * 点击 编辑按钮 和 popoverContent 区域之外 直接关闭 popover
   * 注意: ( select 等 子元素 弹出层 会在 body 上挂载，并非 区域内 )
   */
  closeOnClickAway: boolean;
  /** 初始化是否显示 (老数据 为 false, 新数据 为 true) */
  showPopoverImmediatelyAtCreated: boolean;
  /** wrapper 包裹的子元素 */
  children: React.ReactElement;
  /** 组件 */
  ContentRenderer: React.JSXElementConstructor<T>;
  /** 宽度，目前只提供 px */
  width: string;

  onChange: (value: any) => void;
}

WrapperPopover.defaultProps = {
  /** 点击其他地方关闭当前 */
  closeOnClickAway: true,
};

function WrapperPopover(props: WrapperPopoverProps<any>) {
  const {
    data,
    children,
    showPopoverImmediatelyAtCreated,
    ContentRenderer = WrapperPopoverContent,
    width: popoverContentWidth,
    maxHeight: popoverContentMaxHeight,
    fields,
    onChange,
    closeOnClickAway,
  } = props;

  const [visible, setVisible] = useState(false);

  const contentComponentRef = useRef<null | any>(null);

  const itemRef = useRef<HTMLSpanElement>();

  const contentRef = useRef<HTMLSpanElement>(null);

  const handlePopoverContentClose = useCallback(() => {
    contentComponentRef.current = null;
    setVisible(false);
  }, []);

  const handleContentChange = useCallback(
    (value: any) => {
      onChange({ ...data, data: { ...value } });
    },
    [data, onChange]
  );

  const handlePopoverContentShow = useCallback(() => {
    setVisible(true);
  }, [setVisible]);

  useEffect(() => {
    if (showPopoverImmediatelyAtCreated && data.state === 'isNew') {
      handlePopoverContentShow();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.state]);

  useClickAway(contentRef, () => {
    // 如果该属性为 true, 则关闭 popoverContent
    if (closeOnClickAway) {
      handlePopoverContentClose();
    }
  });

  return (
    <Popover
      visible={visible}
      content={
        <ContentRenderer
          contentRef={contentRef}
          fields={fields}
          width={popoverContentWidth}
          maxHeight={popoverContentMaxHeight}
          value={data.data}
          onChange={handleContentChange}
          onClose={handlePopoverContentClose}
        />
      }
      overlayClassName="wrapper-popover"
      placement="leftTop"
    >
      {React.cloneElement(children, {
        ...props,
        onEdit: handlePopoverContentShow,
        itemRef,
      })}
    </Popover>
  );
}

export default memo(WrapperPopover, (prev, next) => {
  return isEqual(prev.data, next.data);
});
